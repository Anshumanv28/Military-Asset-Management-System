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

    // Add filter for assigned_to, cast param to text
    if (assigned_to) {
      whereConditions.push(`a.assigned_to = $${paramIndex++}::text`);
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
      SELECT a.*, ast.name as asset_name, ast.serial_number, ast.quantity as asset_quantity, ast.available_quantity as asset_available_quantity,
             at.name as asset_type_name, b.name as base_name,
             CONCAT(p.first_name, ' ', p.last_name) as personnel_name, p.rank as personnel_rank,
             CONCAT(u.first_name, ' ', u.last_name) as assigned_by_name
      FROM assignments a
      JOIN assets ast ON a.asset_id = ast.id
      JOIN asset_types at ON ast.asset_type_id = at.id
      JOIN bases b ON a.base_id = b.id
      JOIN personnel p ON a.assigned_to = p.id::text
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
    const { asset_id, assigned_to, base_id, assignment_date, quantity = 1, notes } = req.body;

    // Validate required fields
    if (!asset_id || !assigned_to || !base_id || !assignment_date) {
      return res.status(400).json({
        success: false,
        error: 'Asset ID, assigned_to, base ID, and assignment date are required'
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

    // Check if asset exists and has sufficient available quantity
    const assetResult = await query(
      'SELECT * FROM assets WHERE id = $1',
      [asset_id]
    );

    if (assetResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Asset not found'
      });
    }

    const asset = assetResult.rows[0];
    if (asset.available_quantity < quantity) {
      return res.status(400).json({
        success: false,
        error: `Insufficient available quantity. Available: ${asset.available_quantity}, Requested: ${quantity}`
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

    const createQuery = `
      INSERT INTO assignments (asset_id, assigned_to, assigned_by, base_id, assignment_date, quantity, notes)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `;
    const result = await query(createQuery, [
      asset_id,
      assigned_to,
      req.user!.user_id,
      base_id,
      assignment_date,
      quantity,
      notes || null
    ]);

    const newAssignment = result.rows[0];

    // Update asset available quantity
    const newAvailableQuantity = asset.available_quantity - quantity;
    await query(
      'UPDATE assets SET available_quantity = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2',
      [newAvailableQuantity, asset_id]
    );

    // Update asset status if no more available quantity
    if (newAvailableQuantity === 0) {
      await query(
        'UPDATE assets SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2',
        ['assigned', asset_id]
      );
    }

    // Log assignment creation
    logger.info({
      action: 'ASSIGNMENT_CREATED',
      user_id: req.user!.user_id,
      assignment_id: newAssignment.id,
      asset_id,
      assigned_to,
      quantity
    });

    return res.status(201).json({
      success: true,
      data: newAssignment
    });
  } catch (error) {
    logger.error('Create assignment error:', error);
    return res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

// @route   PUT /api/assignments/:id/return
// @desc    Return assigned asset (full or partial)
// @access  Private (Admin, Base Commander, Logistics Officer)
router.put('/:id/return', authenticate, authorize('admin', 'base_commander', 'logistics_officer'), async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { return_date, return_quantity, notes } = req.body;

    // Check if assignment exists
    const assignmentResult = await query(
      'SELECT a.*, ast.available_quantity as asset_available_quantity, ast.quantity as asset_total_quantity FROM assignments a JOIN assets ast ON a.asset_id = ast.id WHERE a.id = $1',
      [id]
    );

    if (assignmentResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Assignment not found'
      });
    }

    const assignment = assignmentResult.rows[0];

    // Check if assignment is active
    if (assignment.status !== 'active') {
      return res.status(400).json({
        success: false,
        error: 'Assignment is not active'
      });
    }

    // Check access permissions
    if (req.user!.role === 'base_commander' && assignment.base_id !== req.user!.base_id) {
      return res.status(403).json({
        success: false,
        error: 'Base commanders can only return assignments from their base'
      });
    }

    if (req.user!.role === 'logistics_officer' && assignment.base_id !== req.user!.base_id) {
      return res.status(403).json({
        success: false,
        error: 'Logistics officers can only return assignments from their base'
      });
    }

    // Determine return quantity
    const remainingAssigned = assignment.quantity - assignment.returned_quantity;
    const actualReturnQuantity = return_quantity || remainingAssigned;

    // Validate return quantity
    if (actualReturnQuantity <= 0) {
      return res.status(400).json({
        success: false,
        error: 'Return quantity must be greater than 0'
      });
    }

    if (actualReturnQuantity > remainingAssigned) {
      return res.status(400).json({
        success: false,
        error: `Cannot return more than assigned. Remaining assigned: ${remainingAssigned}, Requested return: ${actualReturnQuantity}`
      });
    }

    // Calculate new returned quantity
    const newReturnedQuantity = assignment.returned_quantity + actualReturnQuantity;
    const newRemainingAssigned = assignment.quantity - newReturnedQuantity;

    // Determine new status
    let newStatus = assignment.status;
    if (newRemainingAssigned === 0) {
      newStatus = 'returned';
    } else if (newReturnedQuantity > 0) {
      newStatus = 'partially_returned';
    }

    const updateQuery = `
      UPDATE assignments 
      SET status = $1, return_date = $2, returned_quantity = $3, notes = COALESCE($4, notes), updated_at = CURRENT_TIMESTAMP
      WHERE id = $5
      RETURNING *
    `;
    const result = await query(updateQuery, [
      newStatus,
      return_date || new Date().toISOString().split('T')[0],
      newReturnedQuantity,
      notes,
      id
    ]);

    // Update asset available quantity
    const newAssetAvailableQuantity = assignment.asset_available_quantity + actualReturnQuantity;
    await query(
      'UPDATE assets SET available_quantity = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2',
      [newAssetAvailableQuantity, assignment.asset_id]
    );

    // Update asset status if it becomes available
    if (newAssetAvailableQuantity > 0) {
      await query(
        'UPDATE assets SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2',
        ['available', assignment.asset_id]
      );
    }

    // Log assignment return
    logger.info({
      action: 'ASSIGNMENT_RETURNED',
      user_id: req.user!.user_id,
      assignment_id: id,
      asset_id: assignment.asset_id,
      return_quantity: actualReturnQuantity,
      total_returned: newReturnedQuantity,
      remaining_assigned: newRemainingAssigned
    });

    return res.json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    logger.error('Return assignment error:', error);
    return res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

// @route   PUT /api/assignments/:id
// @desc    Update assignment
// @access  Private (Admin, Base Commander, Logistics Officer)
router.put('/:id', authenticate, authorize('admin', 'base_commander', 'logistics_officer'), async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { asset_id, assigned_to, base_id, assignment_date, notes } = req.body;

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
        error: 'Base commanders can only update assignments from their base'
      });
    }

    if (req.user!.role === 'logistics_officer' && assignment.base_id !== req.user!.base_id) {
      return res.status(403).json({
        success: false,
        error: 'Logistics officers can only update assignments from their base'
      });
    }

    const updateQuery = `
      UPDATE assignments 
      SET asset_id = $1, assigned_to = $2, base_id = $3, assignment_date = $4, notes = $5, updated_at = CURRENT_TIMESTAMP
      WHERE id = $6
      RETURNING *
    `;
    const result = await query(updateQuery, [
      asset_id || assignment.asset_id,
      assigned_to || assignment.assigned_to,
      base_id || assignment.base_id,
      assignment_date || assignment.assignment_date,
      notes || assignment.notes,
      id
    ]);

    return res.json({
      success: true,
      data: result.rows[0]
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
        error: 'Base commanders can only delete assignments from their base'
      });
    }

    // Delete the assignment
    await query('DELETE FROM assignments WHERE id = $1', [id]);

    // Update asset status to available if it was assigned
    if (assignment.status === 'active') {
      await query(
        'UPDATE assets SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2',
        ['available', assignment.asset_id]
      );
    }

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

export default router; 