import { Router, Request, Response } from 'express';
import { query } from '../database/connection';
import { authenticate, authorize } from '../middleware/auth';
import { logger } from '../utils/logger';

const router = Router();

// @route   GET /api/transfers
// @desc    Get all transfers with filters
// @access  Private
router.get('/', authenticate, async (req: Request, res: Response) => {
  try {
    const { from_base_id, to_base_id, asset_type_id, status, page = 1, limit = 10 } = req.query;
    
    let whereConditions = ['1=1'];
    const params: any[] = [];
    let paramIndex = 1;

    // Apply filters based on user role
    if (req.user!.role === 'base_commander' && req.user!.base_id) {
      whereConditions.push(`(t.from_base_id = $${paramIndex} OR t.to_base_id = $${paramIndex})`);
      params.push(req.user!.base_id);
      paramIndex++;
    } else {
      if (from_base_id) {
        whereConditions.push(`t.from_base_id = $${paramIndex++}`);
        params.push(from_base_id);
      }
      if (to_base_id) {
        whereConditions.push(`t.to_base_id = $${paramIndex++}`);
        params.push(to_base_id);
      }
    }

    if (asset_type_id) {
      whereConditions.push(`t.asset_type_id = $${paramIndex++}`);
      params.push(asset_type_id);
    }

    if (status) {
      whereConditions.push(`t.status = $${paramIndex++}`);
      params.push(status);
    }

    const whereClause = whereConditions.join(' AND ');

    // Get total count
    const countQuery = `
      SELECT COUNT(*) as total
      FROM transfers t
      WHERE ${whereClause}
    `;
    const countResult = await query(countQuery, params);
    const total = parseInt(countResult.rows[0].total);

    // Get paginated results
    const offset = (parseInt(page as string) - 1) * parseInt(limit as string);
    const transfersQuery = `
      SELECT t.*, 
             fb.name as from_base_name, tb.name as to_base_name,
             at.name as asset_type_name, at.unit_of_measure,
             u.first_name, u.last_name
      FROM transfers t
      JOIN bases fb ON t.from_base_id = fb.id
      JOIN bases tb ON t.to_base_id = tb.id
      JOIN asset_types at ON t.asset_type_id = at.id
      JOIN users u ON t.created_by::uuid = u.id
      WHERE ${whereClause}
      ORDER BY t.transfer_date DESC
      LIMIT $${paramIndex++} OFFSET $${paramIndex++}
    `;
    const transfersResult = await query(transfersQuery, [...params, parseInt(limit as string), offset]);

    res.json({
      success: true,
      data: transfersResult.rows,
      pagination: {
        page: parseInt(page as string),
        limit: parseInt(limit as string),
        total,
        totalPages: Math.ceil(total / parseInt(limit as string))
      }
    });
  } catch (error) {
    logger.error('Get transfers error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

// @route   POST /api/transfers
// @desc    Create new transfer request (Update operation - moves assets between bases)
// @access  Private (Admin, Base Commander)
router.post('/', authenticate, authorize('admin', 'base_commander'), async (req: Request, res: Response) => {
  try {
    const { from_base_id, to_base_id, asset_type_id, quantity, transfer_date, notes } = req.body;

    // Validate required fields
    if (!from_base_id || !to_base_id || !asset_type_id || !quantity) {
      return res.status(400).json({
        success: false,
        error: 'From base ID, to base ID, asset type ID, and quantity are required'
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
    if (req.user!.role === 'base_commander') {
      if (from_base_id !== req.user!.base_id && to_base_id !== req.user!.base_id) {
        return res.status(403).json({
          success: false,
          error: 'Base commanders can only create transfers involving their base'
        });
      }
    } else if (req.user!.role === 'logistics_officer') {
      if (from_base_id !== req.user!.base_id && to_base_id !== req.user!.base_id) {
        return res.status(403).json({
          success: false,
          error: 'Logistics officers can only create transfers involving their base'
        });
      }
    }

    // Check if bases exist
    const basesResult = await query(
      'SELECT id FROM bases WHERE id IN ($1, $2)',
      [from_base_id, to_base_id]
    );

    if (basesResult.rows.length !== 2) {
      return res.status(400).json({
        success: false,
        error: 'Invalid base IDs'
      });
    }

    // Check if asset type exists
    const assetTypeResult = await query(
      'SELECT id FROM asset_types WHERE id = $1',
      [asset_type_id]
    );

    if (assetTypeResult.rows.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Invalid asset type ID'
      });
    }

    // Check if source base has sufficient available quantity
    const sourceAssetResult = await query(
      'SELECT quantity, available_quantity FROM assets WHERE asset_type_id = $1 AND base_id = $2',
      [asset_type_id, from_base_id]
    );

    if (sourceAssetResult.rows.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Source base does not have this asset type in inventory'
      });
    }

    const sourceAsset = sourceAssetResult.rows[0];
    if (sourceAsset.available_quantity < quantity) {
      return res.status(400).json({
        success: false,
        error: `Insufficient available quantity. Available: ${sourceAsset.available_quantity}, Requested: ${quantity}`
      });
    }

    // Set status based on user role
    let status = 'pending';
    let approved_by = null;
    let approved_at = null;

    // Only Admin can auto-approve transfers
    if (req.user!.role === 'admin') {
      status = 'approved';
      approved_by = req.user!.user_id;
      approved_at = new Date();
    }

    // Generate transfer number
    const transferNumber = `TRF-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    const createQuery = `
      INSERT INTO transfers (transfer_number, from_base_id, to_base_id, asset_type_id, quantity, transfer_date, status, approved_by, approved_at, created_by, notes)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      RETURNING *
    `;
    const result = await query(createQuery, [
      transferNumber,
      from_base_id,
      to_base_id,
      asset_type_id,
      quantity,
      transfer_date || new Date().toISOString().split('T')[0],
      status,
      approved_by,
      approved_at,
      req.user!.user_id,
      notes || null
    ]);

    const newTransfer = result.rows[0];

    // If transfer is approved, execute the transfer immediately
    if (status === 'approved') {
      await executeTransfer(newTransfer);
    }

    // Log transfer request
    logger.info({
      action: 'TRANSFER_REQUESTED',
      user_id: req.user!.user_id,
      transfer_id: newTransfer.id,
      transfer_number: newTransfer.transfer_number,
      from_base_id,
      to_base_id,
      asset_type_id,
      quantity,
      status
    });

    return res.status(201).json({
      success: true,
      data: newTransfer
    });
  } catch (error) {
    logger.error('Create transfer error:', error);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
});

// @route   PUT /api/transfers/:id/approve
// @desc    Approve transfer request
// @access  Private (Admin only)
router.put('/:id/approve', authenticate, authorize('admin'), async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Check if transfer exists
    const transferResult = await query(
      'SELECT * FROM transfers WHERE id = $1',
      [id]
    );

    if (transferResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Transfer not found'
      });
    }

    const transfer = transferResult.rows[0];

    // Check if already approved
    if (transfer.status === 'approved') {
      return res.status(400).json({
        success: false,
        error: 'Transfer is already approved'
      });
    }

    // Check if cancelled
    if (transfer.status === 'cancelled') {
      return res.status(400).json({
        success: false,
        error: 'Cannot approve a cancelled transfer'
      });
    }

    // Check access permissions
    if (req.user!.role === 'base_commander') {
      if (transfer.from_base_id !== req.user!.base_id && transfer.to_base_id !== req.user!.base_id) {
        return res.status(403).json({
          success: false,
          error: 'Base commanders can only approve transfers involving their base'
        });
      }
    }

    // Check if source base still has sufficient available quantity
    const sourceAssetResult = await query(
      'SELECT quantity, available_quantity FROM assets WHERE asset_type_id = $1 AND base_id = $2',
      [transfer.asset_type_id, transfer.from_base_id]
    );

    if (sourceAssetResult.rows.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Source base no longer has this asset type in inventory'
      });
    }

    const sourceAsset = sourceAssetResult.rows[0];
    if (sourceAsset.available_quantity < transfer.quantity) {
      return res.status(400).json({
        success: false,
        error: `Insufficient available quantity. Available: ${sourceAsset.available_quantity}, Requested: ${transfer.quantity}`
      });
    }

    // Approve transfer
    const approveQuery = `
      UPDATE transfers 
      SET status = 'approved', approved_by = $1, approved_at = CURRENT_TIMESTAMP
      WHERE id = $2
      RETURNING *
    `;
    const result = await query(approveQuery, [req.user!.user_id, id]);

    const approvedTransfer = result.rows[0];

    // Execute the transfer
    await executeTransfer(approvedTransfer);

    // Log transfer approval
    logger.info({
      action: 'TRANSFER_APPROVED',
      user_id: req.user!.user_id,
      transfer_id: id,
      transfer_number: transfer.transfer_number,
      asset_type_id: transfer.asset_type_id,
      quantity: transfer.quantity
    });

    return res.json({
      success: true,
      data: approvedTransfer
    });
  } catch (error) {
    logger.error('Approve transfer error:', error);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
});

// @route   PUT /api/transfers/:id/cancel
// @desc    Cancel transfer request
// @access  Private (Admin only)
router.put('/:id/cancel', authenticate, authorize('admin'), async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Check if transfer exists
    const transferResult = await query(
      'SELECT * FROM transfers WHERE id = $1',
      [id]
    );

    if (transferResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Transfer not found'
      });
    }

    const transfer = transferResult.rows[0];

    // Check if already cancelled
    if (transfer.status === 'cancelled') {
      return res.status(400).json({
        success: false,
        error: 'Transfer is already cancelled'
      });
    }

    // Check if already approved
    if (transfer.status === 'approved') {
      return res.status(400).json({
        success: false,
        error: 'Cannot cancel an approved transfer'
      });
    }

    // Cancel transfer
    const cancelQuery = `
      UPDATE transfers 
      SET status = 'cancelled'
      WHERE id = $1
      RETURNING *
    `;
    const result = await query(cancelQuery, [id]);

    const cancelledTransfer = result.rows[0];

    // Log transfer cancellation
    logger.info({
      action: 'TRANSFER_CANCELLED',
      user_id: req.user!.user_id,
      transfer_id: id,
      transfer_number: transfer.transfer_number
    });

    return res.json({
      success: true,
      data: cancelledTransfer
    });
  } catch (error) {
    logger.error('Cancel transfer error:', error);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
});

// @route   DELETE /api/transfers/:id
// @desc    Delete transfer
// @access  Private (Admin, Base Commander)
router.delete('/:id', authenticate, authorize('admin', 'base_commander'), async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Check if transfer exists
    const transferResult = await query(
      'SELECT * FROM transfers WHERE id = $1',
      [id]
    );

    if (transferResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Transfer not found'
      });
    }

    const transfer = transferResult.rows[0];

    // Check if transfer is approved
    if (transfer.status === 'approved') {
      return res.status(400).json({
        success: false,
        error: 'Cannot delete an approved transfer'
      });
    }

    // Delete transfer
    await query('DELETE FROM transfers WHERE id = $1', [id]);

    // Log transfer deletion
    logger.info({
      action: 'TRANSFER_DELETED',
      user_id: req.user!.user_id,
      transfer_id: id,
      transfer_number: transfer.transfer_number
    });

    return res.json({
      success: true,
      message: 'Transfer deleted successfully'
    });
  } catch (error) {
    logger.error('Delete transfer error:', error);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
});

// Helper function to execute a transfer by updating asset quantities
async function executeTransfer(transfer: any) {
  try {
    // Start transaction
    await query('BEGIN');

    // Update source base inventory (reduce quantities)
    const sourceAssetResult = await query(
      'SELECT * FROM assets WHERE asset_type_id = $1 AND base_id = $2',
      [transfer.asset_type_id, transfer.from_base_id]
    );

    if (sourceAssetResult.rows.length === 0) {
      throw new Error('Source asset not found');
    }

    const sourceAsset = sourceAssetResult.rows[0];
    const newSourceQuantity = sourceAsset.quantity - transfer.quantity;
    const newSourceAvailableQuantity = sourceAsset.available_quantity - transfer.quantity;

    if (newSourceAvailableQuantity < 0) {
      throw new Error('Insufficient available quantity for transfer');
    }

    await query(`
      UPDATE assets 
      SET quantity = $1, available_quantity = $2, updated_at = CURRENT_TIMESTAMP
      WHERE id = $3
    `, [newSourceQuantity, newSourceAvailableQuantity, sourceAsset.id]);

    // Update destination base inventory (add quantities)
    const destAssetResult = await query(
      'SELECT * FROM assets WHERE asset_type_id = $1 AND base_id = $2',
      [transfer.asset_type_id, transfer.to_base_id]
    );

    if (destAssetResult.rows.length > 0) {
      // Update existing inventory
      const destAsset = destAssetResult.rows[0];
      const newDestQuantity = destAsset.quantity + transfer.quantity;
      const newDestAvailableQuantity = destAsset.available_quantity + transfer.quantity;

      await query(`
        UPDATE assets 
        SET quantity = $1, available_quantity = $2, updated_at = CURRENT_TIMESTAMP
        WHERE id = $3
      `, [newDestQuantity, newDestAvailableQuantity, destAsset.id]);
    } else {
      // Create new inventory entry
      await query(`
        INSERT INTO assets (asset_type_id, base_id, quantity, available_quantity, assigned_quantity)
        VALUES ($1, $2, $3, $4, $5)
      `, [transfer.asset_type_id, transfer.to_base_id, transfer.quantity, transfer.quantity, 0]);
    }

    // Commit transaction
    await query('COMMIT');

    logger.info({
      action: 'TRANSFER_EXECUTED',
      transfer_id: transfer.id,
      transfer_number: transfer.transfer_number,
      from_base_id: transfer.from_base_id,
      to_base_id: transfer.to_base_id,
      asset_type_id: transfer.asset_type_id,
      quantity: transfer.quantity
    });
  } catch (error) {
    // Rollback transaction
    await query('ROLLBACK');
    logger.error('Error executing transfer:', error);
    throw error;
  }
}

export default router; 