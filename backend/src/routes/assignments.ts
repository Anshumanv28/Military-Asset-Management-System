import { Router, Request, Response } from 'express';
import { query } from '../database/connection';
import { authenticate, authorize } from '../middleware/auth';
import { logger } from '../utils/logger';

const router = Router();

// @route   GET /api/assignments
// @desc    Get all assignments with filters
// @access  Private
router.get('/', authenticate, async (req: Request, res: Response) => {
  try {
    const { base_id, status, assigned_to, page = 1, limit = 10 } = req.query;
    
    let whereConditions = ['1=1'];
    const params: any[] = [];
    let paramIndex = 1;

    // Apply filters based on user role
    if (req.user!.role === 'base_commander' && req.user!.base_id) {
      whereConditions.push(`a.base_id = $${paramIndex++}`);
      params.push(req.user!.base_id);
    } else if (base_id && req.user!.role !== 'admin') {
      whereConditions.push(`a.base_id = $${paramIndex++}`);
      params.push(base_id);
    }

    if (status) {
      whereConditions.push(`a.status = $${paramIndex++}`);
      params.push(status);
    }

    // Add filter for assigned_to, use UUID type
    if (assigned_to) {
      whereConditions.push(`a.assigned_to = $${paramIndex++}`);
      params.push(assigned_to);
    }

    const whereClause = whereConditions.join(' AND ');

    // Get total count
    const countQuery = `
      SELECT COUNT(*) as total
      FROM assignments a
      WHERE ${whereClause}
    `;
    const countResult = await query(countQuery, params);
    const total = parseInt(countResult.rows[0].total);

    // Get paginated results
    const offset = (parseInt(page as string) - 1) * parseInt(limit as string);
    const assignmentsQuery = `
      SELECT a.*, at.name as asset_name, 'N/A' as asset_serial_number, at.unit_of_measure, b.name as base_name,
             CONCAT(p.first_name, ' ', p.last_name) as personnel_name, p.rank as personnel_rank,
             CONCAT(u.first_name, ' ', u.last_name) as assigned_by_name
      FROM assignments a
      JOIN asset_types at ON a.asset_type_id = at.id
      JOIN bases b ON a.base_id = b.id
      JOIN personnel p ON a.assigned_to = p.id
      JOIN users u ON a.assigned_by = u.id
      WHERE ${whereClause}
      ORDER BY a.assignment_date DESC
      LIMIT $${paramIndex++} OFFSET $${paramIndex++}
    `;
    const assignmentsResult = await query(assignmentsQuery, [...params, parseInt(limit as string), offset]);

    res.json({
      success: true,
      data: assignmentsResult.rows,
      pagination: {
        page: parseInt(page as string),
        limit: parseInt(limit as string),
        total,
        totalPages: Math.ceil(total / parseInt(limit as string))
      }
    });
  } catch (error) {
    logger.error('Get assignments error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

// @route   POST /api/assignments
// @desc    Create new assignment
// @access  Private (Admin, Base Commander, Logistics Officer)
router.post('/', authenticate, authorize('admin', 'base_commander', 'logistics_officer'), async (req: Request, res: Response) => {
  try {
    const { asset_type_id, assigned_to, base_id, quantity = 1, assignment_date, notes } = req.body;

    // Validate required fields
    if (!asset_type_id || !assigned_to || !base_id || !assignment_date) {
      return res.status(400).json({
        success: false,
        error: 'Asset type ID, assigned_to, base ID, and assignment date are required'
      });
    }

    // Validate quantity
    if (quantity <= 0) {
      return res.status(400).json({
        success: false,
        error: 'Quantity must be greater than 0'
      });
    }

    // Check access permissions
    if (req.user!.role === 'base_commander' && base_id !== req.user!.base_id) {
      return res.status(403).json({
        success: false,
        error: 'Base commanders can only create assignments for their base'
      });
    }

    // Check if asset type exists
    const assetTypeResult = await query(
      'SELECT * FROM asset_types WHERE id = $1',
      [asset_type_id]
    );

    if (assetTypeResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Asset type not found'
      });
    }

    // Check if base has sufficient available quantity
    const assetResult = await query(
      'SELECT quantity, available_quantity FROM assets WHERE asset_type_id = $1 AND base_id = $2',
      [asset_type_id, base_id]
    );

    if (assetResult.rows.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Base does not have this asset type in inventory'
      });
    }

    const asset = assetResult.rows[0];
    if (asset.available_quantity < quantity) {
      return res.status(400).json({
        success: false,
        error: `Insufficient available quantity for assignment. Available: ${asset.available_quantity}, Requested: ${quantity}`
      });
    }

    // Check if personnel exists
    const personnelResult = await query(
      'SELECT * FROM personnel WHERE id = $1',
      [assigned_to]
    );

    if (personnelResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Personnel not found'
      });
    }

    // Start transaction
    await query('BEGIN');

    try {
      // Create assignment
      const createQuery = `
        INSERT INTO assignments (asset_type_id, assigned_to, assigned_by, base_id, quantity, assignment_date, notes)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *
      `;
      const result = await query(createQuery, [
        asset_type_id,
        assigned_to,
        req.user!.user_id,
        base_id,
        quantity,
        assignment_date,
        notes || null
      ]);

      const newAssignment = result.rows[0];

      // Update asset quantities
      const newAvailableQuantity = asset.available_quantity - quantity;
      const newAssignedQuantity = asset.assigned_quantity + quantity;

      await query(`
        UPDATE assets 
        SET available_quantity = $1, assigned_quantity = $2, updated_at = CURRENT_TIMESTAMP
        WHERE asset_type_id = $3 AND base_id = $4
      `, [newAvailableQuantity, newAssignedQuantity, asset_type_id, base_id]);

      // Update asset status based on remaining available quantity
      let newStatus = 'available';
      if (newAvailableQuantity === 0) {
        newStatus = 'low_stock';
      }

      await query(`
        UPDATE assets 
        SET status = $1, updated_at = CURRENT_TIMESTAMP
        WHERE asset_type_id = $2 AND base_id = $3
      `, [newStatus, asset_type_id, base_id]);

      // Commit transaction
      await query('COMMIT');

      // Log assignment creation
      logger.info({
        action: 'ASSIGNMENT_CREATED',
        user_id: req.user!.user_id,
        assignment_id: newAssignment.id,
        asset_type_id,
        assigned_to,
        quantity
      });

      return res.status(201).json({
        success: true,
        data: newAssignment
      });
    } catch (error) {
      // Rollback transaction
      await query('ROLLBACK');
      throw error;
    }
  } catch (error) {
    logger.error('Create assignment error:', error);
    return res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

// @route   PUT /api/assignments/:id
// @desc    Update assignment
// @access  Private (Admin, Base Commander)
router.put('/:id', authenticate, authorize('admin', 'base_commander'), async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { quantity, assignment_date, notes } = req.body;

    // Check if assignment exists
    const assignmentResult = await query(
      'SELECT * FROM assignments WHERE id = $1',
      [id]
    );

    if (assignmentResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Assignment not found'
      });
    }

    const assignment = assignmentResult.rows[0];

    // Check access permissions
    if (req.user!.role === 'base_commander' && assignment.base_id !== req.user!.base_id) {
      return res.status(403).json({
        success: false,
        error: 'Base commanders can only update assignments for their base'
      });
    }

    // Validate quantity if being updated
    if (quantity !== undefined && quantity <= 0) {
      return res.status(400).json({
        success: false,
        error: 'Quantity must be greater than 0'
      });
    }

    // If quantity is being changed, we need to adjust the asset inventory
    if (quantity !== undefined && quantity !== assignment.quantity) {
      const quantityDifference = quantity - assignment.quantity;
      
      // Get current asset inventory
      const assetResult = await query(
        'SELECT quantity, available_quantity, assigned_quantity FROM assets WHERE asset_type_id = $1 AND base_id = $2',
        [assignment.asset_type_id, assignment.base_id]
      );

      if (assetResult.rows.length === 0) {
        return res.status(400).json({
          success: false,
          error: 'Asset inventory not found'
        });
      }

      const asset = assetResult.rows[0];
      const newAvailableQuantity = asset.available_quantity - quantityDifference;
      const newAssignedQuantity = asset.assigned_quantity + quantityDifference;

      if (newAvailableQuantity < 0) {
        return res.status(400).json({
          success: false,
          error: 'Insufficient available quantity for assignment'
        });
      }

      // Update asset quantities
      await query(`
        UPDATE assets 
        SET available_quantity = $1, assigned_quantity = $2, updated_at = CURRENT_TIMESTAMP
        WHERE asset_type_id = $3 AND base_id = $4
      `, [newAvailableQuantity, newAssignedQuantity, assignment.asset_type_id, assignment.base_id]);
    }

    // Update assignment
    const updateQuery = `
      UPDATE assignments 
      SET quantity = COALESCE($1, quantity),
          assignment_date = COALESCE($2, assignment_date),
          notes = COALESCE($3, notes),
          updated_at = CURRENT_TIMESTAMP
      WHERE id = $4
      RETURNING *
    `;
    const result = await query(updateQuery, [
      quantity,
      assignment_date,
      notes,
      id
    ]);

    const updatedAssignment = result.rows[0];

    // Log assignment update
    logger.info({
      action: 'ASSIGNMENT_UPDATED',
      user_id: req.user!.user_id,
      assignment_id: id,
      old_quantity: assignment.quantity,
      new_quantity: quantity || assignment.quantity
    });

    return res.json({
      success: true,
      data: updatedAssignment
    });
  } catch (error) {
    logger.error('Update assignment error:', error);
    return res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

// @route   DELETE /api/assignments/:id
// @desc    Delete assignment
// @access  Private (Admin, Base Commander)
router.delete('/:id', authenticate, authorize('admin', 'base_commander'), async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Check if assignment exists
    const assignmentResult = await query(
      'SELECT * FROM assignments WHERE id = $1',
      [id]
    );

    if (assignmentResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Assignment not found'
      });
    }

    const assignment = assignmentResult.rows[0];

    // Check access permissions
    if (req.user!.role === 'base_commander' && assignment.base_id !== req.user!.base_id) {
      return res.status(403).json({
        success: false,
        error: 'Base commanders can only delete assignments for their base'
      });
    }

    // Start transaction
    await query('BEGIN');

    try {
      // Restore asset quantities if assignment is active
      if (assignment.status === 'active') {
        const assetResult = await query(
          'SELECT quantity, available_quantity, assigned_quantity FROM assets WHERE asset_type_id = $1 AND base_id = $2',
          [assignment.asset_type_id, assignment.base_id]
        );

        if (assetResult.rows.length > 0) {
          const asset = assetResult.rows[0];
          const newAvailableQuantity = asset.available_quantity + assignment.quantity;
          const newAssignedQuantity = asset.assigned_quantity - assignment.quantity;

          await query(`
            UPDATE assets 
            SET available_quantity = $1, assigned_quantity = $2, updated_at = CURRENT_TIMESTAMP
            WHERE asset_type_id = $3 AND base_id = $4
          `, [newAvailableQuantity, newAssignedQuantity, assignment.asset_type_id, assignment.base_id]);
        }
      }

      // Delete assignment
      await query('DELETE FROM assignments WHERE id = $1', [id]);

      // Commit transaction
      await query('COMMIT');

      // Log assignment deletion
      logger.info({
        action: 'ASSIGNMENT_DELETED',
        user_id: req.user!.user_id,
        assignment_id: id,
        asset_type_id: assignment.asset_type_id,
        quantity: assignment.quantity
      });

      return res.json({
        success: true,
        message: 'Assignment deleted successfully'
      });
    } catch (error) {
      // Rollback transaction
      await query('ROLLBACK');
      throw error;
    }
  } catch (error) {
    logger.error('Delete assignment error:', error);
    return res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

// @route   PUT /api/assignments/:id/expend
// @desc    Expend assigned asset
// @access  Private (Admin, Base Commander, Logistics Officer)
router.put('/:id/expend', authenticate, authorize('admin', 'base_commander', 'logistics_officer'), async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { quantity, notes } = req.body;
    if (!quantity || quantity <= 0) {
      return res.status(400).json({ success: false, error: 'Quantity must be positive' });
    }
    // Get assignment
    const assignmentResult = await query('SELECT * FROM assignments WHERE id = $1', [id]);
    if (assignmentResult.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Assignment not found' });
    }
    const assignment = assignmentResult.rows[0];
    const remaining = assignment.quantity - assignment.expended_quantity;
    if (quantity > remaining) {
      return res.status(400).json({ success: false, error: 'Cannot expend more than remaining quantity' });
    }
    // Start transaction
    await query('BEGIN');
    try {
      // Update assignment
      const newExpended = assignment.expended_quantity + quantity;
      let newStatus = 'active';
      if (newExpended === assignment.quantity) newStatus = 'expended';
      else if (newExpended > 0) newStatus = 'partially_expended';
      const updateAssignment = await query(
        'UPDATE assignments SET expended_quantity = $1, status = $2, notes = COALESCE($3, notes), updated_at = CURRENT_TIMESTAMP WHERE id = $4 RETURNING *',
        [newExpended, newStatus, notes, id]
      );
      // Update asset assigned_quantity
      await query(
        'UPDATE assets SET assigned_quantity = assigned_quantity - $1, updated_at = CURRENT_TIMESTAMP WHERE asset_type_id = $2 AND base_id = $3',
        [quantity, assignment.asset_type_id, assignment.base_id]
      );
      // Create expenditure record
      await query(
        'INSERT INTO expenditures (asset_type_id, base_id, personnel_id, quantity, expenditure_date, reason, notes, created_by) VALUES ($1, $2, $3, $4, CURRENT_DATE, $5, $6, $7)',
        [assignment.asset_type_id, assignment.base_id, assignment.assigned_to, quantity, 'Expended from assignment', notes, req.user!.user_id]
      );
      await query('COMMIT');
      return res.json({ success: true, data: updateAssignment.rows[0] });
    } catch (err) {
      await query('ROLLBACK');
      throw err;
    }
  } catch (error) {
    logger.error('Expend assignment error:', error);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
});

export default router; 