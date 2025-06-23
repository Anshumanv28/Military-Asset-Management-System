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
    const { base_id, asset_name, start_date, end_date, page = 1, limit = 10 } = req.query;
    
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

    if (asset_name) {
      whereConditions.push(`p.asset_name ILIKE $${paramIndex++}`);
      params.push(`%${asset_name}%`);
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
      SELECT p.*, b.name as base_name, u.first_name, u.last_name
      FROM purchases p
      JOIN bases b ON p.base_id = b.id
      JOIN users u ON p.created_by::uuid = u.id
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
// @desc    Create new purchase (Create operation - adds assets to inventory)
// @access  Private (Admin, Base Commander)
router.post('/', authenticate, authorize('admin', 'base_commander'), async (req: Request, res: Response) => {
  try {
    const { asset_id, base_id, quantity, supplier, purchase_date, notes } = req.body;

    // Validate required fields
    if (!asset_id || !base_id || !quantity || !purchase_date) {
      return res.status(400).json({
        success: false,
        error: 'Asset, base, quantity, and purchase date are required'
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
        error: 'Base commanders can only create purchases for their base'
      });
    }

    // All purchases start as pending - only admins can approve them
    const status = 'pending';
    const approved_by = null;
    const approved_at = null;

    const createQuery = `
      INSERT INTO purchases (asset_id, base_id, quantity, supplier, purchase_date, status, approved_by, approved_at, notes, created_by)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING *
    `;
    const result = await query(createQuery, [
      asset_id,
      base_id,
      quantity,
      supplier || null,
      purchase_date,
      status,
      approved_by,
      approved_at,
      notes || null,
      req.user!.user_id
    ]);

    const newPurchase = result.rows[0];

    // Log purchase creation
    logger.info({
      action: 'PURCHASE_CREATED',
      user_id: req.user!.user_id,
      purchase_id: newPurchase.id,
      asset_id,
      quantity,
      status
    });

    return res.status(201).json({ success: true, data: newPurchase });
  } catch (error) {
    logger.error('Create purchase error:', error);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
});

// @route   PUT /api/purchases/:id/approve
// @desc    Approve purchase request
// @access  Private (Admin only)
router.put('/:id/approve', authenticate, authorize('admin'), async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Check if purchase exists
    const purchaseResult = await query(
      'SELECT * FROM purchases WHERE id = $1',
      [id]
    );

    if (purchaseResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Purchase not found'
      });
    }

    const purchase = purchaseResult.rows[0];

    // Check if already approved
    if (purchase.status === 'approved') {
      return res.status(400).json({
        success: false,
        error: 'Purchase is already approved'
      });
    }

    // Check if cancelled
    if (purchase.status === 'cancelled') {
      return res.status(400).json({
        success: false,
        error: 'Cannot approve a cancelled purchase'
      });
    }

    // Approve purchase
    const approveQuery = `
      UPDATE purchases 
      SET status = 'approved', approved_by = $1, approved_at = CURRENT_TIMESTAMP
      WHERE id = $2
      RETURNING *
    `;
    const result = await query(approveQuery, [req.user!.user_id, id]);

    const approvedPurchase = result.rows[0];

    // Add assets to inventory
    await addAssetsToInventory(approvedPurchase);

    // Log purchase approval
    logger.info({
      action: 'PURCHASE_APPROVED',
      user_id: req.user!.user_id,
      purchase_id: id,
      asset_id: purchase.asset_id,
      quantity: purchase.quantity
    });

    return res.json({
      success: true,
      data: approvedPurchase
    });
  } catch (error) {
    logger.error('Approve purchase error:', error);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
});

// @route   PUT /api/purchases/:id/cancel
// @desc    Cancel purchase request
// @access  Private (Admin, Base Commander)
router.put('/:id/cancel', authenticate, authorize('admin', 'base_commander'), async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Check if purchase exists
    const purchaseResult = await query(
      'SELECT * FROM purchases WHERE id = $1',
      [id]
    );

    if (purchaseResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Purchase not found'
      });
    }

    const purchase = purchaseResult.rows[0];

    // Check if already cancelled
    if (purchase.status === 'cancelled') {
      return res.status(400).json({
        success: false,
        error: 'Purchase is already cancelled'
      });
    }

    // Check if already approved
    if (purchase.status === 'approved') {
      return res.status(400).json({
        success: false,
        error: 'Cannot cancel an approved purchase'
      });
    }

    // Check access permissions
    if (req.user!.role === 'base_commander' && purchase.base_id !== req.user!.base_id) {
      return res.status(403).json({
        success: false,
        error: 'Base commanders can only cancel purchases for their base'
      });
    }

    // Cancel purchase
    const cancelQuery = `
      UPDATE purchases 
      SET status = 'cancelled'
      WHERE id = $1
      RETURNING *
    `;
    const result = await query(cancelQuery, [id]);

    const cancelledPurchase = result.rows[0];

    // Log purchase cancellation
    logger.info({
      action: 'PURCHASE_CANCELLED',
      user_id: req.user!.user_id,
      purchase_id: id
    });

    return res.json({
      success: true,
      data: cancelledPurchase
    });
  } catch (error) {
    logger.error('Cancel purchase error:', error);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
});

