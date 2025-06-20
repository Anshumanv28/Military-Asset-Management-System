import { Router, Request, Response } from 'express';
import { query } from '../database/connection';
import { authenticate, authorize } from '../middleware/auth';
import { logger } from '../utils/logger';

const router = Router();

// @route   GET /api/expenditures
// @desc    Get all expenditures with filters
// @access  Private
router.get('/', authenticate, async (req: Request, res: Response) => {
  try {
    const { base_id, asset_type_id, start_date, end_date, page = 1, limit = 10 } = req.query;
    
    let whereConditions = ['1=1'];
    const params: any[] = [];
    let paramIndex = 1;

    // Apply filters based on user role
    if (req.user!.role === 'base_commander' && req.user!.base_id) {
      whereConditions.push(`e.base_id = $${paramIndex++}`);
      params.push(req.user!.base_id);
    } else if (base_id && req.user!.role !== 'admin') {
      whereConditions.push(`e.base_id = $${paramIndex++}`);
      params.push(base_id);
    }

    if (asset_type_id) {
      whereConditions.push(`e.asset_type_id = $${paramIndex++}`);
      params.push(asset_type_id);
    }

    if (start_date && end_date) {
      whereConditions.push(`e.expenditure_date BETWEEN $${paramIndex++} AND $${paramIndex++}`);
      params.push(start_date, end_date);
    }

    const whereClause = whereConditions.join(' AND ');

    // Get total count
    const countQuery = `
      SELECT COUNT(*) as total
      FROM expenditures e
      WHERE ${whereClause}
    `;
    const countResult = await query(countQuery, params);
    const total = parseInt(countResult.rows[0].total);

    // Get paginated results
    const offset = (parseInt(page as string) - 1) * parseInt(limit as string);
    const expendituresQuery = `
      SELECT e.*, at.name as asset_type_name, b.name as base_name, u.first_name, u.last_name
      FROM expenditures e
      JOIN asset_types at ON e.asset_type_id = at.id
      JOIN bases b ON e.base_id = b.id
      JOIN users u ON e.created_by = u.id
      WHERE ${whereClause}
      ORDER BY e.expenditure_date DESC
      LIMIT $${paramIndex++} OFFSET $${paramIndex++}
    `;
    const expendituresResult = await query(expendituresQuery, [...params, parseInt(limit as string), offset]);

    res.json({
      success: true,
      data: expendituresResult.rows,
      pagination: {
        page: parseInt(page as string),
        limit: parseInt(limit as string),
        total,
        totalPages: Math.ceil(total / parseInt(limit as string))
      }
    });
  } catch (error) {
    logger.error('Get expenditures error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

// @route   POST /api/expenditures
// @desc    Create new expenditure
// @access  Private (Admin, Base Commander, Logistics Officer)
router.post('/', authenticate, authorize('admin', 'base_commander', 'logistics_officer'), async (req: Request, res: Response) => {
  try {
    const { asset_type_id, base_id, quantity, expenditure_date, reason, notes } = req.body;

    // Validate required fields
    if (!asset_type_id || !base_id || !quantity || !expenditure_date || !reason) {
      return res.status(400).json({
        success: false,
        error: 'Asset type ID, base ID, quantity, expenditure date, and reason are required'
      });
    }

    // Check access permissions
    if (req.user!.role === 'base_commander' && base_id !== req.user!.base_id) {
      return res.status(403).json({
        success: false,
        error: 'Base commanders can only create expenditures for their base'
      });
    }

    const createQuery = `
      INSERT INTO expenditures (asset_type_id, base_id, quantity, expenditure_date, reason, notes, created_by)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `;
    const result = await query(createQuery, [
      asset_type_id,
      base_id,
      quantity,
      expenditure_date,
      reason,
      notes || null,
      req.user!.user_id
    ]);

    const newExpenditure = result.rows[0];

    // Log expenditure creation
    logger.info({
      action: 'EXPENDITURE_CREATED',
      user_id: req.user!.user_id,
      expenditure_id: newExpenditure.id,
      asset_type_id,
      quantity,
      reason
    });

    return res.status(201).json({ success: true, data: newExpenditure });
  } catch (error) {
    logger.error('Create expenditure error:', error);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
});

export default router; 