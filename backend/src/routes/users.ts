import { Router, Request, Response } from 'express';
import { query } from '../database/connection';
import { authenticate } from '../middleware/auth';
import { logger } from '../utils/logger';

const router = Router();

// @route   GET /api/users
// @desc    Get users with optional role filtering
// @access  Private
router.get('/', authenticate, async (req: Request, res: Response) => {
  try {
    const { role, limit = '1000' } = req.query;
    
    let whereConditions = ['u.is_active = true'];
    let queryParams: any[] = [];
    let paramIndex = 1;

    // Add role filter
    if (role && role !== '') {
      whereConditions.push(`u.role = $${paramIndex}`);
      queryParams.push(role);
      paramIndex++;
    }

    const whereClause = whereConditions.join(' AND ');

    const usersQuery = `
      SELECT u.id, u.username, u.first_name, u.last_name, u.role, u.base_id
      FROM users u
      WHERE ${whereClause}
      ORDER BY u.first_name, u.last_name
      LIMIT $${paramIndex}
    `;
    
    const result = await query(usersQuery, [...queryParams, parseInt(limit as string)]);

    return res.json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    logger.error('Get users error:', error);
    return res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

export default router; 