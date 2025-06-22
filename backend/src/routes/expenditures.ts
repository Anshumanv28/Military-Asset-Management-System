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
      JOIN users u ON e.created_by::uuid = u.id
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
        error: 'Base commanders can only create expenditures for their base'
      });
    }

    // Check if there are sufficient assets available for expenditure
    const availableAssetsResult = await query(
      `SELECT SUM(available_quantity) as total_available, SUM(quantity) as total_quantity
       FROM assets 
       WHERE asset_type_id = $1 AND current_base_id = $2`,
      [asset_type_id, base_id]
    );

    const totalAvailable = parseInt(availableAssetsResult.rows[0].total_available) || 0;

    if (totalAvailable < quantity) {
      return res.status(400).json({
        success: false,
        error: `Insufficient available quantity for expenditure. Available: ${totalAvailable}, Requested: ${quantity}`
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

    // Update asset quantities - reduce from available assets
    let remainingToExpend = quantity;
    const assetsToUpdate = await query(
      `SELECT id, available_quantity, quantity 
       FROM assets 
       WHERE asset_type_id = $1 AND current_base_id = $2 AND available_quantity > 0
       ORDER BY available_quantity DESC`,
      [asset_type_id, base_id]
    );

    for (const asset of assetsToUpdate.rows) {
      if (remainingToExpend <= 0) break;

      const expendFromThisAsset = Math.min(remainingToExpend, asset.available_quantity);
      const newAvailableQuantity = asset.available_quantity - expendFromThisAsset;
      const newTotalQuantity = asset.quantity - expendFromThisAsset;

      await query(
        'UPDATE assets SET available_quantity = $1, quantity = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $3',
        [newAvailableQuantity, newTotalQuantity, asset.id]
      );

      // Update asset status if no more quantity
      if (newTotalQuantity === 0) {
        await query(
          'UPDATE assets SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2',
          ['retired', asset.id]
        );
      } else if (newAvailableQuantity === 0) {
        await query(
          'UPDATE assets SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2',
          ['assigned', asset.id]
        );
      }

      remainingToExpend -= expendFromThisAsset;
    }

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

// @route   PUT /api/expenditures/:id
// @desc    Update expenditure
// @access  Private (Admin, Base Commander, Logistics Officer)
router.put('/:id', authenticate, authorize('admin', 'base_commander', 'logistics_officer'), async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { asset_type_id, base_id, quantity, expenditure_date, reason, notes } = req.body;

    // Check if expenditure exists
    const expenditureResult = await query(
      'SELECT * FROM expenditures WHERE id = $1',
      [id]
    );

    if (expenditureResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Expenditure not found'
      });
    }

    const expenditure = expenditureResult.rows[0];

    // Check access permissions
    if (req.user!.role === 'base_commander' && expenditure.base_id !== req.user!.base_id) {
      return res.status(403).json({
        success: false,
        error: 'Base commanders can only update expenditures for their base'
      });
    }

    if (req.user!.role === 'logistics_officer' && expenditure.base_id !== req.user!.base_id) {
      return res.status(403).json({
        success: false,
        error: 'Logistics officers can only update expenditures for their base'
      });
    }

    const updateQuery = `
      UPDATE expenditures 
      SET asset_type_id = $1, base_id = $2, quantity = $3, expenditure_date = $4, reason = $5, notes = $6, updated_at = CURRENT_TIMESTAMP
      WHERE id = $7
      RETURNING *
    `;
    const result = await query(updateQuery, [
      asset_type_id || expenditure.asset_type_id,
      base_id || expenditure.base_id,
      quantity || expenditure.quantity,
      expenditure_date || expenditure.expenditure_date,
      reason || expenditure.reason,
      notes || expenditure.notes,
      id
    ]);

    return res.json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    logger.error('Update expenditure error:', error);
    return res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

// @route   DELETE /api/expenditures/:id
// @desc    Delete expenditure
// @access  Private (Admin, Base Commander)
router.delete('/:id', authenticate, authorize('admin', 'base_commander'), async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Check if expenditure exists
    const expenditureResult = await query(
      'SELECT * FROM expenditures WHERE id = $1',
      [id]
    );

    if (expenditureResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Expenditure not found'
      });
    }

    const expenditure = expenditureResult.rows[0];

    // Check access permissions
    if (req.user!.role === 'base_commander' && expenditure.base_id !== req.user!.base_id) {
      return res.status(403).json({
        success: false,
        error: 'Base commanders can only delete expenditures for their base'
      });
    }

    // Delete the expenditure
    await query('DELETE FROM expenditures WHERE id = $1', [id]);

    return res.json({
      success: true,
      message: 'Expenditure deleted successfully'
    });
  } catch (error) {
    logger.error('Delete expenditure error:', error);
    return res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

export default router; 