import { Router, Request, Response } from 'express';
import { query } from '../database/connection';
import { authenticate, authorize } from '../middleware/auth';
import { logger } from '../utils/logger';

const router = Router();

// @route   GET /api/purchases
// @desc    Get all purchases with filters
// @access  Private
router.get('/', authenticate, async (req: Request, res: Response) => {
  try {
    const { base_id, asset_type_id, start_date, end_date, page = 1, limit = 10 } = req.query;
    
    let whereConditions = ['1=1'];
    const params: any[] = [];
    let paramIndex = 1;

    // Apply filters based on user role
    if (req.user!.role === 'base_commander' && req.user!.base_id) {
      whereConditions.push(`p.base_id = $${paramIndex++}`);
      params.push(req.user!.base_id);
    } else if (base_id && req.user!.role !== 'admin') {
      whereConditions.push(`p.base_id = $${paramIndex++}`);
      params.push(base_id);
    }

    if (asset_type_id) {
      whereConditions.push(`p.asset_type_id = $${paramIndex++}`);
      params.push(asset_type_id);
    }

    if (start_date && end_date) {
      whereConditions.push(`p.purchase_date BETWEEN $${paramIndex++} AND $${paramIndex++}`);
      params.push(start_date, end_date);
    }

    const whereClause = whereConditions.join(' AND ');

    // Get total count
    const countQuery = `
      SELECT COUNT(*) as total
      FROM purchases p
      WHERE ${whereClause}
    `;
    const countResult = await query(countQuery, params);
    const total = parseInt(countResult.rows[0].total);

    // Get paginated results
    const offset = (parseInt(page as string) - 1) * parseInt(limit as string);
    const purchasesQuery = `
      SELECT p.*, at.name as asset_type_name, b.name as base_name, u.first_name, u.last_name
      FROM purchases p
      JOIN asset_types at ON p.asset_type_id = at.id
      JOIN bases b ON p.base_id = b.id
      JOIN users u ON p.created_by = u.id
      WHERE ${whereClause}
      ORDER BY p.purchase_date DESC
      LIMIT $${paramIndex++} OFFSET $${paramIndex++}
    `;
    const purchasesResult = await query(purchasesQuery, [...params, parseInt(limit as string), offset]);

    res.json({
      success: true,
      data: purchasesResult.rows,
      pagination: {
        page: parseInt(page as string),
        limit: parseInt(limit as string),
        total,
        totalPages: Math.ceil(total / parseInt(limit as string))
      }
    });
  } catch (error) {
    logger.error('Get purchases error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

// @route   POST /api/purchases
// @desc    Create new purchase
// @access  Private (Admin, Base Commander, Logistics Officer)
router.post('/', authenticate, authorize('admin', 'base_commander', 'logistics_officer'), async (req: Request, res: Response) => {
  try {
    const { asset_type_id, base_id, quantity, unit_cost, supplier, purchase_date, delivery_date, purchase_order_number, notes } = req.body;

    // Validate required fields
    if (!asset_type_id || !base_id || !quantity || !unit_cost || !purchase_date) {
      return res.status(400).json({
        success: false,
        error: 'Asset type ID, base ID, quantity, unit cost, and purchase date are required'
      });
    }

    // Check access permissions
    if (req.user!.role === 'base_commander' && base_id !== req.user!.base_id) {
      return res.status(403).json({
        success: false,
        error: 'Base commanders can only create purchases for their base'
      });
    }

    const total_cost = quantity * unit_cost;

    const createQuery = `
      INSERT INTO purchases (asset_type_id, base_id, quantity, unit_cost, total_cost, supplier, purchase_date, delivery_date, purchase_order_number, notes, created_by)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      RETURNING *
    `;
    const result = await query(createQuery, [
      asset_type_id,
      base_id,
      quantity,
      unit_cost,
      total_cost,
      supplier || null,
      purchase_date,
      delivery_date || null,
      purchase_order_number || null,
      notes || null,
      req.user!.user_id
    ]);

    const newPurchase = result.rows[0];

    // Log purchase creation
    logger.info({
      action: 'PURCHASE_CREATED',
      user_id: req.user!.user_id,
      purchase_id: newPurchase.id,
      asset_type_id,
      quantity,
      total_cost
    });

    return res.status(201).json({ success: true, data: newPurchase });
  } catch (error) {
    logger.error('Create purchase error:', error);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
});

export default router; 