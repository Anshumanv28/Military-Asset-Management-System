import { Router, Request, Response } from 'express';
import { query } from '../database/connection';
import { authenticate, authorize } from '../middleware/auth';
import { logger } from '../utils/logger';

const router = Router();

// @route   GET /api/asset-types
// @desc    Get all asset types
// @access  Private
router.get('/', authenticate, async (_req: Request, res: Response) => {
  try {
    const assetTypesQuery = `
      SELECT id, name, category, description, unit_of_measure, is_active, created_at, updated_at
      FROM asset_types
      WHERE is_active = true
      ORDER BY name
    `;
    const result = await query(assetTypesQuery);

    return res.json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    logger.error('Get asset types error:', error);
    return res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

// @route   GET /api/asset-types/:id
// @desc    Get asset type by ID
// @access  Private
router.get('/:id', authenticate, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const assetTypeQuery = `
      SELECT id, name, category, description, unit_of_measure, is_active, created_at, updated_at
      FROM asset_types
      WHERE id = $1 AND is_active = true
    `;
    const result = await query(assetTypeQuery, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Asset type not found'
      });
    }

    return res.json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    logger.error('Get asset type error:', error);
    return res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

// @route   POST /api/asset-types
// @desc    Create new asset type
// @access  Private (Admin only)
router.post('/', authenticate, authorize('admin'), async (req: Request, res: Response) => {
  try {
    const { name, category, description, unit_of_measure } = req.body;

    // Validate required fields
    if (!name || !category || !unit_of_measure) {
      return res.status(400).json({
        success: false,
        error: 'Name, category, and unit of measure are required'
      });
    }

    // Check if name already exists
    const existingAssetType = await query(
      'SELECT id FROM asset_types WHERE name = $1',
      [name]
    );

    if (existingAssetType.rows.length > 0) {
      return res.status(400).json({
        success: false,
        error: 'Asset type name already exists'
      });
    }

    const createQuery = `
      INSERT INTO asset_types (name, category, description, unit_of_measure)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;
    const result = await query(createQuery, [
      name,
      category,
      description || null,
      unit_of_measure
    ]);

    const newAssetType = result.rows[0];

    // Log asset type creation
    logger.info({
      action: 'ASSET_TYPE_CREATED',
      user_id: req.user!.user_id,
      asset_type_id: newAssetType.id,
      asset_type_name: newAssetType.name
    });

    return res.status(201).json({
      success: true,
      data: newAssetType
    });
  } catch (error) {
    logger.error('Create asset type error:', error);
    return res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

// @route   PUT /api/asset-types/:id
// @desc    Update asset type
// @access  Private (Admin only)
router.put('/:id', authenticate, authorize('admin'), async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, category, description, unit_of_measure, is_active } = req.body;

    // Check if asset type exists
    const existingAssetType = await query(
      'SELECT * FROM asset_types WHERE id = $1',
      [id]
    );

    if (existingAssetType.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Asset type not found'
      });
    }

    // Check if new name conflicts with existing asset type
    if (name && name !== existingAssetType.rows[0].name) {
      const nameConflict = await query(
        'SELECT id FROM asset_types WHERE name = $1 AND id != $2',
        [name, id]
      );

      if (nameConflict.rows.length > 0) {
        return res.status(400).json({
          success: false,
          error: 'Asset type name already exists'
        });
      }
    }

    const updateQuery = `
      UPDATE asset_types 
      SET name = COALESCE($1, name),
          category = COALESCE($2, category),
          description = COALESCE($3, description),
          unit_of_measure = COALESCE($4, unit_of_measure),
          is_active = COALESCE($5, is_active),
          updated_at = CURRENT_TIMESTAMP
      WHERE id = $6
      RETURNING *
    `;
    const result = await query(updateQuery, [
      name,
      category,
      description,
      unit_of_measure,
      is_active,
      id
    ]);

    const updatedAssetType = result.rows[0];

    // Log asset type update
    logger.info({
      action: 'ASSET_TYPE_UPDATED',
      user_id: req.user!.user_id,
      asset_type_id: id,
      changes: req.body
    });

    return res.json({
      success: true,
      data: updatedAssetType
    });
  } catch (error) {
    logger.error('Update asset type error:', error);
    return res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

// @route   DELETE /api/asset-types/:id
// @desc    Delete asset type (soft delete)
// @access  Private (Admin only)
router.delete('/:id', authenticate, authorize('admin'), async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Check if asset type exists
    const existingAssetType = await query(
      'SELECT * FROM asset_types WHERE id = $1',
      [id]
    );

    if (existingAssetType.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Asset type not found'
      });
    }

    // Check if asset type is being used
    const usageCheck = await query(
      'SELECT COUNT(*) as count FROM assets WHERE asset_type_id = $1',
      [id]
    );

    if (parseInt(usageCheck.rows[0].count) > 0) {
      return res.status(400).json({
        success: false,
        error: 'Cannot delete asset type that is being used by assets'
      });
    }

    // Soft delete by setting is_active to false
    const deleteQuery = `
      UPDATE asset_types 
      SET is_active = false, updated_at = CURRENT_TIMESTAMP
      WHERE id = $1
    `;
    await query(deleteQuery, [id]);

    // Log asset type deletion
    logger.info({
      action: 'ASSET_TYPE_DELETED',
      user_id: req.user!.user_id,
      asset_type_id: id,
      asset_type_name: existingAssetType.rows[0].name
    });

    return res.json({
      success: true,
      message: 'Asset type deleted successfully'
    });
  } catch (error) {
    logger.error('Delete asset type error:', error);
    return res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

export default router; 