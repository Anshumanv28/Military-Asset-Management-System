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
// @desc    Create new purchase (pending approval)
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

    // Set status based on user role
    let status = 'pending';
    let approved_by = null;
    let approved_at = null;

    // Admin and Base Commander can auto-approve their own purchases
    if (req.user!.role === 'admin' || req.user!.role === 'base_commander') {
      status = 'approved';
      approved_by = req.user!.user_id;
      approved_at = new Date();
    }

    const total_cost = quantity * unit_cost;

    const createQuery = `
      INSERT INTO purchases (asset_type_id, base_id, quantity, unit_cost, total_cost, supplier, purchase_date, delivery_date, purchase_order_number, status, approved_by, approved_at, notes, created_by)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
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
      status,
      approved_by,
      approved_at,
      notes || null,
      req.user!.user_id
    ]);

    const newPurchase = result.rows[0];

    // If purchase is approved, create assets automatically
    if (status === 'approved') {
      await createAssetsFromPurchase(newPurchase);
    }

    // Log purchase creation
    logger.info({
      action: 'PURCHASE_CREATED',
      user_id: req.user!.user_id,
      purchase_id: newPurchase.id,
      asset_type_id,
      quantity,
      total_cost,
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
// @access  Private (Admin, Base Commander)
router.put('/:id/approve', authenticate, authorize('admin', 'base_commander'), async (req: Request, res: Response) => {
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

    // Check access permissions
    if (req.user!.role === 'base_commander' && purchase.base_id !== req.user!.base_id) {
      return res.status(403).json({
        success: false,
        error: 'Base commanders can only approve purchases for their base'
      });
    }

    // Approve the purchase
    const approveQuery = `
      UPDATE purchases 
      SET status = 'approved', approved_by = $1, approved_at = $2, updated_at = CURRENT_TIMESTAMP
      WHERE id = $3
      RETURNING *
    `;
    const result = await query(approveQuery, [req.user!.user_id, new Date(), id]);

    const approvedPurchase = result.rows[0];

    // Create assets from approved purchase
    await createAssetsFromPurchase(approvedPurchase);

    // Log purchase approval
    logger.info({
      action: 'PURCHASE_APPROVED',
      user_id: req.user!.user_id,
      purchase_id: id,
      asset_type_id: purchase.asset_type_id,
      quantity: purchase.quantity
    });

    return res.json({ success: true, data: approvedPurchase });
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

    // Cancel the purchase
    const cancelQuery = `
      UPDATE purchases 
      SET status = 'cancelled', updated_at = CURRENT_TIMESTAMP
      WHERE id = $1
      RETURNING *
    `;
    const result = await query(cancelQuery, [id]);

    const cancelledPurchase = result.rows[0];

    // Log purchase cancellation
    logger.info({
      action: 'PURCHASE_CANCELLED',
      user_id: req.user!.user_id,
      purchase_id: id,
      asset_type_id: purchase.asset_type_id,
      quantity: purchase.quantity
    });

    return res.json({ success: true, data: cancelledPurchase });
  } catch (error) {
    logger.error('Cancel purchase error:', error);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
});

// @route   PUT /api/purchases/:id
// @desc    Update purchase
// @access  Private (Admin, Base Commander, Logistics Officer)
router.put('/:id', authenticate, authorize('admin', 'base_commander', 'logistics_officer'), async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { asset_type_id, base_id, quantity, unit_cost, supplier, purchase_date, delivery_date, purchase_order_number, notes } = req.body;

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

    // Check access permissions
    if (req.user!.role === 'base_commander' && purchase.base_id !== req.user!.base_id) {
      return res.status(403).json({
        success: false,
        error: 'Base commanders can only update purchases for their base'
      });
    }

    if (req.user!.role === 'logistics_officer' && purchase.base_id !== req.user!.base_id) {
      return res.status(403).json({
        success: false,
        error: 'Logistics officers can only update purchases for their base'
      });
    }

    // Check if purchase is already approved or cancelled
    if (purchase.status === 'approved' || purchase.status === 'cancelled') {
      return res.status(400).json({
        success: false,
        error: 'Cannot update an approved or cancelled purchase'
      });
    }

    const updateQuery = `
      UPDATE purchases 
      SET asset_type_id = $1, base_id = $2, quantity = $3, unit_cost = $4, total_cost = $5, 
          supplier = $6, purchase_date = $7, delivery_date = $8, purchase_order_number = $9, 
          notes = $10, updated_at = CURRENT_TIMESTAMP
      WHERE id = $11
      RETURNING *
    `;
    const result = await query(updateQuery, [
      asset_type_id || purchase.asset_type_id,
      base_id || purchase.base_id,
      quantity || purchase.quantity,
      unit_cost || purchase.unit_cost,
      (quantity || purchase.quantity) * (unit_cost || purchase.unit_cost),
      supplier || purchase.supplier,
      purchase_date || purchase.purchase_date,
      delivery_date || purchase.delivery_date,
      purchase_order_number || purchase.purchase_order_number,
      notes || purchase.notes,
      id
    ]);

    return res.json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    logger.error('Update purchase error:', error);
    return res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

// @route   DELETE /api/purchases/:id
// @desc    Delete purchase
// @access  Private (Admin, Base Commander)
router.delete('/:id', authenticate, authorize('admin', 'base_commander'), async (req: Request, res: Response) => {
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

    // Check access permissions
    if (req.user!.role === 'base_commander' && purchase.base_id !== req.user!.base_id) {
      return res.status(403).json({
        success: false,
        error: 'Base commanders can only delete purchases for their base'
      });
    }

    // Check if purchase is already approved
    if (purchase.status === 'approved') {
      return res.status(400).json({
        success: false,
        error: 'Cannot delete an approved purchase'
      });
    }

    // Delete the purchase
    await query('DELETE FROM purchases WHERE id = $1', [id]);

    return res.json({
      success: true,
      message: 'Purchase deleted successfully'
    });
  } catch (error) {
    logger.error('Delete purchase error:', error);
    return res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

// Helper function to create assets from approved purchase
async function createAssetsFromPurchase(purchase: any) {
  try {
    // Get asset type details
    const assetTypeResult = await query(
      'SELECT name, category, unit_of_measure FROM asset_types WHERE id = $1',
      [purchase.asset_type_id]
    );

    if (assetTypeResult.rows.length === 0) {
      throw new Error('Asset type not found');
    }

    const assetType = assetTypeResult.rows[0];

    // Create individual assets
    for (let i = 0; i < purchase.quantity; i++) {
      const serialNumber = `${assetType.name.toUpperCase()}-${Date.now()}-${i + 1}`;
      
      await query(`
        INSERT INTO assets (asset_type_id, serial_number, name, description, current_base_id, status, purchase_date, purchase_cost, current_value)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      `, [
        purchase.asset_type_id,
        serialNumber,
        `${assetType.name} #${i + 1}`,
        `Purchased on ${purchase.purchase_date}`,
        purchase.base_id,
        'available',
        purchase.purchase_date,
        purchase.unit_cost,
        purchase.unit_cost
      ]);
    }

    logger.info({
      action: 'ASSETS_CREATED_FROM_PURCHASE',
      purchase_id: purchase.id,
      asset_type_id: purchase.asset_type_id,
      quantity: purchase.quantity,
      base_id: purchase.base_id
    });
  } catch (error) {
    logger.error('Error creating assets from purchase:', error);
    throw error;
  }
}

export default router; 