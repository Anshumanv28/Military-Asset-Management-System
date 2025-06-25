import { Router, Response } from 'express';
import prisma from '../lib/prisma';
import { authenticate, authorize } from '../middleware/auth';
import { logger } from '../utils/logger';
import { AuthenticatedRequest } from '../types';

const router = Router();

// @route   GET /api/purchases
// @desc    Get all purchases with filters
// @access  Private
router.get('/', authenticate, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { base_id, asset_name, start_date, end_date, page = 1, limit = 10 } = req.query;
    
    // Build where conditions
    const whereConditions: any = {};

    // Apply filters based on user role
    if (req.user!.role === 'base_commander' && req.user!.base_id) {
      whereConditions.base_id = req.user!.base_id;
    } else if (base_id && req.user!.role !== 'admin') {
      whereConditions.base_id = base_id as string;
    }

    if (asset_name) {
      whereConditions.assets = {
        name: {
          contains: asset_name as string,
          mode: 'insensitive'
        }
      };
    }

    if (start_date && end_date) {
      whereConditions.purchase_date = {
        gte: new Date(start_date as string),
        lte: new Date(end_date as string)
      };
    }

    // Get total count
    const total = await prisma.purchases.count({
      where: whereConditions
    });

    // Get paginated results
    const offset = (parseInt(page as string) - 1) * parseInt(limit as string);
    const purchases = await prisma.purchases.findMany({
      where: whereConditions,
      include: {
        bases: {
          select: {
            name: true
          }
        },
        users_purchases_created_byTousers: {
          select: {
            first_name: true,
            last_name: true
          }
        },
        assets: {
          select: {
            name: true
          }
        }
      },
      orderBy: {
        purchase_date: 'desc'
      },
      take: parseInt(limit as string),
      skip: offset
    });

    // Transform data to match expected format
    const transformedPurchases = purchases.map(purchase => ({
      ...purchase,
      base_name: purchase.bases.name,
      first_name: purchase.users_purchases_created_byTousers.first_name,
      last_name: purchase.users_purchases_created_byTousers.last_name,
      asset_name: purchase.assets.name
    }));

    res.json({
      success: true,
      data: transformedPurchases,
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
router.post('/', authenticate, authorize('admin', 'base_commander'), async (req: AuthenticatedRequest, res: Response) => {
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

    const newPurchase = await prisma.purchases.create({
      data: {
        asset_id,
        base_id,
        quantity,
        supplier: supplier || null,
        purchase_date: new Date(purchase_date),
        status,
        approved_by: null,
        approved_at: null,
        notes: notes || null,
        created_by: req.user!.user_id
      }
    });

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
router.put('/:id/approve', authenticate, authorize('admin'), async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        error: 'Purchase ID is required'
      });
    }

    // Check if purchase exists
    const purchase = await prisma.purchases.findUnique({
      where: { id }
    });

    if (!purchase) {
      return res.status(404).json({
        success: false,
        error: 'Purchase not found'
      });
    }

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
    const approvedPurchase = await prisma.purchases.update({
      where: { id },
      data: {
        status: 'approved',
        approved_by: req.user!.user_id,
        approved_at: new Date()
      }
    });

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
router.put('/:id/cancel', authenticate, authorize('admin', 'base_commander'), async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        error: 'Purchase ID is required'
      });
    }

    // Check if purchase exists
    const purchase = await prisma.purchases.findUnique({
      where: { id }
    });

    if (!purchase) {
      return res.status(404).json({
        success: false,
        error: 'Purchase not found'
      });
    }

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
    const cancelledPurchase = await prisma.purchases.update({
      where: { id },
      data: {
        status: 'cancelled'
      }
    });

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
router.delete('/:id', authenticate, authorize('admin'), async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        error: 'Purchase ID is required'
      });
    }

    // Check if purchase exists
    const purchase = await prisma.purchases.findUnique({
      where: { id }
    });

    if (!purchase) {
      return res.status(404).json({
        success: false,
        error: 'Purchase not found'
      });
    }

    // Check if purchase is approved
    if (purchase.status === 'approved') {
      return res.status(400).json({
        success: false,
        error: 'Cannot delete an approved purchase'
      });
    }

    // Delete purchase
    await prisma.purchases.delete({
      where: { id }
    });

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
router.put('/:id', authenticate, authorize('admin', 'base_commander'), async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { asset_id, base_id, quantity, supplier, purchase_date, notes } = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        error: 'Purchase ID is required'
      });
    }

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
    const existingPurchase = await prisma.purchases.findUnique({
      where: { id }
    });

    if (!existingPurchase) {
      return res.status(404).json({
        success: false,
        error: 'Purchase not found'
      });
    }

    // Check access permissions
    if (req.user!.role === 'base_commander') {
      if (existingPurchase.base_id !== req.user!.base_id) {
        return res.status(403).json({
          success: false,
          error: 'Base commanders can only edit purchases for their base'
        });
      }
      if (existingPurchase.status === 'approved') {
        return res.status(403).json({
          success: false,
          error: 'Cannot edit approved purchases'
        });
      }
    }

    // Update purchase
    const updatedPurchase = await prisma.purchases.update({
      where: { id },
      data: {
        asset_id,
        base_id,
        quantity,
        supplier: supplier || null,
        purchase_date: new Date(purchase_date),
        notes: notes || null
      }
    });

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
async function addAssetsToInventory(purchase: { id: string; asset_id: string; base_id: string; quantity: number }) {
  try {
    // First, get the asset name from the assets table using the asset_id
    const asset = await prisma.assets.findUnique({
      where: { id: purchase.asset_id }
    });

    if (!asset) {
      throw new Error(`Asset with id ${purchase.asset_id} not found`);
    }

    const assetName = asset.name;

    // Check if asset inventory already exists for this type and base
    const existingAsset = await prisma.assets.findFirst({
      where: {
        name: assetName,
        base_id: purchase.base_id
      }
    });

    if (existingAsset) {
      // Update existing inventory
      const newQuantity = existingAsset.quantity + purchase.quantity;
      const newAvailableQuantity = existingAsset.available_quantity + purchase.quantity;

      await prisma.assets.update({
        where: { id: existingAsset.id },
        data: {
          quantity: newQuantity,
          available_quantity: newAvailableQuantity
        }
      });

      logger.info({
        action: 'ASSET_INVENTORY_UPDATED_FROM_PURCHASE',
        purchase_id: purchase.id,
        asset_id: existingAsset.id,
        added_quantity: purchase.quantity,
        new_total_quantity: newQuantity
      });
    } else {
      // Create new inventory entry
      const newAsset = await prisma.assets.create({
        data: {
          name: assetName,
          base_id: purchase.base_id,
          quantity: purchase.quantity,
          available_quantity: purchase.quantity,
          assigned_quantity: 0
        }
      });

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