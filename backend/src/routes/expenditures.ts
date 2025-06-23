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
      SELECT e.*, at.name as asset_type_name, at.unit_of_measure, b.name as base_name, 
             u.first_name, u.last_name,
             p.first_name as personnel_first_name, p.last_name as personnel_last_name, p.rank as personnel_rank
      FROM expenditures e
      JOIN asset_types at ON e.asset_type_id = at.id
      JOIN bases b ON e.base_id = b.id
      JOIN users u ON e.created_by::uuid = u.id
      LEFT JOIN personnel p ON e.personnel_id = p.id
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
// @desc    Create new expenditure (Delete operation - removes assets from inventory)
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
    const assetResult = await query(
      'SELECT quantity, available_quantity FROM assets WHERE asset_type_id = $1 AND base_id = $2',
      [asset_type_id, base_id]
    );

    if (assetResult.rows.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Base does not have this asset type in inventory'
      });
    }

    const asset = assetResult.rows[0];
    if (asset.available_quantity < quantity) {
      return res.status(400).json({
        success: false,
        error: `Insufficient available quantity for expenditure. Available: ${asset.available_quantity}, Requested: ${quantity}`
      });
    }

    // Start transaction
    await query('BEGIN');

    try {
      // Create expenditure record
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

      // Update asset quantities - reduce from inventory
      const newQuantity = asset.quantity - quantity;
      const newAvailableQuantity = asset.available_quantity - quantity;

      await query(`
        UPDATE assets 
        SET quantity = $1, available_quantity = $2, updated_at = CURRENT_TIMESTAMP
        WHERE asset_type_id = $3 AND base_id = $4
      `, [newQuantity, newAvailableQuantity, asset_type_id, base_id]);

      // Update asset status based on remaining quantity
      let newStatus = 'available';
      if (newQuantity === 0) {
        newStatus = 'out_of_stock';
      } else if (newAvailableQuantity === 0) {
        newStatus = 'low_stock';
      }

      await query(`
        UPDATE assets 
        SET status = $1, updated_at = CURRENT_TIMESTAMP
        WHERE asset_type_id = $2 AND base_id = $3
      `, [newStatus, asset_type_id, base_id]);

      // Commit transaction
      await query('COMMIT');

      // Log expenditure creation
      logger.info({
        action: 'EXPENDITURE_CREATED',
        user_id: req.user!.user_id,
        expenditure_id: newExpenditure.id,
        asset_type_id,
        base_id,
        quantity,
        reason,
        remaining_quantity: newQuantity
      });

      return res.status(201).json({ success: true, data: newExpenditure });
    } catch (error) {
      // Rollback transaction
      await query('ROLLBACK');
      throw error;
    }
  } catch (error) {
    logger.error('Create expenditure error:', error);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
});

// @route   PUT /api/expenditures/:id
// @desc    Update expenditure
// @access  Private (Admin, Base Commander)
router.put('/:id', authenticate, authorize('admin', 'base_commander'), async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { quantity, expenditure_date, reason, notes } = req.body;

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

    // Validate quantity if being updated
    if (quantity !== undefined && quantity <= 0) {
      return res.status(400).json({
        success: false,
        error: 'Quantity must be greater than 0'
      });
    }

    // If quantity is being changed, we need to adjust the asset inventory
    if (quantity !== undefined && quantity !== expenditure.quantity) {
      const quantityDifference = expenditure.quantity - quantity;
      
      // Get current asset inventory
      const assetResult = await query(
        'SELECT quantity, available_quantity FROM assets WHERE asset_type_id = $1 AND base_id = $2',
        [expenditure.asset_type_id, expenditure.base_id]
      );

      if (assetResult.rows.length === 0) {
        return res.status(400).json({
          success: false,
          error: 'Asset inventory not found'
        });
      }

      const asset = assetResult.rows[0];
      const newQuantity = asset.quantity + quantityDifference;
      const newAvailableQuantity = asset.available_quantity + quantityDifference;

      if (newQuantity < 0 || newAvailableQuantity < 0) {
        return res.status(400).json({
          success: false,
          error: 'Cannot reduce expenditure quantity below zero'
        });
      }

      // Update asset quantities
      await query(`
        UPDATE assets 
        SET quantity = $1, available_quantity = $2, updated_at = CURRENT_TIMESTAMP
        WHERE asset_type_id = $3 AND base_id = $4
      `, [newQuantity, newAvailableQuantity, expenditure.asset_type_id, expenditure.base_id]);
    }

    // Update expenditure
    const updateQuery = `
      UPDATE expenditures 
      SET quantity = COALESCE($1, quantity),
          expenditure_date = COALESCE($2, expenditure_date),
          reason = COALESCE($3, reason),
          notes = COALESCE($4, notes),
          updated_at = CURRENT_TIMESTAMP
      WHERE id = $5
      RETURNING *
    `;
    const result = await query(updateQuery, [
      quantity,
      expenditure_date,
      reason,
      notes,
      id
    ]);

    const updatedExpenditure = result.rows[0];

    // Log expenditure update
    logger.info({
      action: 'EXPENDITURE_UPDATED',
      user_id: req.user!.user_id,
      expenditure_id: id,
      old_quantity: expenditure.quantity,
      new_quantity: quantity || expenditure.quantity
    });

    return res.json({
      success: true,
      data: updatedExpenditure
    });
  } catch (error) {
    logger.error('Update expenditure error:', error);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
});

// @route   DELETE /api/expenditures/:id
// @desc    Delete expenditure
// @access  Private (Admin only)
router.delete('/:id', authenticate, authorize('admin'), async (req: Request, res: Response) => {
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

    // Start transaction
    await query('BEGIN');

    try {
      // Restore asset quantities
      const assetResult = await query(
        'SELECT quantity, available_quantity FROM assets WHERE asset_type_id = $1 AND base_id = $2',
        [expenditure.asset_type_id, expenditure.base_id]
      );

      if (assetResult.rows.length > 0) {
        const asset = assetResult.rows[0];
        const newQuantity = asset.quantity + expenditure.quantity;
        const newAvailableQuantity = asset.available_quantity + expenditure.quantity;

        await query(`
          UPDATE assets 
          SET quantity = $1, available_quantity = $2, updated_at = CURRENT_TIMESTAMP
          WHERE asset_type_id = $3 AND base_id = $4
        `, [newQuantity, newAvailableQuantity, expenditure.asset_type_id, expenditure.base_id]);

        // Update asset status
        let newStatus = 'available';
        if (newQuantity === 0) {
          newStatus = 'out_of_stock';
        } else if (newAvailableQuantity === 0) {
          newStatus = 'low_stock';
        }

        await query(`
          UPDATE assets 
          SET status = $1, updated_at = CURRENT_TIMESTAMP
          WHERE asset_type_id = $2 AND base_id = $3
        `, [newStatus, expenditure.asset_type_id, expenditure.base_id]);
      }

      // Delete expenditure
      await query('DELETE FROM expenditures WHERE id = $1', [id]);

      // Commit transaction
      await query('COMMIT');

      // Log expenditure deletion
      logger.info({
        action: 'EXPENDITURE_DELETED',
        user_id: req.user!.user_id,
        expenditure_id: id,
        asset_type_id: expenditure.asset_type_id,
        quantity: expenditure.quantity
      });

      return res.json({
        success: true,
        message: 'Expenditure deleted successfully'
      });
    } catch (error) {
      // Rollback transaction
      await query('ROLLBACK');
      throw error;
    }
  } catch (error) {
    logger.error('Delete expenditure error:', error);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
});

export default router; 