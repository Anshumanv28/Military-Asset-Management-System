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
    const { base_id, status, page = 1, limit = 10 } = req.query;
    
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
      SELECT a.*, ast.name as asset_name, ast.serial_number, at.name as asset_type_name, b.name as base_name,
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
    const { asset_id, assigned_to, base_id, assignment_date, notes } = req.body;

    // Validate required fields
    if (!asset_id || !assigned_to || !base_id || !assignment_date) {
      return res.status(400).json({
        success: false,
        error: 'Asset ID, assigned_to, base ID, and assignment date are required'
      });
    }

    // Check access permissions
    if (req.user!.role === 'base_commander' && base_id !== req.user!.base_id) {
      return res.status(403).json({
        success: false,
        error: 'Base commanders can only create assignments for their base'
      });
    }

    // Check if asset exists and is available
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
    if (asset.status !== 'available') {
      return res.status(400).json({
        success: false,
        error: 'Asset is not available for assignment'
      });
    }

    const createQuery = `
      INSERT INTO assignments (asset_id, assigned_to, assigned_by, base_id, assignment_date, notes)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `;
    const result = await query(createQuery, [
      asset_id,
      assigned_to,
      req.user!.user_id,
      base_id,
      assignment_date,
      notes || null
    ]);

    const newAssignment = result.rows[0];

    // Update asset status to assigned
    await query(
      'UPDATE assets SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2',
      ['assigned', asset_id]
    );

    // Log assignment creation
    logger.info({
      action: 'ASSIGNMENT_CREATED',
      user_id: req.user!.user_id,
      assignment_id: newAssignment.id,
      asset_id,
      assigned_to
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
// @desc    Return assigned asset
// @access  Private (Admin, Base Commander, Logistics Officer)
router.put('/:id/return', authenticate, authorize('admin', 'base_commander', 'logistics_officer'), async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { return_date, notes } = req.body;

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

    const updateQuery = `
      UPDATE assignments 
      SET status = 'returned', return_date = $1, notes = COALESCE($2, notes), updated_at = CURRENT_TIMESTAMP
      WHERE id = $3
      RETURNING *
    `;
    const result = await query(updateQuery, [
      return_date || new Date().toISOString().split('T')[0],
      notes,
      id
    ]);

    // Update asset status to available
    await query(
      'UPDATE assets SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2',
      ['available', assignment.asset_id]
    );

    // Log assignment return
    logger.info({
      action: 'ASSIGNMENT_RETURNED',
      user_id: req.user!.user_id,
      assignment_id: id,
      asset_id: assignment.asset_id
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
// @access  Private (Admin, Base Commander, Logistics Officer)
router.delete('/:id', authenticate, authorize('admin', 'base_commander', 'logistics_officer'), async (req: Request, res: Response) => {
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

    if (req.user!.role === 'logistics_officer' && assignment.base_id !== req.user!.base_id) {
      return res.status(403).json({
        success: false,
        error: 'Logistics officers can only delete assignments from their base'
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