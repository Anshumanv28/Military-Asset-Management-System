import { Router, Response } from 'express';
import prisma from '../lib/prisma';
import { authenticate, authorize } from '../middleware/auth';
import { logger } from '../utils/logger';
import { AuthenticatedRequest } from '../types';

const router = Router();

// @route   GET /api/expenditures
// @desc    Get all expenditures with filters
// @access  Private
router.get('/', authenticate, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { base_id, asset_name, start_date, end_date, page = 1, limit = 10 } = req.query;
    
    // Build where conditions
    const whereConditions: any = {};

    // Apply filters based on user role
    if (req.user!.role === 'base_commander' && req.user!.base_id) {
      whereConditions.base_id = req.user!.base_id;
    } else if (req.user!.role === 'logistics_officer' && req.user!.base_id) {
      whereConditions.base_id = req.user!.base_id;
    } else if (base_id) {
      whereConditions.base_id = base_id as string;
    }

    if (asset_name) {
      whereConditions.asset_name = {
        contains: asset_name as string,
        mode: 'insensitive'
      };
    }

    if (start_date && end_date) {
      whereConditions.expenditure_date = {
        gte: new Date(start_date as string),
        lte: new Date(end_date as string)
      };
    }

    // Get total count
    const total = await prisma.expenditures.count({
      where: whereConditions
    });

    // Get paginated results
    const offset = (parseInt(page as string) - 1) * parseInt(limit as string);
    const expenditures = await prisma.expenditures.findMany({
      where: whereConditions,
      include: {
        bases: {
          select: {
            name: true
          }
        },
        users_expenditures_created_byTousers: {
          select: {
            first_name: true,
            last_name: true
          }
        },
        personnel: {
          select: {
            first_name: true,
            last_name: true,
            rank: true
          }
        }
      },
      orderBy: {
        expenditure_date: 'desc'
      },
      take: parseInt(limit as string),
      skip: offset
    });

    // Transform data to match expected format
    const transformedExpenditures = expenditures.map(expenditure => ({
      ...expenditure,
      base_name: expenditure.bases.name,
      first_name: expenditure.users_expenditures_created_byTousers.first_name,
      last_name: expenditure.users_expenditures_created_byTousers.last_name,
      personnel_first_name: expenditure.personnel?.first_name || null,
      personnel_last_name: expenditure.personnel?.last_name || null,
      personnel_rank: expenditure.personnel?.rank || null
    }));

    res.json({
      success: true,
      data: transformedExpenditures,
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
router.post('/', authenticate, authorize('admin', 'base_commander', 'logistics_officer'), async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { asset_name, base_id, quantity, expenditure_date, reason, notes } = req.body;

    // Validate required fields
    if (!asset_name || !base_id || !quantity || !expenditure_date || !reason) {
      return res.status(400).json({
        success: false,
        error: 'Asset name, base ID, quantity, expenditure date, and reason are required'
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
    const asset = await prisma.assets.findFirst({
      where: {
        name: asset_name,
        base_id: base_id
      }
    });

    if (!asset) {
      return res.status(400).json({
        success: false,
        error: 'Base does not have this asset in inventory'
      });
    }

    if (asset.available_quantity < quantity) {
      return res.status(400).json({
        success: false,
        error: `Insufficient available quantity for expenditure. Available: ${asset.available_quantity}, Requested: ${quantity}`
      });
    }

    // Use Prisma transaction
    const result = await prisma.$transaction(async (tx) => {
      // Create expenditure record
      const newExpenditure = await tx.expenditures.create({
        data: {
        asset_name,
        base_id,
        quantity,
          expenditure_date: new Date(expenditure_date),
        reason,
          notes: notes || null,
          created_by: req.user!.user_id
        }
      });

      // Update asset quantities - reduce from inventory
      const newQuantity = asset.quantity - quantity;
      const newAvailableQuantity = asset.available_quantity - quantity;

      // Update asset status based on remaining quantity
      let newStatus = 'available';
      if (newQuantity === 0) {
        newStatus = 'out_of_stock';
      } else if (newAvailableQuantity === 0) {
        newStatus = 'low_stock';
      }

      await tx.assets.update({
        where: {
          id: asset.id
        },
        data: {
          quantity: newQuantity,
          available_quantity: newAvailableQuantity,
          status: newStatus
        }
      });

      return newExpenditure;
    });

      // Log expenditure creation
      logger.info({
        action: 'EXPENDITURE_CREATED',
        user_id: req.user!.user_id,
      expenditure_id: result.id,
        asset_name,
        base_id,
        quantity,
        reason,
      remaining_quantity: asset.quantity - quantity
      });

    return res.status(201).json({ success: true, data: result });
  } catch (error) {
    logger.error('Create expenditure error:', error);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
});

// @route   PUT /api/expenditures/:id
// @desc    Update expenditure
// @access  Private (Admin, Base Commander)
router.put('/:id', authenticate, authorize('admin', 'base_commander'), async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { quantity, expenditure_date, reason, notes } = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        error: 'Expenditure ID is required'
      });
    }

    // Check if expenditure exists
    const expenditure = await prisma.expenditures.findUnique({
      where: { id }
    });

    if (!expenditure) {
      return res.status(404).json({
        success: false,
        error: 'Expenditure not found'
      });
    }

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
      const asset = await prisma.assets.findFirst({
        where: {
          name: expenditure.asset_name,
          base_id: expenditure.base_id
        }
      });

      if (!asset) {
        return res.status(400).json({
          success: false,
          error: 'Asset inventory not found'
        });
      }

      const newQuantity = asset.quantity + quantityDifference;
      const newAvailableQuantity = asset.available_quantity + quantityDifference;

      if (newQuantity < 0 || newAvailableQuantity < 0) {
        return res.status(400).json({
          success: false,
          error: 'Cannot reduce expenditure quantity below zero'
        });
      }

      // Update asset quantities
      await prisma.assets.update({
        where: {
          id: asset.id
        },
        data: {
          quantity: newQuantity,
          available_quantity: newAvailableQuantity
        }
      });
    }

    // Update expenditure
    const updateData: any = {};
    if (quantity !== undefined) updateData.quantity = quantity;
    if (expenditure_date) updateData.expenditure_date = new Date(expenditure_date);
    if (reason) updateData.reason = reason;
    if (notes !== undefined) updateData.notes = notes;

    const updatedExpenditure = await prisma.expenditures.update({
      where: { id },
      data: updateData
    });

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
router.delete('/:id', authenticate, authorize('admin'), async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        error: 'Expenditure ID is required'
      });
    }

    // Check if expenditure exists
    const expenditure = await prisma.expenditures.findUnique({
      where: { id }
    });

    if (!expenditure) {
      return res.status(404).json({
        success: false,
        error: 'Expenditure not found'
      });
    }

    // Use Prisma transaction
    await prisma.$transaction(async (tx) => {
      // Restore asset quantities
      const asset = await tx.assets.findFirst({
        where: {
          name: expenditure.asset_name,
          base_id: expenditure.base_id
        }
      });

      if (asset) {
        const newQuantity = asset.quantity + expenditure.quantity;
        const newAvailableQuantity = asset.available_quantity + expenditure.quantity;

        // Update asset status
        let newStatus = 'available';
        if (newQuantity === 0) {
          newStatus = 'out_of_stock';
        } else if (newAvailableQuantity === 0) {
          newStatus = 'low_stock';
        }

        await tx.assets.update({
          where: {
            id: asset.id
          },
          data: {
            quantity: newQuantity,
            available_quantity: newAvailableQuantity,
            status: newStatus
          }
        });
      }

      // Delete expenditure
      await tx.expenditures.delete({
        where: { id }
      });
    });

      // Log expenditure deletion
      logger.info({
        action: 'EXPENDITURE_DELETED',
        user_id: req.user!.user_id,
        expenditure_id: id,
        asset_name: expenditure.asset_name,
        quantity: expenditure.quantity
      });

      return res.json({
        success: true,
        message: 'Expenditure deleted successfully'
      });
  } catch (error) {
    logger.error('Delete expenditure error:', error);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
});

export default router; 