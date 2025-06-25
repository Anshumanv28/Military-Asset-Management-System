import { Router, Request, Response } from 'express';
import { query } from '../database/connection';
import { authenticate, authorize } from '../middleware/auth';
import { logger } from '../utils/logger';
import sql from '../database/db';

const router = Router();

// @route   GET /api/assignments
// @desc    Get all assignments with filters
// @access  Private
router.get('/', authenticate, async (req: Request, res: Response) => {
  try {
    const { base_id, asset_name, assigned_to, start_date, end_date, page = 1, limit = 10 } = req.query;
    
    let whereConditions = ['1=1'];
    const params: any[] = [];
    let paramIndex = 1;

    // Apply filters based on user role
    if (req.user!.role === 'base_commander' && req.user!.base_id) {
      whereConditions.push(`a.base_id = $${paramIndex++}`);
      params.push(req.user!.base_id);
    } else if (req.user!.role === 'logistics_officer' && req.user!.base_id) {
      whereConditions.push(`a.base_id = $${paramIndex++}`);
      params.push(req.user!.base_id);
    } else if (base_id && req.user!.role !== 'admin') {
      whereConditions.push(`a.base_id = $${paramIndex++}`);
      params.push(base_id);
    }

    if (asset_name) {
      whereConditions.push(`a.asset_name ILIKE $${paramIndex++}`);
      params.push(`%${asset_name}%`);
    }

    if (assigned_to) {
      whereConditions.push(`a.assigned_to = $${paramIndex++}`);
      params.push(assigned_to);
    }

    if (start_date && end_date) {
      whereConditions.push(`a.assignment_date BETWEEN $${paramIndex++} AND $${paramIndex++}`);
      params.push(start_date, end_date);
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
      SELECT a.*, 'N/A' as asset_serial_number, b.name as base_name,
             CONCAT(p.first_name, ' ', p.last_name) as personnel_name, p.rank as personnel_rank,
             CONCAT(u.first_name, ' ', u.last_name) as assigned_by_name
      FROM assignments a
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
    const { asset_name, assigned_to, base_id, quantity, assignment_date, notes } = req.body;

    console.log('Received assignment data:', req.body);

    // Validate required fields
    if (!asset_name || !assigned_to || !base_id || !quantity || !assignment_date) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields'
      });
    }

    // Validate quantity
    const validQuantity = parseInt(quantity);
    console.log('Quantity type:', typeof validQuantity, 'Value:', validQuantity);
    
    if (isNaN(validQuantity) || validQuantity <= 0) {
      return res.status(400).json({
        success: false,
        error: 'Quantity must be a positive number'
      });
    }

    // Check access permissions
    if (req.user!.role === 'base_commander' && base_id !== req.user!.base_id) {
      return res.status(403).json({
        success: false,
        error: 'Base commanders can only create assignments for their base'
      });
    }

    // Check if asset exists and has sufficient quantity
    const assetResult = await query(
      'SELECT quantity, available_quantity FROM assets WHERE name = $1 AND base_id = $2',
      [asset_name, base_id]
    );

    if (assetResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Asset not found'
      });
    }

    const asset = assetResult.rows[0];
    console.log('Asset data from database:', asset);
    console.log('Available quantity:', asset.available_quantity, 'Type:', typeof asset.available_quantity);
    console.log('Assigned quantity:', asset.assigned_quantity, 'Type:', typeof asset.assigned_quantity);

    if (asset.available_quantity < validQuantity) {
      return res.status(400).json({
        success: false,
        error: 'Insufficient available quantity'
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

    // Start transaction using sql.begin()
    const transaction = await sql.begin(async (sql) => {
      // Create assignment
      const createQuery = `
        INSERT INTO assignments (asset_name, assigned_to, assigned_by, base_id, quantity, assignment_date, notes)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *
      `;
      const result = await sql.unsafe(createQuery, [
        asset_name,
        assigned_to,
        req.user!.user_id,
        base_id,
        validQuantity,
        assignment_date,
        notes || null
      ]);

      const newAssignment = result[0];

      // Update asset quantities - ensure we use valid numbers
      const availableQuantity = parseInt(asset.available_quantity) || 0;
      const assignedQuantity = parseInt(asset.assigned_quantity) || 0;
      const newAvailableQuantity = availableQuantity - validQuantity;
      const newAssignedQuantity = assignedQuantity + validQuantity;

      console.log('Calculating new quantities:');
      console.log('Original available:', availableQuantity, 'Original assigned:', assignedQuantity);
      console.log('New available:', newAvailableQuantity, 'New assigned:', newAssignedQuantity);

      await sql.unsafe(`
        UPDATE assets 
        SET available_quantity = $1, assigned_quantity = $2
        WHERE name = $3 AND base_id = $4
      `, [newAvailableQuantity, newAssignedQuantity, asset_name, base_id]);

      // Update asset status based on remaining available quantity
      let newStatus = 'available';
      if (newAvailableQuantity === 0) {
        newStatus = 'low_stock';
      }

      await sql.unsafe(`
        UPDATE assets 
        SET status = $1
        WHERE name = $2 AND base_id = $3
      `, [newStatus, asset_name, base_id]);

      return newAssignment;
    });

    // Log assignment creation
    logger.info({
      action: 'ASSIGNMENT_CREATED',
      user_id: req.user!.user_id,
      assignment_id: transaction?.['id'],
      asset_name,
      assigned_to,
      quantity
    });

    return res.status(201).json({
      success: true,
      data: transaction
    });
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
        'SELECT quantity, available_quantity, assigned_quantity FROM assets WHERE name = $1 AND base_id = $2',
        [assignment.asset_name, assignment.base_id]
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
        SET available_quantity = $1, assigned_quantity = $2
        WHERE name = $3 AND base_id = $4
      `, [newAvailableQuantity, newAssignedQuantity, assignment.asset_name, assignment.base_id]);
    }

    // Update assignment
    const updateQuery = `
      UPDATE assignments 
      SET quantity = COALESCE($1, quantity),
          assignment_date = COALESCE($2, assignment_date),
          notes = COALESCE($3, notes)
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

    // Start transaction using sql.begin()
    await sql.begin(async (sql) => {
      // Restore asset quantities if assignment is active
      if (assignment.status === 'active') {
        const assetResult = await sql.unsafe(
          'SELECT quantity, available_quantity, assigned_quantity FROM assets WHERE name = $1 AND base_id = $2',
          [assignment.asset_name, assignment.base_id]
        );

        if (assetResult.length > 0) {
          const asset = assetResult[0];
          if (asset) {
            const newAvailableQuantity = asset['available_quantity'] + assignment.quantity;
            const newAssignedQuantity = asset['assigned_quantity'] - assignment.quantity;

            await sql.unsafe(`
              UPDATE assets 
              SET available_quantity = $1, assigned_quantity = $2
              WHERE name = $3 AND base_id = $4
            `, [newAvailableQuantity, newAssignedQuantity, assignment.asset_name, assignment.base_id]);
          }
        }
      }

      // Delete assignment
      await sql.unsafe('DELETE FROM assignments WHERE id = $1', [id as string]);
    });

    // Log assignment deletion
    logger.info({
      action: 'ASSIGNMENT_DELETED',
      user_id: req.user!.user_id,
      assignment_id: id,
      asset_name: assignment.asset_name,
      quantity: assignment.quantity
    });

    return res.json({
      success: true,
      message: 'Assignment deleted successfully'
    });
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
    const { quantity, notes, reason } = req.body;
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
    
    // Start transaction using sql.begin()
    await sql.begin(async (sql) => {
      // Update assignment
      const newExpended = assignment.expended_quantity + quantity;
      let newStatus = 'active';
      if (newExpended === assignment.quantity) newStatus = 'expended';
      else if (newExpended > 0) newStatus = 'partially_expended';
      
      await sql.unsafe(
        'UPDATE assignments SET expended_quantity = $1, status = $2, notes = COALESCE($3, notes) WHERE id = $4 RETURNING *',
        [newExpended, newStatus, notes || null, id]
      );
      
      // Update asset quantities - remove from total inventory (consistent with expenditures page)
      const assetResult = await sql.unsafe(
        'SELECT quantity, available_quantity, assigned_quantity FROM assets WHERE name = $1 AND base_id = $2',
        [assignment.asset_name, assignment.base_id]
      );

      if (assetResult.length === 0) {
        throw new Error('Asset record not found for this base and asset name');
      }

      const asset = assetResult[0];
      if (!asset) {
        throw new Error('Asset record not found for this base and asset name');
      }

      const newQuantity = asset['quantity'] - quantity;
      const newAvailableQuantity = asset['available_quantity'] - quantity;
      const newAssignedQuantity = asset['assigned_quantity'] - quantity;

      if (newQuantity < 0 || newAvailableQuantity < 0 || newAssignedQuantity < 0) {
        throw new Error('Asset quantities cannot be negative');
      }

      // Update asset quantities
      await sql.unsafe(
        'UPDATE assets SET quantity = $1, available_quantity = $2, assigned_quantity = $3 WHERE name = $4 AND base_id = $5',
        [newQuantity, newAvailableQuantity, newAssignedQuantity, assignment.asset_name, assignment.base_id]
      );

      // Update asset status based on remaining quantity
      let assetNewStatus = 'available';
      if (newQuantity === 0) {
        assetNewStatus = 'out_of_stock';
      } else if (newAvailableQuantity === 0) {
        assetNewStatus = 'low_stock';
      }

      await sql.unsafe(
        'UPDATE assets SET status = $1 WHERE name = $2 AND base_id = $3',
        [assetNewStatus, assignment.asset_name, assignment.base_id]
      );

      // Use the provided reason or fallback to default
      const expenditureReason = reason || 'Expended from assignment';

      // Create expenditure record
      await sql.unsafe(
        'INSERT INTO expenditures (asset_name, base_id, personnel_id, quantity, expenditure_date, reason, notes, created_by) VALUES ($1, $2, $3, $4, CURRENT_DATE, $5, $6, $7)',
        [assignment.asset_name, assignment.base_id, assignment.assigned_to, quantity, expenditureReason, (notes as string) || null, req.user!.user_id]
      );
    });
    
    // Log expenditure from assignment
    logger.info({
      action: 'ASSIGNMENT_EXPENDED',
      user_id: req.user!.user_id,
      assignment_id: id,
      asset_name: assignment.asset_name,
      base_id: assignment.base_id,
      personnel_id: assignment.assigned_to,
      quantity,
      reason: reason || 'Expended from assignment'
    });

    return res.json({
      success: true,
      message: 'Asset expended successfully'
    });
  } catch (error) {
    logger.error('Expend assignment error:', error);
    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Server error'
    });
  }
});

export default router; 