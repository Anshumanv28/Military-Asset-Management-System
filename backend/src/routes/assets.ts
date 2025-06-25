import { Router, Request, Response } from 'express';
import { authenticate, authorize } from '../middleware/auth';
import { logger } from '../utils/logger';
import prisma from '../lib/prisma';

const router = Router();

// @route   GET /api/assets
// @desc    Get all assets with filters (quantity-based)
// @access  Private
router.get('/', authenticate, async (req: Request, res: Response) => {
  try {
    const { base_id, name, status, page = 1, limit = 10 } = req.query;
    
    // Build where conditions for Prisma
    const where: any = {};

    // Apply filters based on user role
    if (req.user!.role === 'base_commander' && req.user!.base_id) {
      where.base_id = req.user!.base_id;
    } else if (base_id && req.user!.role !== 'admin') {
      where.base_id = base_id as string;
    }

    if (name) {
      where.name = {
        contains: name as string,
        mode: 'insensitive'
      };
    }

    if (status) {
      where.status = status as string;
    }

    // Get total count
    const total = await prisma.assets.count({ where });

    // Get paginated results with base information
    const offset = (parseInt(page as string) - 1) * parseInt(limit as string);
    const assets = await prisma.assets.findMany({
      where,
      include: {
        bases: {
          select: {
            name: true,
            code: true
          }
        }
      },
      orderBy: [
        { name: 'asc' },
        { bases: { name: 'asc' } }
      ],
      take: parseInt(limit as string),
      skip: offset
    });

    // Transform data to match expected format
    const transformedAssets = assets.map(asset => ({
      ...asset,
      current_base_name: asset.bases.name,
      base_code: asset.bases.code
    }));

    res.json({
      success: true,
      data: transformedAssets,
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

    if (!id) {
      return res.status(400).json({
        success: false,
        error: 'Asset ID is required'
      });
    }

    const asset = await prisma.assets.findUnique({
      where: { id },
      include: {
        bases: {
          select: {
            name: true,
            code: true
          }
        }
      }
    });

    if (!asset) {
      return res.status(404).json({
        success: false,
        error: 'Asset not found'
      });
    }

    // Check access permissions
    if (req.user!.role === 'base_commander' && asset.base_id !== req.user!.base_id) {
      return res.status(403).json({
        success: false,
        error: 'Access denied to this asset'
      });
    }

    // Transform data to match expected format
    const transformedAsset = {
      ...asset,
      current_base_name: asset.bases.name,
      base_code: asset.bases.code
    };

    return res.json({
      success: true,
      data: transformedAsset
    });
  } catch (error) {
    logger.error('Get asset by ID error:', error);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
});

// @route   POST /api/assets
// @desc    Create new asset inventory entry
// @access  Private (Admin only)
router.post('/', authenticate, authorize('admin'), async (req: Request, res: Response) => {
  try {
    const { name, base_id, quantity, available_quantity, assigned_quantity } = req.body;

    // Validate required fields
    if (!name || !base_id || quantity === undefined) {
      return res.status(400).json({
        success: false,
        error: 'Asset name, base ID, and quantity are required'
      });
    }

    // Validate quantity
    if (quantity < 0) {
      return res.status(400).json({
        success: false,
        error: 'Quantity must be non-negative'
      });
    }

    // Check if base exists
    const base = await prisma.bases.findUnique({
      where: { id: base_id }
    });

    if (!base) {
      return res.status(400).json({
        success: false,
        error: 'Base not found'
      });
    }

    // Check if asset already exists for this name and base
    const existingAsset = await prisma.assets.findFirst({
      where: {
        name,
        base_id
      }
    });

    if (existingAsset) {
      return res.status(400).json({
        success: false,
        error: 'Asset inventory already exists for this name and base'
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

    const newAsset = await prisma.assets.create({
      data: {
        name,
        base_id,
        quantity,
        available_quantity: finalAvailableQuantity,
        assigned_quantity: finalAssignedQuantity
      }
    });

    // Log asset creation
    logger.info({
      action: 'ASSET_INVENTORY_CREATED',
      user_id: req.user!.user_id,
      asset_id: newAsset.id,
      asset_name: name,
      base_id: base_id,
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
// @access  Private (Admin only)
router.put('/:id', authenticate, authorize('admin'), async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { quantity, available_quantity, assigned_quantity, status } = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        error: 'Asset ID is required'
      });
    }

    // Get current asset
    const currentAsset = await prisma.assets.findUnique({
      where: { id }
    });

    if (!currentAsset) {
      return res.status(404).json({
        success: false,
        error: 'Asset not found'
      });
    }

    // Validate quantities
    if (quantity !== undefined && quantity < 0) {
      return res.status(400).json({
        success: false,
        error: 'Quantity must be non-negative'
      });
    }

    const finalQuantity = quantity !== undefined ? quantity : currentAsset.quantity;
    const finalAvailableQuantity = available_quantity !== undefined ? available_quantity : currentAsset.available_quantity;
    const finalAssignedQuantity = assigned_quantity !== undefined ? assigned_quantity : currentAsset.assigned_quantity;

    if (finalAvailableQuantity + finalAssignedQuantity > finalQuantity) {
      return res.status(400).json({
        success: false,
        error: 'Available + assigned quantity cannot exceed total quantity'
      });
    }

    // Update asset
    const updatedAsset = await prisma.assets.update({
      where: { id },
      data: {
        quantity: finalQuantity,
        available_quantity: finalAvailableQuantity,
        assigned_quantity: finalAssignedQuantity,
        status: status || currentAsset.status
      }
    });

    // Log asset update
    logger.info({
      action: 'ASSET_INVENTORY_UPDATED',
      user_id: req.user!.user_id,
      asset_id: id,
      old_quantity: currentAsset.quantity,
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

    if (!id) {
      return res.status(400).json({
        success: false,
        error: 'Asset ID is required'
      });
    }

    // Check if asset exists
    const asset = await prisma.assets.findUnique({
      where: { id }
    });

    if (!asset) {
      return res.status(404).json({
        success: false,
        error: 'Asset not found'
      });
    }

    // Check if asset has assignments (using asset_name instead of asset_type_id)
    const assignmentCount = await prisma.assignments.count({
      where: {
        asset_name: asset.name,
        base_id: asset.base_id,
        status: 'active'
      }
    });

    if (assignmentCount > 0) {
      return res.status(400).json({
        success: false,
        error: 'Cannot delete asset with active assignments'
      });
    }

    // Delete asset
    await prisma.assets.delete({
      where: { id }
    });

    // Log asset deletion
    logger.info({
      action: 'ASSET_INVENTORY_DELETED',
      user_id: req.user!.user_id,
      asset_id: id,
      asset_name: asset.name,
      base_id: asset.base_id
    });

    return res.json({
      success: true,
      message: 'Asset inventory deleted successfully'
    });
  } catch (error) {
    logger.error('Delete asset error:', error);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
});

export default router; 