// @route   DELETE /api/purchases/:id
// @desc    Delete purchase
// @access  Private (Admin only)
router.delete('/:id', authenticate, authorize('admin'), async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Check if purchase exists
    const purchaseResult = await query(
      'SELECT * FROM purchases WHERE id = $1',
      [id]
    );

    if (purchaseResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Purchase not found'
      });
    }

    const purchase = purchaseResult.rows[0];

    // Check if purchase is approved
    if (purchase.status === 'approved') {
      return res.status(400).json({
        success: false,
        error: 'Cannot delete an approved purchase'
      });
    }

    // Delete purchase
    await query('DELETE FROM purchases WHERE id = $1', [id]);

    // Log purchase deletion
    logger.info({
      action: 'PURCHASE_DELETED',
      user_id: req.user!.user_id,
      purchase_id: id
    });

    return res.json({
      success: true,
      message: 'Purchase deleted successfully'
    });
  } catch (error) {
    logger.error('Delete purchase error:', error);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
});

// @route   PUT /api/purchases/:id
// @desc    Update purchase
// @access  Private (Admin, Base Commander)
router.put('/:id', authenticate, authorize('admin', 'base_commander'), async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { asset_id, base_id, quantity, supplier, purchase_date, notes } = req.body;

    // Validate required fields
    if (!asset_id || !base_id || !quantity || !purchase_date) {
      return res.status(400).json({
        success: false,
        error: 'Asset, base, quantity, and purchase date are required'
      });
    }

    // Validate quantity
    if (quantity <= 0) {
      return res.status(400).json({
        success: false,
        error: 'Quantity must be greater than 0'
      });
    }

    // Check if purchase exists
    const existingPurchase = await query('SELECT * FROM purchases WHERE id = $1', [id]);
    if (existingPurchase.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Purchase not found'
      });
    }

    const purchase = existingPurchase.rows[0];

    // Check access permissions
    if (req.user!.role === 'base_commander') {
      if (purchase.base_id !== req.user!.base_id) {
        return res.status(403).json({
          success: false,
          error: 'Base commanders can only edit purchases for their base'
        });
      }
      if (purchase.status === 'approved') {
        return res.status(403).json({
          success: false,
          error: 'Cannot edit approved purchases'
        });
      }
    }

    // Update purchase
    const updateQuery = `
      UPDATE purchases 
      SET asset_id = $1, base_id = $2, quantity = $3, supplier = $4, purchase_date = $5, notes = $6
      WHERE id = $7
      RETURNING *
    `;
    const result = await query(updateQuery, [
      asset_id,
      base_id,
      quantity,
      supplier || null,
      purchase_date,
      notes || null,
      id
    ]);

    const updatedPurchase = result.rows[0];

    // Log purchase update
    logger.info({
      action: 'PURCHASE_UPDATED',
      user_id: req.user!.user_id,
      purchase_id: id,
      asset_id,
      quantity
    });

    return res.json({ success: true, data: updatedPurchase });
  } catch (error) {
    logger.error('Update purchase error:', error);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
});

// Helper function to add assets to inventory when purchase is approved
async function addAssetsToInventory(purchase: any) {
  try {
    // First, get the asset name from the assets table using the asset_id
    const assetResult = await query(
      'SELECT name FROM assets WHERE id = $1',
      [purchase.asset_id]
    );

    if (assetResult.rows.length === 0) {
      throw new Error(`Asset with id ${purchase.asset_id} not found`);
    }

    const assetName = assetResult.rows[0].name;

    // Check if asset inventory already exists for this type and base
    const existingAsset = await query(
      'SELECT * FROM assets WHERE name = $1 AND base_id = $2',
      [assetName, purchase.base_id]
    );

    if (existingAsset.rows.length > 0) {
      // Update existing inventory
      const asset = existingAsset.rows[0];
      const newQuantity = asset.quantity + purchase.quantity;
      const newAvailableQuantity = asset.available_quantity + purchase.quantity;

      await query(`
        UPDATE assets 
        SET quantity = $1, available_quantity = $2
        WHERE id = $3
      `, [newQuantity, newAvailableQuantity, asset.id]);

      logger.info({
        action: 'ASSET_INVENTORY_UPDATED_FROM_PURCHASE',
        purchase_id: purchase.id,
        asset_id: asset.id,
        added_quantity: purchase.quantity,
        new_total_quantity: newQuantity
      });
    } else {
      // Create new inventory entry
      const result = await query(`
        INSERT INTO assets (name, base_id, quantity, available_quantity, assigned_quantity)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *
      `, [assetName, purchase.base_id, purchase.quantity, purchase.quantity, 0]);

      const newAsset = result.rows[0];

      logger.info({
        action: 'ASSET_INVENTORY_CREATED_FROM_PURCHASE',
        purchase_id: purchase.id,
        asset_id: newAsset.id,
        quantity: purchase.quantity
      });
    }
  } catch (error) {
    logger.error('Error adding assets to inventory from purchase:', error);
    throw error;
  }
}

export default router; 