import { Router, Request, Response } from 'express';
import { query } from '../database/connection';
import { authenticate, authorize } from '../middleware/auth';
import { logger } from '../utils/logger';

const router = Router();

// @route   GET /api/personnel
// @desc    Get all personnel
// @access  Private
router.get('/', authenticate, async (req: Request, res: Response) => {
  try {
    const { base_id, rank, page = 1, limit = 10 } = req.query;
    
    let whereConditions = ['1=1'];
    const params: any[] = [];
    let paramIndex = 1;

    // Apply filters based on user role
    if (req.user!.role === 'base_commander' && req.user!.base_id) {
      whereConditions.push(`base_id = $${paramIndex++}`);
      params.push(req.user!.base_id);
    } else if (base_id && req.user!.role !== 'admin') {
      whereConditions.push(`base_id = $${paramIndex++}`);
      params.push(base_id);
    }

    if (rank) {
      whereConditions.push(`rank = $${paramIndex++}`);
      params.push(rank);
    }

    const whereClause = whereConditions.join(' AND ');

    // Get total count
    const countQuery = `
      SELECT COUNT(*) as total
      FROM personnel
      WHERE ${whereClause}
    `;
    const countResult = await query(countQuery, params);
    const total = parseInt(countResult.rows[0].total);

    // Get paginated results
    const offset = (parseInt(page as string) - 1) * parseInt(limit as string);
    const personnelQuery = `
      SELECT p.*, b.name as base_name,
             CONCAT(p.first_name, ' ', p.last_name) as full_name
      FROM personnel p
      LEFT JOIN bases b ON p.base_id = b.id
      WHERE ${whereClause}
      ORDER BY p.first_name, p.last_name
      LIMIT $${paramIndex++} OFFSET $${paramIndex++}
    `;
    const personnelResult = await query(personnelQuery, [...params, parseInt(limit as string), offset]);

    res.json({
      success: true,
      data: personnelResult.rows,
      pagination: {
        page: parseInt(page as string),
        limit: parseInt(limit as string),
        total,
        totalPages: Math.ceil(total / parseInt(limit as string))
      }
    });
  } catch (error) {
    logger.error('Get personnel error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

// @route   GET /api/personnel/:id
// @desc    Get personnel by ID
// @access  Private
router.get('/:id', authenticate, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const personnelQuery = `
      SELECT p.*, b.name as base_name,
             CONCAT(p.first_name, ' ', p.last_name) as full_name
      FROM personnel p
      LEFT JOIN bases b ON p.base_id = b.id
      WHERE p.id = $1
    `;
    const result = await query(personnelQuery, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Personnel not found'
      });
    }

    const personnel = result.rows[0];

    // Check access permissions
    if (req.user!.role === 'base_commander' && personnel.base_id !== req.user!.base_id) {
      return res.status(403).json({
        success: false,
        error: 'Access denied to this personnel record'
      });
    }

    return res.json({
      success: true,
      data: personnel
    });
  } catch (error) {
    logger.error('Get personnel error:', error);
    return res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

// @route   POST /api/personnel
// @desc    Create new personnel
// @access  Private (Admin, Base Commander)
router.post('/', authenticate, authorize('admin', 'base_commander'), async (req: Request, res: Response) => {
  try {
    const { first_name, last_name, rank, base_id, email, phone, department } = req.body;

    // Validate required fields
    if (!first_name || !last_name || !rank || !base_id) {
      return res.status(400).json({
        success: false,
        error: 'First name, last name, rank, and base are required'
      });
    }

    // Base commanders can only create personnel for their base
    const targetBaseId = req.user!.role === 'base_commander' ? req.user!.base_id : base_id;

    const createQuery = `
      INSERT INTO personnel (first_name, last_name, rank, base_id, email, phone, department)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `;
    const result = await query(createQuery, [
      first_name,
      last_name,
      rank,
      targetBaseId,
      email || null,
      phone || null,
      department || null
    ]);

    const newPersonnel = result.rows[0];

    // Log personnel creation
    logger.info({
      action: 'PERSONNEL_CREATED',
      user_id: req.user!.user_id,
      personnel_id: newPersonnel.id,
      personnel_name: `${newPersonnel.first_name} ${newPersonnel.last_name}`
    });

    return res.status(201).json({
      success: true,
      data: newPersonnel
    });
  } catch (error) {
    logger.error('Create personnel error:', error);
    return res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

// @route   PUT /api/personnel/:id
// @desc    Update personnel
// @access  Private (Admin, Base Commander)
router.put('/:id', authenticate, authorize('admin', 'base_commander'), async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { first_name, last_name, rank, base_id, email, phone, department } = req.body;

    // Check if personnel exists
    const existingPersonnel = await query(
      'SELECT * FROM personnel WHERE id = $1',
      [id]
    );

    if (existingPersonnel.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Personnel not found'
      });
    }

    const personnel = existingPersonnel.rows[0];

    // Check access permissions
    if (req.user!.role === 'base_commander' && personnel.base_id !== req.user!.base_id) {
      return res.status(403).json({
        success: false,
        error: 'Access denied to this personnel record'
      });
    }

    // Base commanders can only update personnel in their base
    const targetBaseId = req.user!.role === 'base_commander' ? req.user!.base_id : base_id;

    const updateQuery = `
      UPDATE personnel 
      SET first_name = COALESCE($1, first_name),
          last_name = COALESCE($2, last_name),
          rank = COALESCE($3, rank),
          base_id = COALESCE($4, base_id),
          email = COALESCE($5, email),
          phone = COALESCE($6, phone),
          department = COALESCE($7, department),
          updated_at = CURRENT_TIMESTAMP
      WHERE id = $8
      RETURNING *
    `;
    const result = await query(updateQuery, [
      first_name,
      last_name,
      rank,
      targetBaseId,
      email,
      phone,
      department,
      id
    ]);

    const updatedPersonnel = result.rows[0];

    // Log personnel update
    logger.info({
      action: 'PERSONNEL_UPDATED',
      user_id: req.user!.user_id,
      personnel_id: id,
      changes: req.body
    });

    return res.json({
      success: true,
      data: updatedPersonnel
    });
  } catch (error) {
    logger.error('Update personnel error:', error);
    return res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

// @route   DELETE /api/personnel/:id
// @desc    Delete personnel
// @access  Private (Admin, Base Commander)
router.delete('/:id', authenticate, authorize('admin', 'base_commander'), async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Check if personnel exists
    const existingPersonnel = await query(
      'SELECT * FROM personnel WHERE id = $1',
      [id]
    );

    if (existingPersonnel.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Personnel not found'
      });
    }

    const personnel = existingPersonnel.rows[0];

    // Check access permissions
    if (req.user!.role === 'base_commander' && personnel.base_id !== req.user!.base_id) {
      return res.status(403).json({
        success: false,
        error: 'Access denied to this personnel record'
      });
    }

    // Check if personnel has active assignments
    const assignmentCheck = await query(
      'SELECT COUNT(*) as count FROM assignments WHERE assigned_to = $1 AND status = $2',
      [id, 'active']
    );

    if (parseInt(assignmentCheck.rows[0].count) > 0) {
      return res.status(400).json({
        success: false,
        error: 'Cannot delete personnel with active assignments'
      });
    }

    const deleteQuery = 'DELETE FROM personnel WHERE id = $1';
    await query(deleteQuery, [id]);

    // Log personnel deletion
    logger.info({
      action: 'PERSONNEL_DELETED',
      user_id: req.user!.user_id,
      personnel_id: id,
      personnel_name: `${personnel.first_name} ${personnel.last_name}`
    });

    return res.json({
      success: true,
      message: 'Personnel deleted successfully'
    });
  } catch (error) {
    logger.error('Delete personnel error:', error);
    return res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

export default router; 