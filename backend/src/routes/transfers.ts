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
             at.name as asset_type_name,
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
// @desc    Create new transfer request (pending approval)
// @access  Private (Admin, Base Commander, Logistics Officer)
router.post('/', authenticate, authorize('admin', 'base_commander', 'logistics_officer'), async (req: Request, res: Response) => {
  try {
    const { from_base_id, to_base_id, asset_type_id, quantity, transfer_date, notes } = req.body;

    // Validate required fields
    if (!from_base_id || !to_base_id || !asset_type_id || !quantity) {
      return res.status(400).json({
        success: false,
        error: 'From base ID, to base ID, asset type ID, and quantity are required'
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

    // Set status based on user role
    let status = 'pending';
    let approved_by = null;
    let approved_at = null;

    // Admin and Base Commander can auto-approve their own transfers
    if (req.user!.role === 'admin' || req.user!.role === 'base_commander') {
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
    return res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

// @route   PUT /api/transfers/:id/approve
// @desc    Approve transfer request
// @access  Private (Admin, Base Commander)
router.put('/:id/approve', authenticate, authorize('admin', 'base_commander'), async (req: Request, res: Response) => {
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

    // Check if transfer is already approved or completed
    if (transfer.status !== 'pending') {
      return res.status(400).json({
        success: false,
        error: 'Transfer is not in pending status'
      });
    }

    // Check access permissions
    if (req.user!.role === 'base_commander') {
      if (transfer.to_base_id !== req.user!.base_id) {
        return res.status(403).json({
          success: false,
          error: 'Base commanders can only approve transfers to their base'
        });
      }
    }

    // Update transfer status
    const updateQuery = `
      UPDATE transfers 
      SET status = 'approved', approved_by = $1, approved_at = CURRENT_TIMESTAMP
      WHERE id = $2
      RETURNING *
    `;
    const result = await query(updateQuery, [req.user!.user_id, id]);

    const updatedTransfer = result.rows[0];

    // Log transfer approval
    logger.info({
      action: 'TRANSFER_APPROVED',
      user_id: req.user!.user_id,
      transfer_id: id,
      transfer_number: transfer.transfer_number
    });

    return res.json({
      success: true,
      data: updatedTransfer
    });
  } catch (error) {
    logger.error('Approve transfer error:', error);
    return res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

// @route   PUT /api/transfers/:id/reject
// @desc    Reject transfer request
// @access  Private (Admin, Base Commander)
router.put('/:id/reject', authenticate, authorize('admin', 'base_commander'), async (req: Request, res: Response) => {
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

    // Check if transfer is already processed
    if (transfer.status !== 'pending') {
      return res.status(400).json({
        success: false,
        error: 'Transfer is not in pending status'
      });
    }

    // Check access permissions
    if (req.user!.role === 'base_commander') {
      if (transfer.to_base_id !== req.user!.base_id) {
        return res.status(403).json({
          success: false,
          error: 'Base commanders can only reject transfers to their base'
        });
      }
    }

    // Update transfer status
    const updateQuery = `
      UPDATE transfers 
      SET status = 'cancelled', notes = COALESCE($1, notes)
      WHERE id = $2
      RETURNING *
    `;
    const result = await query(updateQuery, [notes, id]);

    const updatedTransfer = result.rows[0];

    // Log transfer rejection
    logger.info({
      action: 'TRANSFER_REJECTED',
      user_id: req.user!.user_id,
      transfer_id: id,
      transfer_number: transfer.transfer_number
    });

    return res.json({
      success: true,
      data: updatedTransfer
    });
  } catch (error) {
    logger.error('Reject transfer error:', error);
    return res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

// @route   PUT /api/transfers/:id/complete
// @desc    Complete transfer
// @access  Private (Admin, Base Commander)
router.put('/:id/complete', authenticate, authorize('admin', 'base_commander'), async (req: Request, res: Response) => {
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
    if (transfer.status !== 'approved') {
      return res.status(400).json({
        success: false,
        error: 'Transfer must be approved before completion'
      });
    }

    // Check access permissions
    if (req.user!.role === 'base_commander') {
      if (transfer.from_base_id !== req.user!.base_id) {
        return res.status(403).json({
          success: false,
          error: 'Base commanders can only complete transfers from their base'
        });
      }
    }

    // Update transfer status
    const updateQuery = `
      UPDATE transfers 
      SET status = 'completed'
      WHERE id = $1
      RETURNING *
    `;
    const result = await query(updateQuery, [id]);

    const updatedTransfer = result.rows[0];

    // Log transfer completion
    logger.info({
      action: 'TRANSFER_COMPLETED',
      user_id: req.user!.user_id,
      transfer_id: id,
      transfer_number: transfer.transfer_number
    });

    return res.json({
      success: true,
      data: updatedTransfer
    });
  } catch (error) {
    logger.error('Complete transfer error:', error);
    return res.status(500).json({
      success: false,
      error: 'Server error'
    });
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

    // Check if transfer can be deleted (only pending transfers)
    if (transfer.status !== 'pending') {
      return res.status(400).json({
        success: false,
        error: 'Only pending transfers can be deleted'
      });
    }

    // Check access permissions
    if (req.user!.role === 'base_commander') {
      if (transfer.from_base_id !== req.user!.base_id && transfer.to_base_id !== req.user!.base_id) {
        return res.status(403).json({
          success: false,
          error: 'Base commanders can only delete transfers involving their base'
        });
      }
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
    return res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

export default router; 