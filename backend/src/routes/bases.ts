import { Router, Request, Response } from 'express';
import { query } from '../database/connection';
import { authenticate, authorize } from '../middleware/auth';
import { logger } from '../utils/logger';

const router = Router();

// @route   GET /api/bases
// @desc    Get all bases
// @access  Private
router.get('/', authenticate, async (req: Request, res: Response) => {
  try {
    const { page = '1', limit = '10', is_active, commander_id } = req.query;
    const offset = (parseInt(page as string) - 1) * parseInt(limit as string);
    
    let whereConditions = ['b.is_active = true'];
    let queryParams: any[] = [];
    let paramIndex = 1;

    // Add status filter
    if (is_active !== undefined && is_active !== '') {
      whereConditions.push(`b.is_active = $${paramIndex}`);
      queryParams.push(is_active === 'true');
      paramIndex++;
    }

    // Add commander filter
    if (commander_id && commander_id !== '') {
      whereConditions.push(`b.commander_id = $${paramIndex}`);
      queryParams.push(commander_id);
      paramIndex++;
    }

    const whereClause = whereConditions.join(' AND ');

    // Get total count
    const countQuery = `
      SELECT COUNT(*) as total
      FROM bases b
      WHERE ${whereClause}
    `;
    const countResult = await query(countQuery, queryParams);
    const total = parseInt(countResult.rows[0].total);

    // Get paginated results
    const basesQuery = `
      SELECT b.*, u.first_name, u.last_name
      FROM bases b
      LEFT JOIN users u ON b.commander_id = u.id
      WHERE ${whereClause}
      ORDER BY b.name
      LIMIT $${paramIndex} OFFSET $${paramIndex + 1}
    `;
    
    const result = await query(basesQuery, [...queryParams, parseInt(limit as string), offset]);

    return res.json({
      success: true,
      data: result.rows,
      pagination: {
        page: parseInt(page as string),
        limit: parseInt(limit as string),
        total,
        pages: Math.ceil(total / parseInt(limit as string))
      }
    });
  } catch (error) {
    logger.error('Get bases error:', error);
    return res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

// @route   GET /api/bases/:id
// @desc    Get base by ID
// @access  Private
router.get('/:id', authenticate, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const baseQuery = `
      SELECT b.*, u.first_name, u.last_name
      FROM bases b
      LEFT JOIN users u ON b.commander_id = u.id
      WHERE b.id = $1 AND b.is_active = true
    `;
    const result = await query(baseQuery, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Base not found'
      });
    }

    return res.json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    logger.error('Get base error:', error);
    return res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

// @route   POST /api/bases
// @desc    Create new base
// @access  Private (Admin only)
router.post('/', authenticate, authorize('admin'), async (req: Request, res: Response) => {
  try {
    const { name, code, location, commander_id } = req.body;

    // Validate required fields
    if (!name || !code || !location) {
      return res.status(400).json({
        success: false,
        error: 'Name, code, and location are required'
      });
    }

    // Check if code already exists
    const existingBase = await query(
      'SELECT id FROM bases WHERE code = $1',
      [code]
    );

    if (existingBase.rows.length > 0) {
      return res.status(400).json({
        success: false,
        error: 'Base code already exists'
      });
    }

    const createQuery = `
      INSERT INTO bases (name, code, location, commander_id)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;
    const result = await query(createQuery, [
      name,
      code,
      location,
      commander_id || null
    ]);

    const newBase = result.rows[0];

    // Log base creation
    logger.info({
      action: 'BASE_CREATED',
      user_id: req.user!.user_id,
      base_id: newBase.id,
      base_name: newBase.name
    });

    return res.status(201).json({
      success: true,
      data: newBase
    });
  } catch (error) {
    logger.error('Create base error:', error);
    return res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

// @route   PUT /api/bases/:id
// @desc    Update base
// @access  Private (Admin only)
router.put('/:id', authenticate, authorize('admin'), async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, code, location, commander_id, is_active } = req.body;

    // Check if base exists
    const existingBase = await query(
      'SELECT id FROM bases WHERE id = $1',
      [id]
    );

    if (existingBase.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Base not found'
      });
    }

    // Check if code already exists (excluding current base)
    if (code) {
      const codeExists = await query(
        'SELECT id FROM bases WHERE code = $1 AND id != $2',
        [code, id]
      );

      if (codeExists.rows.length > 0) {
        return res.status(400).json({
          success: false,
          error: 'Base code already exists'
        });
      }
    }

    const updateQuery = `
      UPDATE bases 
      SET name = COALESCE($1, name),
          code = COALESCE($2, code),
          location = COALESCE($3, location),
          commander_id = $4,
          is_active = COALESCE($5, is_active),
          updated_at = CURRENT_TIMESTAMP
      WHERE id = $6
      RETURNING *
    `;
    
    const result = await query(updateQuery, [
      name,
      code,
      location,
      commander_id || null,
      is_active,
      id
    ]);

    const updatedBase = result.rows[0];

    // Log base update
    logger.info({
      action: 'BASE_UPDATED',
      user_id: req.user!.user_id,
      base_id: updatedBase.id,
      base_name: updatedBase.name
    });

    return res.json({
      success: true,
      data: updatedBase
    });
  } catch (error) {
    logger.error('Update base error:', error);
    return res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

// @route   DELETE /api/bases/:id
// @desc    Delete base (soft delete by setting is_active to false)
// @access  Private (Admin only)
router.delete('/:id', authenticate, authorize('admin'), async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Check if base exists
    const existingBase = await query(
      'SELECT id, name FROM bases WHERE id = $1',
      [id]
    );

    if (existingBase.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Base not found'
      });
    }

    // Soft delete by setting is_active to false
    const deleteQuery = `
      UPDATE bases 
      SET is_active = false, updated_at = CURRENT_TIMESTAMP
      WHERE id = $1
      RETURNING *
    `;
    
    const result = await query(deleteQuery, [id]);
    const deletedBase = result.rows[0];

    // Log base deletion
    logger.info({
      action: 'BASE_DELETED',
      user_id: req.user!.user_id,
      base_id: deletedBase.id,
      base_name: deletedBase.name
    });

    return res.json({
      success: true,
      data: deletedBase
    });
  } catch (error) {
    logger.error('Delete base error:', error);
    return res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

export default router; 