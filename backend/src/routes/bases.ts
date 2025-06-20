import { Router, Request, Response } from 'express';
import { query } from '../database/connection';
import { authenticate, authorize } from '../middleware/auth';
import { logger } from '../utils/logger';

const router = Router();

// @route   GET /api/bases
// @desc    Get all bases
// @access  Private
router.get('/', authenticate, async (_req: Request, res: Response) => {
  try {
    const basesQuery = `
      SELECT b.*, u.first_name, u.last_name
      FROM bases b
      LEFT JOIN users u ON b.commander_id = u.id
      WHERE b.is_active = true
      ORDER BY b.name
    `;
    const result = await query(basesQuery);

    return res.json({
      success: true,
      data: result.rows
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

export default router; 