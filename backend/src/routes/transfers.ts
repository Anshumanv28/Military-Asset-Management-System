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
    const { from_base_id, to_base_id, status, page = 1, limit = 10 } = req.query;
    
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
             u.first_name, u.last_name
      FROM transfers t
      JOIN bases fb ON t.from_base_id = fb.id
      JOIN bases tb ON t.to_base_id = tb.id
      JOIN users u ON t.requested_by = u.id
      WHERE ${whereClause}
      ORDER BY t.request_date DESC
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
// @desc    Create new transfer request
// @access  Private (Admin, Base Commander)
router.post('/', authenticate, authorize('admin', 'base_commander'), async (req: Request, res: Response) => {
  try {
    const { from_base_id, to_base_id, asset_ids, request_date, notes } = req.body;

    // Validate required fields
    if (!from_base_id || !to_base_id || !asset_ids || !Array.isArray(asset_ids) || asset_ids.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'From base ID, to base ID, and asset IDs are required'
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

    // Check if assets exist and are available at the source base
    const assetsResult = await query(
      'SELECT id, name, status FROM assets WHERE id = ANY($1) AND base_id = $2',
      [asset_ids, from_base_id]
    );

    if (assetsResult.rows.length !== asset_ids.length) {
      return res.status(400).json({
        success: false,
        error: 'Some assets not found or not at the specified source base'
      });
    }

    // Check if all assets are available
    const unavailableAssets = assetsResult.rows.filter((asset: any) => asset.status !== 'available');
    if (unavailableAssets.length > 0) {
      return res.status(400).json({
        success: false,
        error: `Assets not available for transfer: ${unavailableAssets.map((a: any) => a.name).join(', ')}`
      });
    }

    const createQuery = `
      INSERT INTO transfers (from_base_id, to_base_id, asset_ids, requested_by, request_date, notes)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `;
    const result = await query(createQuery, [
      from_base_id,
      to_base_id,
      asset_ids,
      req.user!.user_id,
      request_date || new Date().toISOString().split('T')[0],
      notes || null
    ]);

    const newTransfer = result.rows[0];

    // Log transfer request
    logger.info({
      action: 'TRANSFER_REQUESTED',
      user_id: req.user!.user_id,
      transfer_id: newTransfer.id,
      from_base_id,
      to_base_id,
      asset_count: asset_ids.length
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
    const { approval_date, notes } = req.body;

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

    // Check if transfer is pending
    if (transfer.status !== 'pending') {
      return res.status(400).json({
        success: false,
        error: 'Transfer is not pending approval'
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

    // Update transfer status
    const updateQuery = `
      UPDATE transfers 
      SET status = 'approved', approval_date = $1, approved_by = $2, notes = COALESCE($3, notes), updated_at = CURRENT_TIMESTAMP
      WHERE id = $4
      RETURNING *
    `;
    const result = await query(updateQuery, [
      approval_date || new Date().toISOString().split('T')[0],
      req.user!.user_id,
      notes,
      id
    ]);

    // Update asset base assignments
    await query(
      'UPDATE assets SET base_id = $1, updated_at = CURRENT_TIMESTAMP WHERE id = ANY($2)',
      [transfer.to_base_id, transfer.asset_ids]
    );

    // Log transfer approval
    logger.info({
      action: 'TRANSFER_APPROVED',
      user_id: req.user!.user_id,
      transfer_id: id,
      from_base_id: transfer.from_base_id,
      to_base_id: transfer.to_base_id
    });

    return res.json({
      success: true,
      data: result.rows[0]
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
    const { rejection_reason } = req.body;

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

    // Check if transfer is pending
    if (transfer.status !== 'pending') {
      return res.status(400).json({
        success: false,
        error: 'Transfer is not pending approval'
      });
    }

    // Check access permissions
    if (req.user!.role === 'base_commander') {
      if (transfer.from_base_id !== req.user!.base_id && transfer.to_base_id !== req.user!.base_id) {
        return res.status(403).json({
          success: false,
          error: 'Base commanders can only reject transfers involving their base'
        });
      }
    }

    const updateQuery = `
      UPDATE transfers 
      SET status = 'rejected', rejection_reason = $1, rejected_by = $2, updated_at = CURRENT_TIMESTAMP
      WHERE id = $3
      RETURNING *
    `;
    const result = await query(updateQuery, [
      rejection_reason,
      req.user!.user_id,
      id
    ]);

    // Log transfer rejection
    logger.info({
      action: 'TRANSFER_REJECTED',
      user_id: req.user!.user_id,
      transfer_id: id,
      reason: rejection_reason
    });

    return res.json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    logger.error('Reject transfer error:', error);
    return res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

export default router; 