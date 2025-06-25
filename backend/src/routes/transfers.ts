import { Router, Response } from 'express';
import prisma from '../lib/prisma';
import { authenticate, authorize } from '../middleware/auth';
import { logger } from '../utils/logger';
import { AuthenticatedRequest } from '../types';

const router = Router();

// @route   GET /api/transfers
// @desc    Get all transfers with filters
// @access  Private
router.get('/', authenticate, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { from_base_id, to_base_id, asset_name, start_date, end_date, page = 1, limit = 10 } = req.query;

    // Build where conditions
    const whereConditions: any = {};
    if (req.user!.role === 'base_commander' && req.user!.base_id) {
      whereConditions.OR = [
        { from_base_id: req.user!.base_id },
        { to_base_id: req.user!.base_id }
      ];
    } else if (req.user!.role === 'logistics_officer' && req.user!.base_id) {
      whereConditions.OR = [
        { from_base_id: req.user!.base_id },
        { to_base_id: req.user!.base_id }
      ];
    } else {
      if (from_base_id) whereConditions.from_base_id = from_base_id as string;
      if (to_base_id) whereConditions.to_base_id = to_base_id as string;
    }
    if (asset_name) {
      whereConditions.asset_name = { contains: asset_name as string, mode: 'insensitive' };
    }
    if (start_date && end_date) {
      whereConditions.transfer_date = {
        gte: new Date(start_date as string),
        lte: new Date(end_date as string)
      };
    }
    // Get total count
    const total = await prisma.transfers.count({ where: whereConditions });
    // Get paginated results
    const offset = (parseInt(page as string) - 1) * parseInt(limit as string);
    const transfers = await prisma.transfers.findMany({
      where: whereConditions,
      include: {
        bases_transfers_from_base_idTobases: { select: { name: true } },
        bases_transfers_to_base_idTobases: { select: { name: true } },
        users_transfers_created_byTousers: { select: { first_name: true, last_name: true } }
      },
      orderBy: { transfer_date: 'desc' },
      take: parseInt(limit as string),
      skip: offset
    });
    // Transform data to match expected format
    const transformedTransfers = transfers.map(t => ({
      ...t,
      from_base_name: t.bases_transfers_from_base_idTobases.name,
      to_base_name: t.bases_transfers_to_base_idTobases.name,
      first_name: t.users_transfers_created_byTousers.first_name,
      last_name: t.users_transfers_created_byTousers.last_name
    }));
    res.json({
      success: true,
      data: transformedTransfers,
      pagination: {
        page: parseInt(page as string),
        limit: parseInt(limit as string),
        total,
        totalPages: Math.ceil(total / parseInt(limit as string))
      }
    });
  } catch (error) {
    logger.error('Get transfers error:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// @route   POST /api/transfers
// @desc    Create new transfer request
// @access  Private (Admin, Base Commander)
router.post('/', authenticate, authorize('admin', 'base_commander'), async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { from_base_id, to_base_id, asset_name, quantity, transfer_date, notes } = req.body;
    logger.info('Received transfer data:', { from_base_id, to_base_id, asset_name, quantity, transfer_date, notes });
    if (!from_base_id || !to_base_id || !asset_name || quantity === undefined || quantity === null) {
      return res.status(400).json({ success: false, error: 'From base ID, to base ID, asset name, and quantity are required' });
    }
    const parsedQuantity = parseInt(quantity);
    if (isNaN(parsedQuantity) || parsedQuantity <= 0) {
      return res.status(400).json({ success: false, error: 'Quantity must be a valid positive integer' });
    }
    if (req.user!.role === 'base_commander') {
      if (from_base_id !== req.user!.base_id && to_base_id !== req.user!.base_id) {
        return res.status(403).json({ success: false, error: 'Base commanders can only create transfers involving their base' });
      }
    }
    // Check if bases exist
    const bases = await prisma.bases.findMany({ where: { id: { in: [from_base_id, to_base_id] } } });
    if (bases.length !== 2) {
      return res.status(400).json({ success: false, error: 'Invalid base IDs' });
    }
    // Check if source base has sufficient available quantity
    const sourceAsset = await prisma.assets.findFirst({ where: { name: asset_name, base_id: from_base_id } });
    if (!sourceAsset) {
      return res.status(400).json({ success: false, error: 'Source base does not have this asset in inventory' });
    }
    if (sourceAsset.available_quantity < parsedQuantity) {
      return res.status(400).json({ success: false, error: `Insufficient available quantity. Available: ${sourceAsset.available_quantity}, Requested: ${parsedQuantity}` });
    }
    const status = 'pending';
    const transferNumber = `TRF-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    const newTransfer = await prisma.transfers.create({
      data: {
        transfer_number: transferNumber,
        from_base_id,
        to_base_id,
        asset_name,
        quantity: parsedQuantity,
        transfer_date: transfer_date ? new Date(transfer_date) : new Date(),
        status,
        approved_by: null,
        approved_at: null,
        created_by: req.user!.user_id,
        notes: notes || null
      }
    });
    logger.info({ action: 'TRANSFER_REQUESTED', user_id: req.user!.user_id, user_role: req.user!.role, transfer_id: newTransfer.id, transfer_number: newTransfer.transfer_number, from_base_id, to_base_id, asset_name, quantity: parsedQuantity, status });
    return res.status(201).json({ success: true, data: newTransfer });
  } catch (error) {
    logger.error('Create transfer error:', error);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
});

// @route   PUT /api/transfers/:id/approve
// @desc    Approve transfer request
// @access  Private (Admin only)
router.put('/:id/approve', authenticate, authorize('admin'), async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ success: false, error: 'Transfer ID is required' });
    const transfer = await prisma.transfers.findUnique({ where: { id } });
    if (!transfer) return res.status(404).json({ success: false, error: 'Transfer not found' });
    if (transfer.status === 'approved') return res.status(400).json({ success: false, error: 'Transfer is already approved' });
    if (transfer.status === 'rejected') return res.status(400).json({ success: false, error: 'Cannot approve a rejected transfer' });
    // Check if source base still has sufficient available quantity
    const sourceAsset = await prisma.assets.findFirst({ where: { name: transfer.asset_name, base_id: transfer.from_base_id } });
    if (!sourceAsset) return res.status(400).json({ success: false, error: 'Source base no longer has this asset in inventory' });
    if (sourceAsset.available_quantity < transfer.quantity) return res.status(400).json({ success: false, error: `Insufficient available quantity. Available: ${sourceAsset.available_quantity}, Requested: ${transfer.quantity}` });
    // Approve transfer
    const approvedTransfer = await prisma.transfers.update({
      where: { id },
      data: { status: 'approved', approved_by: req.user!.user_id, approved_at: new Date() }
    });
    // Execute the transfer
    await executeTransfer(approvedTransfer);
    logger.info({ action: 'TRANSFER_APPROVED', user_id: req.user!.user_id, transfer_id: id, transfer_number: transfer.transfer_number, asset_name: transfer.asset_name, quantity: transfer.quantity });
    return res.json({ success: true, data: approvedTransfer });
  } catch (error) {
    logger.error('Approve transfer error:', error);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
});

// @route   PUT /api/transfers/:id/reject
// @desc    Reject transfer request
// @access  Private (Admin only)
router.put('/:id/reject', authenticate, authorize('admin'), async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { notes } = req.body;
    if (!id) return res.status(400).json({ success: false, error: 'Transfer ID is required' });
    const transfer = await prisma.transfers.findUnique({ where: { id } });
    if (!transfer) return res.status(404).json({ success: false, error: 'Transfer not found' });
    if (transfer.status === 'rejected') return res.status(400).json({ success: false, error: 'Transfer is already rejected' });
    if (transfer.status === 'approved') return res.status(400).json({ success: false, error: 'Cannot reject an approved transfer' });
    const rejectedTransfer = await prisma.transfers.update({ where: { id }, data: { status: 'rejected', notes: notes || transfer.notes } });
    logger.info({ action: 'TRANSFER_REJECTED', user_id: req.user!.user_id, transfer_id: id, transfer_number: transfer.transfer_number, notes });
    return res.json({ success: true, data: rejectedTransfer });
  } catch (error) {
    logger.error('Reject transfer error:', error);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
});

// @route   DELETE /api/transfers/:id
// @desc    Delete transfer
// @access  Private (Admin, Base Commander)
router.delete('/:id', authenticate, authorize('admin', 'base_commander'), async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ success: false, error: 'Transfer ID is required' });
    const transfer = await prisma.transfers.findUnique({ where: { id } });
    if (!transfer) return res.status(404).json({ success: false, error: 'Transfer not found' });
    if (req.user!.role === 'base_commander') {
      if (transfer.status === 'approved') {
        return res.status(400).json({ success: false, error: 'Cannot delete an approved transfer' });
      }
      if (transfer.from_base_id !== req.user!.base_id && transfer.to_base_id !== req.user!.base_id) {
        return res.status(403).json({ success: false, error: 'You can only delete transfers involving your base' });
      }
    }
    await prisma.transfers.delete({ where: { id } });
    logger.info({ action: 'TRANSFER_DELETED', user_id: req.user!.user_id, user_role: req.user!.role, transfer_id: id, transfer_number: transfer.transfer_number, transfer_status: transfer.status });
    return res.json({ success: true, message: 'Transfer deleted successfully' });
  } catch (error) {
    logger.error('Delete transfer error:', error);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
});

// Helper function to execute a transfer by updating asset quantities
async function executeTransfer(transfer: { id: string; from_base_id: string; to_base_id: string; asset_name: string; quantity: number; transfer_number: string; }) {
  try {
    await prisma.$transaction(async (tx) => {
      // Update source base inventory (reduce quantities)
      const sourceAsset = await tx.assets.findFirst({ where: { name: transfer.asset_name, base_id: transfer.from_base_id } });
      if (!sourceAsset) throw new Error('Source asset not found');
      const newSourceQuantity = sourceAsset.quantity - transfer.quantity;
      const newSourceAvailableQuantity = sourceAsset.available_quantity - transfer.quantity;
      if (newSourceAvailableQuantity < 0) throw new Error('Insufficient available quantity for transfer');
      await tx.assets.update({ where: { id: sourceAsset.id }, data: { quantity: newSourceQuantity, available_quantity: newSourceAvailableQuantity } });
      // Update destination base inventory (add quantities)
      const destAsset = await tx.assets.findFirst({ where: { name: transfer.asset_name, base_id: transfer.to_base_id } });
      if (destAsset) {
        const newDestQuantity = destAsset.quantity + transfer.quantity;
        const newDestAvailableQuantity = destAsset.available_quantity + transfer.quantity;
        await tx.assets.update({ where: { id: destAsset.id }, data: { quantity: newDestQuantity, available_quantity: newDestAvailableQuantity } });
      } else {
        await tx.assets.create({ data: { name: transfer.asset_name, base_id: transfer.to_base_id, quantity: transfer.quantity, available_quantity: transfer.quantity, assigned_quantity: 0 } });
      }
    });
    logger.info({ action: 'TRANSFER_EXECUTED', transfer_id: transfer.id, transfer_number: transfer.transfer_number, from_base_id: transfer.from_base_id, to_base_id: transfer.to_base_id, asset_name: transfer.asset_name, quantity: transfer.quantity });
  } catch (error) {
    logger.error('Error executing transfer:', error);
    throw error;
  }
}

export default router; 