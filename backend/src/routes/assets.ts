import { Router, Request, Response } from 'express';
import { query } from '../database/connection';
import { authenticate, authorize } from '../middleware/auth';
import { logger } from '../utils/logger';

const router = Router();

// @route   GET /api/assets
// @desc    Get all assets with filters
// @access  Private
router.get('/', authenticate, async (req: Request, res: Response) => {
  try {
    const { base_id, asset_type_id, status, page = 1, limit = 10 } = req.query;
    
    let whereConditions = ['1=1'];
    const params: any[] = [];
    let paramIndex = 1;

    // Apply filters based on user role
    if (req.user!.role === 'base_commander' && req.user!.base_id) {
      whereConditions.push(`current_base_id = $${paramIndex++}`);
      params.push(req.user!.base_id);
    } else if (base_id && req.user!.role !== 'admin') {
      whereConditions.push(`current_base_id = $${paramIndex++}`);
      params.push(base_id);
    }

    if (asset_type_id) {
      whereConditions.push(`asset_type_id = $${paramIndex++}`);
      params.push(asset_type_id);
    }

    if (status) {
      whereConditions.push(`status = $${paramIndex++}`);
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
      SELECT a.*, at.name as asset_type_name, at.category, b.name as base_name
      FROM assets a
      JOIN asset_types at ON a.asset_type_id = at.id
      LEFT JOIN bases b ON a.current_base_id = b.id
      WHERE ${whereClause}
      ORDER BY a.created_at DESC
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
      SELECT a.*, at.name as asset_type_name, at.category, b.name as base_name
      FROM assets a
      JOIN asset_types at ON a.asset_type_id = at.id
      LEFT JOIN bases b ON a.current_base_id = b.id
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
    if (req.user!.role === 'base_commander' && asset.current_base_id !== req.user!.base_id) {
      return res.status(403).json({
        success: false,
        error: 'Access denied to this asset'
      });
    }

    if (!asset) {
      return res.status(404).json({ success: false, error: 'Asset not found' });
    }
    return res.json({
      success: true,
      data: asset
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Server error' });
  }
});

// @route   POST /api/assets
// @desc    Create new asset
// @access  Private (Admin, Base Commander)
router.post('/', authenticate, authorize('admin', 'base_commander'), async (req: Request, res: Response) => {
  try {
    const { asset_type_id, serial_number, name, description, current_base_id, purchase_date, purchase_cost } = req.body;

    // Validate required fields
    if (!asset_type_id || !name) {
      return res.status(400).json({
        success: false,
        error: 'Asset type ID and name are required'
      });
    }

    // Check if serial number already exists
    if (serial_number) {
      const existingAsset = await query(
        'SELECT id FROM assets WHERE serial_number = $1',
        [serial_number]
      );

      if (existingAsset.rows.length > 0) {
        return res.status(400).json({
          success: false,
          error: 'Serial number already exists'
        });
      }
    }

    // Base commanders can only create assets for their base
    const baseId = req.user!.role === 'base_commander' ? req.user!.base_id : current_base_id;

    const createQuery = `
      INSERT INTO assets (asset_type_id, serial_number, name, description, current_base_id, purchase_date, purchase_cost, current_value)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $7)
      RETURNING *
    `;
    const result = await query(createQuery, [
      asset_type_id,
      serial_number || null,
      name,
      description || null,
      baseId,
      purchase_date || null,
      purchase_cost || null
    ]);

    const newAsset = result.rows[0];

    // Log asset creation
    logger.info({
      action: 'ASSET_CREATED',
      user_id: req.user!.user_id,
      asset_id: newAsset.id,
      asset_name: newAsset.name
    });

    if (!newAsset) {
      return res.status(400).json({ success: false, error: 'Asset creation failed' });
    }
    return res.status(201).json({
      success: true,
      data: newAsset
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Server error' });
  }
});

// @route   PUT /api/assets/:id
// @desc    Update asset
// @access  Private (Admin, Base Commander)
router.put('/:id', authenticate, authorize('admin', 'base_commander'), async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description, current_base_id, status, current_value } = req.body;

    // Check if asset exists
    const existingAsset = await query(
      'SELECT * FROM assets WHERE id = $1',
      [id]
    );

    if (existingAsset.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Asset not found'
      });
    }

    const asset = existingAsset.rows[0];

    // Check access permissions
    if (req.user!.role === 'base_commander' && asset.current_base_id !== req.user!.base_id) {
      return res.status(403).json({
        success: false,
        error: 'Access denied to this asset'
      });
    }

    // Base commanders can only update assets in their base
    const baseId = req.user!.role === 'base_commander' ? req.user!.base_id : current_base_id;

    const updateQuery = `
      UPDATE assets 
      SET name = COALESCE($1, name),
          description = COALESCE($2, description),
          current_base_id = COALESCE($3, current_base_id),
          status = COALESCE($4, status),
          current_value = COALESCE($5, current_value),
          updated_at = CURRENT_TIMESTAMP
      WHERE id = $6
      RETURNING *
    `;
    const result = await query(updateQuery, [
      name,
      description,
      baseId,
      status,
      current_value,
      id
    ]);

    const updatedAsset = result.rows[0];

    // Log asset update
    logger.info({
      action: 'ASSET_UPDATED',
      user_id: req.user!.user_id,
      asset_id: id,
      changes: req.body
    });

    if (!updatedAsset) {
      return res.status(404).json({ success: false, error: 'Asset not found' });
    }
    return res.json({
      success: true,
      data: updatedAsset
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Server error' });
  }
});

// @route   DELETE /api/assets/:id
// @desc    Delete asset (soft delete by setting status to retired)
// @access  Private (Admin only)
router.delete('/:id', authenticate, authorize('admin'), async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Check if asset exists
    const existingAsset = await query(
      'SELECT * FROM assets WHERE id = $1',
      [id]
    );

    if (existingAsset.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Asset not found'
      });
    }

    // Soft delete by setting status to retired
    const deleteQuery = `
      UPDATE assets 
      SET status = 'retired', updated_at = CURRENT_TIMESTAMP
      WHERE id = $1
      RETURNING *
    `;
    const result = await query(deleteQuery, [id]);

    // Log asset retirement
    logger.info({
      action: 'ASSET_RETIRED',
      user_id: req.user!.user_id,
      asset_id: id
    });

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Asset not found' });
    }
    return res.json({
      success: true,
      message: 'Asset deleted'
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Server error' });
  }
});

export default router; 