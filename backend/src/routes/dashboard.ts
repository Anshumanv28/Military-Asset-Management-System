import { Router, Response } from 'express';
import prisma from '../lib/prisma';
import { authenticate } from '../middleware/auth';
import { logger } from '../utils/logger';
import { AuthenticatedRequest } from '../types';

const router = Router();

// @route   GET /api/dashboard/summary
// @desc    Get a full summary of dashboard metrics focused on asset quantities
// @access  Private
router.get('/summary', authenticate, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { base_id, start_date, end_date } = req.query as { [key: string]: string };
    const { role, base_id: user_base_id } = req.user!;

    // Determine target base based on user role
    let targetBaseId: string;
    if (role === 'admin') {
      // Admin can view any base or all bases
      targetBaseId = base_id || '';
    } else {
      // Base commander and logistics officer can only view their assigned base
      targetBaseId = user_base_id || '';
    }
    
    // Build where conditions for assets
    const assetWhereConditions: any = {};
    if (targetBaseId) {
      assetWhereConditions.base_id = targetBaseId;
    }
    
    // Build where conditions for purchases
    const purchaseWhereConditions: any = { status: 'approved' };
    if (targetBaseId) {
      purchaseWhereConditions.base_id = targetBaseId;
    }
    if (start_date && end_date) {
      purchaseWhereConditions.purchase_date = {
        gte: new Date(start_date),
        lte: new Date(end_date)
      };
    }
    
    // Build where conditions for expenditures
    const expenditureWhereConditions: any = {};
    if (targetBaseId) {
      expenditureWhereConditions.base_id = targetBaseId;
    }
    if (start_date && end_date) {
      expenditureWhereConditions.expenditure_date = {
        gte: new Date(start_date),
        lte: new Date(end_date)
      };
    }
    
    // Build where conditions for transfers
    const transferWhereConditions: any = { status: 'approved' };
    if (start_date && end_date) {
      transferWhereConditions.transfer_date = {
        gte: new Date(start_date),
        lte: new Date(end_date)
      };
    }

    // Get total asset quantities
    const totalQuantities = await prisma.assets.aggregate({
      where: assetWhereConditions,
      _sum: { quantity: true }
    });

    // Get available asset quantities
    const availableQuantities = await prisma.assets.aggregate({
      where: assetWhereConditions,
      _sum: { available_quantity: true }
    });

    // Get assigned asset quantities
    const assignedQuantities = await prisma.assets.aggregate({
      where: assetWhereConditions,
      _sum: { assigned_quantity: true }
    });

    // Get low stock asset quantities
    const lowStockQuantities = await prisma.assets.aggregate({
      where: { ...assetWhereConditions, status: 'low_stock' },
      _sum: { quantity: true }
    });

    // Get assets purchased in date range (quantities)
    const purchasedQuantities = await prisma.purchases.aggregate({
      where: purchaseWhereConditions,
      _sum: { quantity: true }
    });

    // Get assets expended in date range (quantities)
    const expendedQuantities = await prisma.expenditures.aggregate({
      where: expenditureWhereConditions,
      _sum: { quantity: true }
    });

    // Get transfers based on role and base
    let transfersIn = 0;
    let transfersOut = 0;

    if (targetBaseId) {
      // Get transfers in (to this base)
      const transfersInResult = await prisma.transfers.aggregate({
        where: { ...transferWhereConditions, to_base_id: targetBaseId },
        _sum: { quantity: true }
      });
      transfersIn = transfersInResult._sum.quantity || 0;

      // Get transfers out (from this base)
      const transfersOutResult = await prisma.transfers.aggregate({
        where: { ...transferWhereConditions, from_base_id: targetBaseId },
        _sum: { quantity: true }
      });
      transfersOut = transfersOutResult._sum.quantity || 0;
    } else if (role === 'admin') {
      // For admin viewing all bases, show combined transfers
      const adminTransfersResult = await prisma.transfers.aggregate({
        where: transferWhereConditions,
        _sum: { quantity: true }
      });
      const totalTransfers = adminTransfersResult._sum.quantity || 0;
      transfersIn = totalTransfers;
      transfersOut = totalTransfers;
    }

    const total_quantities = totalQuantities._sum.quantity || 0;
    const available_quantities = availableQuantities._sum.available_quantity || 0;
    const assigned_quantities = assignedQuantities._sum.assigned_quantity || 0;
    const low_stock_quantities = lowStockQuantities._sum.quantity || 0;
    const purchased_quantities = purchasedQuantities._sum.quantity || 0;
    const expended_quantities = expendedQuantities._sum.quantity || 0;

    // Calculate opening and closing balance for asset quantities
    const opening_balance = total_quantities - purchased_quantities - transfersIn + transfersOut + expended_quantities;
    const closing_balance = total_quantities;
    const net_movement = purchased_quantities + transfersIn - transfersOut - expended_quantities;

    res.json({
      success: true,
      data: {
        opening_balance,
        closing_balance,
        net_movement,
        total_assets: total_quantities,
        available_assets: available_quantities,
        assigned_assets: assigned_quantities,
        maintenance_assets: low_stock_quantities,
        purchased_assets: purchased_quantities,
        transfers_in: transfersIn,
        transfers_out: transfersOut,
        expended_assets: expended_quantities
      }
    });

  } catch (error) {
    logger.error('Dashboard summary error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

// @route   GET /api/dashboard/movements
// @desc    Get recent asset movements (purchases and transfers)
// @access  Private
router.get('/movements', authenticate, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { base_id, start_date, end_date } = req.query as { [key: string]: string };
    const { role, base_id: user_base_id } = req.user!;

    // Determine target base based on user role
    let targetBaseId: string;
    if (role === 'admin') {
      targetBaseId = base_id || '';
    } else {
      targetBaseId = user_base_id || '';
    }
    
    // Build where conditions for purchases
    const purchaseWhereConditions: any = { status: 'approved' };
    if (targetBaseId) {
      purchaseWhereConditions.base_id = targetBaseId;
    }
    if (start_date && end_date) {
      purchaseWhereConditions.purchase_date = {
        gte: new Date(start_date),
        lte: new Date(end_date)
      };
    }
    
    // Build where conditions for transfers
    const transferWhereConditions: any = { status: 'approved' };
    if (start_date && end_date) {
      transferWhereConditions.transfer_date = {
        gte: new Date(start_date),
        lte: new Date(end_date)
      };
    }

    // Get purchases breakdown
    const purchases = await prisma.purchases.findMany({
      where: purchaseWhereConditions,
      include: {
        assets: {
          select: { name: true }
        },
        bases: {
          select: { name: true }
        }
      },
      orderBy: { purchase_date: 'desc' },
      take: 10
    });

    // Get transfers breakdown
    let transfers: any[] = [];
    if (targetBaseId) {
      transfers = await prisma.transfers.findMany({
        where: {
          ...transferWhereConditions,
          OR: [
            { from_base_id: targetBaseId },
            { to_base_id: targetBaseId }
          ]
        },
        include: {
          bases_transfers_from_base_idTobases: {
            select: { name: true }
          },
          bases_transfers_to_base_idTobases: {
            select: { name: true }
          }
        },
        orderBy: { transfer_date: 'desc' },
        take: 10
      });
    }

    // Transform purchases data
    const purchasedAssets = purchases.map(purchase => ({
      id: purchase.id,
      name: purchase.assets.name,
      asset_name: purchase.assets.name,
      quantity: purchase.quantity,
      base_name: purchase.bases.name,
      date: purchase.purchase_date
    }));

    // Separate transfers into incoming and outgoing based on target base
    let transfersIn: any[] = [];
    let transfersOut: any[] = [];
    
    if (targetBaseId) {
      // Get the base name for the target base
      const targetBase = await prisma.bases.findUnique({
        where: { id: targetBaseId },
        select: { name: true }
      });
      
      if (targetBase) {
        transfersIn = transfers
          .filter(t => t.bases_transfers_to_base_idTobases.name === targetBase.name)
          .map(t => ({
            id: t.id,
            name: t.asset_name,
            asset_name: t.asset_name,
            quantity: t.quantity,
            from_base_name: t.bases_transfers_from_base_idTobases.name,
            to_base_name: t.bases_transfers_to_base_idTobases.name,
            date: t.transfer_date
          }));
        
        transfersOut = transfers
          .filter(t => t.bases_transfers_from_base_idTobases.name === targetBase.name)
          .map(t => ({
            id: t.id,
            name: t.asset_name,
            asset_name: t.asset_name,
            quantity: t.quantity,
            from_base_name: t.bases_transfers_from_base_idTobases.name,
            to_base_name: t.bases_transfers_to_base_idTobases.name,
            date: t.transfer_date
          }));
      }
    }

    res.json({
      success: true,
      data: {
        purchased_assets: purchasedAssets,
        transfers_in: transfersIn,
        transfers_out: transfersOut
      }
    });

  } catch (error) {
    logger.error('Dashboard movements error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

// @route   GET /api/dashboard/inventory
// @desc    Get current inventory status by asset name
// @access  Private
router.get('/inventory', authenticate, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { base_id } = req.query;
    const { role, base_id: user_base_id } = req.user!;
    
    // Determine target base based on user role
    let targetBaseId: string;
    if (role === 'admin') {
      targetBaseId = base_id as string || '';
    } else {
      targetBaseId = user_base_id || '';
    }
    
    // Build where conditions
    const whereConditions: any = {};
    if (targetBaseId) {
      whereConditions.base_id = targetBaseId;
    }

    const inventory = await prisma.assets.findMany({
      where: whereConditions,
      include: {
        bases: {
          select: { name: true }
        }
      },
      orderBy: [
        { name: 'asc' },
        { bases: { name: 'asc' } }
      ]
    });

    // Transform data to match expected format
    const inventoryData = inventory.map(asset => ({
      asset_name: asset.name,
      quantity: asset.quantity,
      available_quantity: asset.available_quantity,
      assigned_quantity: asset.assigned_quantity,
      status: asset.status,
      base_name: asset.bases.name
    }));

    res.json({
      success: true,
      data: inventoryData
    });

  } catch (error) {
    logger.error('Dashboard inventory error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

// @route   GET /api/dashboard/expended-assets
// @desc    Get expended assets data for chart visualization
// @access  Private
router.get('/expended-assets', authenticate, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { base_id, start_date, end_date } = req.query as { [key: string]: string };
    const { role, base_id: user_base_id } = req.user!;

    // Determine target base based on user role
    let targetBaseId: string;
    if (role === 'admin') {
      targetBaseId = base_id || '';
    } else {
      targetBaseId = user_base_id || '';
    }
    
    // Build where conditions
    const whereConditions: any = {};
    if (targetBaseId) {
      whereConditions.base_id = targetBaseId;
    }
    if (start_date && end_date) {
      whereConditions.expenditure_date = {
        gte: new Date(start_date),
        lte: new Date(end_date)
      };
    }

    // Get expended assets by asset name
    const expendedAssets = await prisma.expenditures.groupBy({
      by: ['asset_name'],
      where: whereConditions,
      _sum: {
        quantity: true
      },
      orderBy: {
        _sum: {
          quantity: 'desc'
        }
      },
      take: 10
    });

    // Format data for chart
    const chartData = expendedAssets.map(item => ({
      name: item.asset_name,
      value: item._sum.quantity || 0
    }));

    res.json({
      success: true,
      data: chartData
    });

  } catch (error) {
    logger.error('Dashboard expended assets error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

export default router; 