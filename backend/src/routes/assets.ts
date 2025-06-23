import { Router, Request, Response } from 'express';
import { query } from '../database/connection';
import { authenticate, authorize } from '../middleware/auth';
import { logger } from '../utils/logger';

const router = Router();

// @route   GET /api/assets
// @desc    Get all assets with filters (quantity-based)
// @access  Private
router.get('/', authenticate, async (req: Request, res: Response) => {
  try {
    const { base_id, asset_type_id, status, page = 1, limit = 10 } = req.query;
    
    let whereConditions = ['1=1'];
    const params: any[] = [];
    let paramIndex = 1;

    // Apply filters based on user role
    if (req.user!.role === 'base_commander' && req.user!.base_id) {
      whereConditions.push(`a.base_id = $${paramIndex++}`);
      params.push(req.user!.base_id);
    } else if (base_id && req.user!.role !== 'admin') {
      whereConditions.push(`a.base_id = $${paramIndex++}`);
      params.push(base_id);
    }

    if (asset_type_id) {
      whereConditions.push(`a.asset_type_id = $${paramIndex++}`);
      params.push(asset_type_id);
    }

    if (status) {
      whereConditions.push(`a.status = $${paramIndex++}`);
      params.push(status);
    }

    const whereClause = whereConditions.join(' AND ');

    // Get total count
    const countQuery = `
      SELECT COUNT(*) as total
      FROM assets a
      WHERE ${whereClause}
    `;
    const countResult = await query(countQuery, params);
    const total = parseInt(countResult.rows[0].total);

    // Get paginated results
    const offset = (parseInt(page as string) - 1) * parseInt(limit as string);
    const assetsQuery = `
      SELECT 
        a.*,
        at.name as name,
        'N/A' as serial_number,
        at.category,
        at.unit_of_measure,
        b.name as current_base_name,
        b.code as base_code
      FROM assets a
      JOIN asset_types at ON a.asset_type_id = at.id
      JOIN bases b ON a.base_id = b.id
      WHERE ${whereClause}
      ORDER BY at.name, b.name
      LIMIT $${paramIndex++} OFFSET $${paramIndex++}
    `;
    const assetsResult = await query(assetsQuery, [...params, parseInt(limit as string), offset]);

    res.json({
      success: true,
      data: assetsResult.rows,
      pagination: {
        page: parseInt(page as string),
        limit: parseInt(limit as string),
        total,
        totalPages: Math.ceil(total / parseInt(limit as string))
      }
    });
  } catch (error) {
    logger.error('Get assets error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

// @route   GET /api/assets/:id
// @desc    Get asset by ID
// @access  Private
router.get('/:id', authenticate, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const assetQuery = `
      SELECT 
        a.*,
        at.name as name,
        'N/A' as serial_number,
        at.category,
        at.unit_of_measure,
        b.name as current_base_name,
        b.code as base_code
      FROM assets a
      JOIN asset_types at ON a.asset_type_id = at.id
      JOIN bases b ON a.base_id = b.id
      WHERE a.id = $1
    `;
    const assetResult = await query(assetQuery, [id]);

    if (assetResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Asset not found'
      });
    }

    const asset = assetResult.rows[0];

    // Check access permissions
    if (req.user!.role === 'base_commander' && asset.base_id !== req.user!.base_id) {
      return res.status(403).json({
        success: false,
        error: 'Access denied to this asset'
      });
    }

    return res.json({
      success: true,
      data: asset
    });
  } catch (error) {
    logger.error('Get asset by ID error:', error);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
});

// @route   POST /api/assets
// @desc    Create new asset inventory entry
// @access  Private (Admin, Base Commander)
router.post('/', authenticate, authorize('admin', 'base_commander'), async (req: Request, res: Response) => {
  try {
    const { asset_type_id, base_id, quantity, available_quantity, assigned_quantity } = req.body;

    // Validate required fields
    if (!asset_type_id || !base_id || quantity === undefined) {
      return res.status(400).json({
        success: false,
        error: 'Asset type ID, base ID, and quantity are required'
      });
    }

    // Validate quantity
    if (quantity < 0) {
      return res.status(400).json({
        success: false,
        error: 'Quantity must be non-negative'
      });
    }

    // Base commanders can only create assets for their base
    const targetBaseId = req.user!.role === 'base_commander' ? req.user!.base_id : base_id;

    // Check if asset type exists
    const assetTypeCheck = await query(
      'SELECT id FROM asset_types WHERE id = $1',
      [asset_type_id]
    );

    if (assetTypeCheck.rows.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Asset type not found'
      });
    }

    // Check if base exists
    const baseCheck = await query(
      'SELECT id FROM bases WHERE id = $1',
      [targetBaseId]
    );

    if (baseCheck.rows.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Base not found'
      });
    }

    // Check if asset already exists for this type and base
    const existingAsset = await query(
      'SELECT id FROM assets WHERE asset_type_id = $1 AND base_id = $2',
      [asset_type_id, targetBaseId]
    );

    if (existingAsset.rows.length > 0) {
      return res.status(400).json({
        success: false,
        error: 'Asset inventory already exists for this type and base'
      });
    }

    // Set default values
    const finalAvailableQuantity = available_quantity !== undefined ? available_quantity : quantity;
    const finalAssignedQuantity = assigned_quantity !== undefined ? assigned_quantity : 0;

    // Validate quantities
    if (finalAvailableQuantity + finalAssignedQuantity > quantity) {
      return res.status(400).json({
        success: false,
        error: 'Available + assigned quantity cannot exceed total quantity'
      });
    }

    const createQuery = `
      INSERT INTO assets (asset_type_id, base_id, quantity, available_quantity, assigned_quantity)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;
    const result = await query(createQuery, [
      asset_type_id,
      targetBaseId,
      quantity,
      finalAvailableQuantity,
      finalAssignedQuantity
    ]);

    const newAsset = result.rows[0];

    // Log asset creation
    logger.info({
      action: 'ASSET_INVENTORY_CREATED',
      user_id: req.user!.user_id,
      asset_id: newAsset.id,
      asset_type_id,
      base_id: targetBaseId,
      quantity
    });

    return res.status(201).json({
      success: true,
      data: newAsset
    });
  } catch (error) {
    logger.error('Create asset error:', error);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
});

// @route   PUT /api/assets/:id
// @desc    Update asset inventory
// @access  Private (Admin, Base Commander)
router.put('/:id', authenticate, authorize('admin', 'base_commander'), async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { quantity, available_quantity, assigned_quantity, status } = req.body;

    // Get current asset
    const currentAsset = await query(
      'SELECT * FROM assets WHERE id = $1',
      [id]
    );

    if (currentAsset.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Asset not found'
      });
    }

    const asset = currentAsset.rows[0];

    // Check access permissions
    if (req.user!.role === 'base_commander' && asset.base_id !== req.user!.base_id) {
      return res.status(403).json({
        success: false,
        error: 'Access denied to this asset'
      });
    }

    // Validate quantities
    if (quantity !== undefined && quantity < 0) {
      return res.status(400).json({
        success: false,
        error: 'Quantity must be non-negative'
      });
    }

    const finalQuantity = quantity !== undefined ? quantity : asset.quantity;
    const finalAvailableQuantity = available_quantity !== undefined ? available_quantity : asset.available_quantity;
    const finalAssignedQuantity = assigned_quantity !== undefined ? assigned_quantity : asset.assigned_quantity;

    if (finalAvailableQuantity + finalAssignedQuantity > finalQuantity) {
      return res.status(400).json({
        success: false,
        error: 'Available + assigned quantity cannot exceed total quantity'
      });
    }

    // Update asset
    const updateQuery = `
      UPDATE assets 
      SET quantity = $1, available_quantity = $2, assigned_quantity = $3, status = $4, updated_at = CURRENT_TIMESTAMP
      WHERE id = $5
      RETURNING *
    `;
    const result = await query(updateQuery, [
      finalQuantity,
      finalAvailableQuantity,
      finalAssignedQuantity,
      status || asset.status,
      id
    ]);

    const updatedAsset = result.rows[0];

    // Log asset update
    logger.info({
      action: 'ASSET_INVENTORY_UPDATED',
      user_id: req.user!.user_id,
      asset_id: id,
      old_quantity: asset.quantity,
      new_quantity: finalQuantity
    });

    return res.json({
      success: true,
      data: updatedAsset
    });
  } catch (error) {
    logger.error('Update asset error:', error);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
});

// @route   DELETE /api/assets/:id
// @desc    Delete asset inventory
// @access  Private (Admin only)
router.delete('/:id', authenticate, authorize('admin'), async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Check if asset exists
    const assetCheck = await query(
      'SELECT * FROM assets WHERE id = $1',
      [id]
    );

    if (assetCheck.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Asset not found'
      });
    }

    const asset = assetCheck.rows[0];

    // Check if asset has assignments
    const assignmentCheck = await query(
      'SELECT COUNT(*) as count FROM assignments WHERE asset_type_id = $1 AND base_id = $2 AND status = $3',
      [asset.asset_type_id, asset.base_id, 'active']
    );

    if (parseInt(assignmentCheck.rows[0].count) > 0) {
      return res.status(400).json({
        success: false,
        error: 'Cannot delete asset with active assignments'
      });
    }

    // Delete asset
    await query('DELETE FROM assets WHERE id = $1', [id]);

    // Log asset deletion
    logger.info({
      action: 'ASSET_INVENTORY_DELETED',
      user_id: req.user!.user_id,
      asset_id: id,
      asset_type_id: asset.asset_type_id,
      base_id: asset.base_id
    });

    return res.json({
      success: true,
      message: 'Asset inventory deleted successfully'
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Server error' });
  }
});

export default router; 