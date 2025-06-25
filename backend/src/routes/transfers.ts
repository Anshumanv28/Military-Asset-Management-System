import { Router, Request, Response } from 'express';
import { query } from '../database/connection';
import { authenticate, authorize } from '../middleware/auth';
import { logger } from '../utils/logger';
import sql from '../database/db';

const router = Router();

// @route   GET /api/transfers
// @desc    Get all transfers with filters
// @access  Private
router.get('/', authenticate, async (req: Request, res: Response) => {
  try {
    const { from_base_id, to_base_id, asset_name, start_date, end_date, page = 1, limit = 10 } = req.query;
    
    let whereConditions = ['1=1'];
    const params: any[] = [];
    let paramIndex = 1;

    // Apply filters based on user role
    if (req.user!.role === 'base_commander' && req.user!.base_id) {
      whereConditions.push(`(t.from_base_id = $${paramIndex} OR t.to_base_id = $${paramIndex})`);
      params.push(req.user!.base_id);
      paramIndex++;
    } else if (req.user!.role === 'logistics_officer' && req.user!.base_id) {
      whereConditions.push(`(t.from_base_id = $${paramIndex} OR t.to_base_id = $${paramIndex})`);
      params.push(req.user!.base_id);
      paramIndex++;
    } else {
      // Apply base filters for all users when provided
      if (from_base_id) {
        whereConditions.push(`t.from_base_id = $${paramIndex++}`);
        params.push(from_base_id);
      }
      if (to_base_id) {
        whereConditions.push(`t.to_base_id = $${paramIndex++}`);
        params.push(to_base_id);
      }
    }

    if (asset_name) {
      whereConditions.push(`t.asset_name ILIKE $${paramIndex++}`);
      params.push(`%${asset_name}%`);
    }

    if (start_date && end_date) {
      whereConditions.push(`t.transfer_date BETWEEN $${paramIndex++} AND $${paramIndex++}`);
      params.push(start_date, end_date);
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
             u.first_name, u.last_name
      FROM transfers t
      JOIN bases fb ON t.from_base_id = fb.id
      JOIN bases tb ON t.to_base_id = tb.id
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
    const { from_base_id, to_base_id, asset_name, quantity, transfer_date, notes } = req.body;

    // Log received data for debugging
    logger.info('Received transfer data:', { from_base_id, to_base_id, asset_name, quantity, transfer_date, notes });

    // Validate required fields
    if (!from_base_id || !to_base_id || !asset_name || quantity === undefined || quantity === null) {
      return res.status(400).json({
        success: false,
        error: 'From base ID, to base ID, asset name, and quantity are required'
      });
    }

    // Parse and validate quantity
    const parsedQuantity = parseInt(quantity);
    if (isNaN(parsedQuantity) || parsedQuantity <= 0) {
      return res.status(400).json({
        success: false,
        error: 'Quantity must be a valid positive integer'
      });
    }

    logger.info('Quantity type:', typeof parsedQuantity, 'Value:', parsedQuantity);

    // Check access permissions based on user role
    if (req.user!.role === 'base_commander') {
      // Base commanders can only create transfers involving their base
      if (from_base_id !== req.user!.base_id && to_base_id !== req.user!.base_id) {
        return res.status(403).json({
          success: false,
          error: 'Base commanders can only create transfers involving their base'
        });
      }
    }
    // Admin can create transfers between any bases

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

    // Check if source base has sufficient available quantity
    const sourceAssetResult = await query(
      'SELECT quantity, available_quantity FROM assets WHERE name = $1 AND base_id = $2',
      [asset_name, from_base_id]
    );

    if (sourceAssetResult.rows.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Source base does not have this asset in inventory'
      });
    }

    const sourceAsset = sourceAssetResult.rows[0];
    logger.info('Asset data from database:', { quantity: sourceAsset.quantity, available_quantity: sourceAsset.available_quantity });
    
    if (sourceAsset.available_quantity < parsedQuantity) {
      return res.status(400).json({
        success: false,
        error: `Insufficient available quantity. Available: ${sourceAsset.available_quantity}, Requested: ${parsedQuantity}`
      });
    }

    // All transfers start as pending - only admins can approve them
    const status = 'pending';
    const approved_by = null;
    const approved_at = null;

    // Generate transfer number
    const transferNumber = `TRF-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    const createQuery = `
      INSERT INTO transfers (transfer_number, from_base_id, to_base_id, asset_name, quantity, transfer_date, status, approved_by, approved_at, created_by, notes)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      RETURNING *
    `;
    const result = await query(createQuery, [
      transferNumber,
      from_base_id,
      to_base_id,
      asset_name,
      parsedQuantity,
      transfer_date || new Date().toISOString().split('T')[0],
      status,
      approved_by,
      approved_at,
      req.user!.user_id,
      notes || null
    ]);

    const newTransfer = result.rows[0];

    // Log transfer request
    logger.info({
      action: 'TRANSFER_REQUESTED',
      user_id: req.user!.user_id,
      user_role: req.user!.role,
      transfer_id: newTransfer.id,
      transfer_number: newTransfer.transfer_number,
      from_base_id,
      to_base_id,
      asset_name,
      quantity: parsedQuantity,
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

    // Check if rejected
    if (transfer.status === 'rejected') {
      return res.status(400).json({
        success: false,
        error: 'Cannot approve a rejected transfer'
      });
    }

    // Check if source base still has sufficient available quantity
    const sourceAssetResult = await query(
      'SELECT quantity, available_quantity FROM assets WHERE name = $1 AND base_id = $2',
      [transfer.asset_name, transfer.from_base_id]
    );

    if (sourceAssetResult.rows.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Source base no longer has this asset in inventory'
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
      asset_name: transfer.asset_name,
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

// @route   PUT /api/transfers/:id/reject
// @desc    Reject transfer request
// @access  Private (Admin only)
router.put('/:id/reject', authenticate, authorize('admin'), async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { notes } = req.body;

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

    // Check if already rejected
    if (transfer.status === 'rejected') {
      return res.status(400).json({
        success: false,
        error: 'Transfer is already rejected'
      });
    }

    // Check if already approved
    if (transfer.status === 'approved') {
      return res.status(400).json({
        success: false,
        error: 'Cannot reject an approved transfer'
      });
    }

    // Reject transfer
    const rejectQuery = `
      UPDATE transfers 
      SET status = 'rejected', notes = COALESCE($1, notes)
      WHERE id = $2
      RETURNING *
    `;
    const result = await query(rejectQuery, [notes, id]);

    const rejectedTransfer = result.rows[0];

    // Log transfer rejection
    logger.info({
      action: 'TRANSFER_REJECTED',
      user_id: req.user!.user_id,
      transfer_id: id,
      transfer_number: transfer.transfer_number,
      notes
    });

    return res.json({
      success: true,
      data: rejectedTransfer
    });
  } catch (error) {
    logger.error('Reject transfer error:', error);
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

    // Check access permissions based on user role
    if (req.user!.role === 'base_commander') {
      // Base commanders cannot delete approved transfers
      if (transfer.status === 'approved') {
        return res.status(400).json({
          success: false,
          error: 'Cannot delete an approved transfer'
        });
      }

      // Base commanders can only delete transfers involving their base
      if (transfer.from_base_id !== req.user!.base_id && transfer.to_base_id !== req.user!.base_id) {
        return res.status(403).json({
          success: false,
          error: 'You can only delete transfers involving your base'
        });
      }
    }
    // Admin can delete any transfer regardless of status

    // Delete transfer
    await query('DELETE FROM transfers WHERE id = $1', [id]);

    // Log transfer deletion
    logger.info({
      action: 'TRANSFER_DELETED',
      user_id: req.user!.user_id,
      user_role: req.user!.role,
      transfer_id: id,
      transfer_number: transfer.transfer_number,
      transfer_status: transfer.status
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
    // Start transaction using sql.begin()
    await sql.begin(async (sql) => {
      // Update source base inventory (reduce quantities)
      const sourceAssetResult = await sql.unsafe(
        'SELECT * FROM assets WHERE name = $1 AND base_id = $2',
        [transfer.asset_name, transfer.from_base_id]
      );

      if (sourceAssetResult.length === 0) {
        throw new Error('Source asset not found');
      }

      const sourceAsset = sourceAssetResult[0];
      if (!sourceAsset) {
        throw new Error('Source asset not found');
      }
      const newSourceQuantity = sourceAsset['quantity'] - transfer.quantity;
      const newSourceAvailableQuantity = sourceAsset['available_quantity'] - transfer.quantity;

      if (newSourceAvailableQuantity < 0) {
        throw new Error('Insufficient available quantity for transfer');
      }

      await sql.unsafe(`
        UPDATE assets 
        SET quantity = $1, available_quantity = $2
        WHERE id = $3
      `, [newSourceQuantity, newSourceAvailableQuantity, sourceAsset['id']]);

      // Update destination base inventory (add quantities)
      const destAssetResult = await sql.unsafe(
        'SELECT * FROM assets WHERE name = $1 AND base_id = $2',
        [transfer.asset_name, transfer.to_base_id]
      );

      if (destAssetResult.length > 0) {
        // Update existing inventory
        const destAsset = destAssetResult[0];
        if (!destAsset) {
          throw new Error('Destination asset not found');
        }
        const newDestQuantity = destAsset['quantity'] + transfer.quantity;
        const newDestAvailableQuantity = destAsset['available_quantity'] + transfer.quantity;

        await sql.unsafe(`
          UPDATE assets 
          SET quantity = $1, available_quantity = $2
          WHERE id = $3
        `, [newDestQuantity, newDestAvailableQuantity, destAsset['id']]);
      } else {
        // Create new inventory entry
        await sql.unsafe(`
          INSERT INTO assets (name, base_id, quantity, available_quantity, assigned_quantity)
          VALUES ($1, $2, $3, $4, $5)
        `, [transfer.asset_name, transfer.to_base_id, transfer.quantity, transfer.quantity, 0]);
      }
    });

    logger.info({
      action: 'TRANSFER_EXECUTED',
      transfer_id: transfer.id,
      transfer_number: transfer.transfer_number,
      from_base_id: transfer.from_base_id,
      to_base_id: transfer.to_base_id,
      asset_name: transfer.asset_name,
      quantity: transfer.quantity
    });
  } catch (error) {
    logger.error('Error executing transfer:', error);
    throw error;
  }
}

export default router; 