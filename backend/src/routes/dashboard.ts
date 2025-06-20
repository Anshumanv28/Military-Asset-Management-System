import { Router, Request, Response } from 'express';
import { query } from '../database/connection';
import { authenticate } from '../middleware/auth';
import { logger } from '../utils/logger';

const router = Router();

// @route   GET /api/dashboard/metrics
// @desc    Get dashboard metrics
// @access  Private
router.get('/metrics', authenticate, async (req: Request, res: Response) => {
  try {
    const { start_date, end_date, base_id } = req.query;
    
    // Build date filter
    const dateFilter = start_date && end_date 
      ? `AND DATE(created_at) BETWEEN $1 AND $2` 
      : '';
    
    const dateParams = start_date && end_date ? [start_date, end_date] : [];
    const paramOffset = dateParams.length;

    // Build base filter
    let baseFilter = '';
    if (base_id && req.user!.role !== 'admin') {
      baseFilter = `AND base_id = $${paramOffset + 1}`;
    }

    // Get purchases
    const purchasesQuery = `
      SELECT COALESCE(SUM(quantity), 0) as total
      FROM purchases 
      WHERE 1=1 ${dateFilter} ${baseFilter}
    `;
    const purchasesResult = await query(purchasesQuery, [...dateParams, ...(base_id ? [base_id] : [])]);

    // Get transfers in
    const transfersInQuery = `
      SELECT COALESCE(SUM(quantity), 0) as total
      FROM transfers 
      WHERE status = 'completed' ${dateFilter} 
      AND to_base_id = $${paramOffset + 1} ${baseFilter}
    `;
    const transfersInResult = await query(transfersInQuery, [...dateParams, base_id || req.user!.base_id, ...(base_id ? [base_id] : [])]);

    // Get transfers out
    const transfersOutQuery = `
      SELECT COALESCE(SUM(quantity), 0) as total
      FROM transfers 
      WHERE status = 'completed' ${dateFilter} 
      AND from_base_id = $${paramOffset + 1} ${baseFilter}
    `;
    const transfersOutResult = await query(transfersOutQuery, [...dateParams, base_id || req.user!.base_id, ...(base_id ? [base_id] : [])]);

    // Get assigned assets
    const assignedQuery = `
      SELECT COALESCE(COUNT(*), 0) as total
      FROM assignments 
      WHERE status = 'active' ${dateFilter} ${baseFilter}
    `;
    const assignedResult = await query(assignedQuery, [...dateParams, ...(base_id ? [base_id] : [])]);

    // Get expended assets
    const expendedQuery = `
      SELECT COALESCE(SUM(quantity), 0) as total
      FROM expenditures 
      WHERE 1=1 ${dateFilter} ${baseFilter}
    `;
    const expendedResult = await query(expendedQuery, [...dateParams, ...(base_id ? [base_id] : [])]);

    // Calculate metrics
    const purchases = parseInt(purchasesResult.rows[0].total) || 0;
    const transfersIn = parseInt(transfersInResult.rows[0].total) || 0;
    const transfersOut = parseInt(transfersOutResult.rows[0].total) || 0;
    const assigned = parseInt(assignedResult.rows[0].total) || 0;
    const expended = parseInt(expendedResult.rows[0].total) || 0;

    res.json({
      success: true,
      data: {
        totalPurchases: purchases,
        totalTransfers: transfersIn + transfersOut,
        totalAssignments: assigned,
        totalExpenditures: expended
      }
    });
  } catch (error) {
    logger.error('Dashboard metrics error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

// @route   GET /api/dashboard/movements
// @desc    Get movement breakdown
// @access  Private
router.get('/movements', authenticate, async (req: Request, res: Response) => {
  try {
    const { start_date, end_date, base_id, asset_type_id } = req.query;
    
    // Build filters
    const dateFilter = start_date && end_date 
      ? `AND DATE(created_at) BETWEEN $1 AND $2` 
      : '';
    
    const dateParams = start_date && end_date ? [start_date, end_date] : [];
    const paramOffset = dateParams.length;

    let baseFilter = '';
    if (base_id && req.user!.role !== 'admin') {
      baseFilter = `AND base_id = $${paramOffset + 1}`;
    }

    const assetTypeFilter = asset_type_id ? 
      `AND asset_type_id = $${paramOffset + (base_id ? 2 : 1)}` : '';

    // Get purchases
    const purchasesQuery = `
      SELECT p.*, at.name as asset_type_name, b.name as base_name
      FROM purchases p
      JOIN asset_types at ON p.asset_type_id = at.id
      JOIN bases b ON p.base_id = b.id
      WHERE 1=1 ${dateFilter} ${baseFilter} ${assetTypeFilter}
      ORDER BY p.purchase_date DESC
    `;
    const purchasesResult = await query(purchasesQuery, [...dateParams, ...(base_id ? [base_id] : []), ...(asset_type_id ? [asset_type_id] : [])]);

    // Get transfers in
    const transfersInQuery = `
      SELECT t.*, at.name as asset_type_name, 
             fb.name as from_base_name, tb.name as to_base_name
      FROM transfers t
      JOIN asset_types at ON t.asset_type_id = at.id
      JOIN bases fb ON t.from_base_id = fb.id
      JOIN bases tb ON t.to_base_id = tb.id
      WHERE t.status = 'completed' ${dateFilter} 
      AND t.to_base_id = $${paramOffset + 1} ${baseFilter} ${assetTypeFilter}
      ORDER BY t.transfer_date DESC
    `;
    const transfersInResult = await query(transfersInQuery, [...dateParams, base_id || req.user!.base_id, ...(base_id ? [base_id] : []), ...(asset_type_id ? [asset_type_id] : [])]);

    // Get transfers out
    const transfersOutQuery = `
      SELECT t.*, at.name as asset_type_name, 
             fb.name as from_base_name, tb.name as to_base_name
      FROM transfers t
      JOIN asset_types at ON t.asset_type_id = at.id
      JOIN bases fb ON t.from_base_id = fb.id
      JOIN bases tb ON t.to_base_id = tb.id
      WHERE t.status = 'completed' ${dateFilter} 
      AND t.from_base_id = $${paramOffset + 1} ${baseFilter} ${assetTypeFilter}
      ORDER BY t.transfer_date DESC
    `;
    const transfersOutResult = await query(transfersOutQuery, [...dateParams, base_id || req.user!.base_id, ...(base_id ? [base_id] : []), ...(asset_type_id ? [asset_type_id] : [])]);

    res.json({
      success: true,
      data: {
        purchases: purchasesResult.rows,
        transfers_in: transfersInResult.rows,
        transfers_out: transfersOutResult.rows
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

// @route   GET /api/dashboard/balances
// @desc    Get balance summaries by asset type
// @access  Private
router.get('/balances', authenticate, async (req: Request, res: Response) => {
  try {
    const { base_id } = req.query;
    
    let baseFilter = '';
    if (base_id && req.user!.role !== 'admin') {
      baseFilter = 'AND base_id = $1';
    }

    // Get balance by asset type
    const balanceQuery = `
      SELECT 
        at.id,
        at.name as asset_type_name,
        at.category,
        COALESCE(SUM(CASE WHEN p.id IS NOT NULL THEN p.quantity ELSE 0 END), 0) as total_purchased,
        COALESCE(SUM(CASE WHEN t_in.id IS NOT NULL THEN t_in.quantity ELSE 0 END), 0) as total_transferred_in,
        COALESCE(SUM(CASE WHEN t_out.id IS NOT NULL THEN t_out.quantity ELSE 0 END), 0) as total_transferred_out,
        COALESCE(SUM(CASE WHEN e.id IS NOT NULL THEN e.quantity ELSE 0 END), 0) as total_expended
      FROM asset_types at
      LEFT JOIN purchases p ON at.id = p.asset_type_id ${baseFilter}
      LEFT JOIN transfers t_in ON at.id = t_in.asset_type_id AND t_in.status = 'completed' AND t_in.to_base_id = $${baseFilter ? '2' : '1'}
      LEFT JOIN transfers t_out ON at.id = t_out.asset_type_id AND t_out.status = 'completed' AND t_out.from_base_id = $${baseFilter ? '2' : '1'}
      LEFT JOIN expenditures e ON at.id = e.asset_type_id ${baseFilter}
      WHERE at.is_active = true
      GROUP BY at.id, at.name, at.category
      ORDER BY at.name
    `;

    const balanceResult = await query(balanceQuery, base_id ? [base_id, base_id] : [req.user!.base_id]);

    const balances = balanceResult.rows.map((row: any) => ({
      asset_type_id: row.id,
      asset_type_name: row.asset_type_name,
      category: row.category,
      total_purchased: parseInt(row.total_purchased) || 0,
      total_transferred_in: parseInt(row.total_transferred_in) || 0,
      total_transferred_out: parseInt(row.total_transferred_out) || 0,
      total_expended: parseInt(row.total_expended) || 0,
      current_balance: (parseInt(row.total_purchased) || 0) + 
                      (parseInt(row.total_transferred_in) || 0) - 
                      (parseInt(row.total_transferred_out) || 0) - 
                      (parseInt(row.total_expended) || 0)
    }));

    res.json({
      success: true,
      data: balances
    });
  } catch (error) {
    logger.error('Dashboard balances error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

// @route   GET /api/dashboard/summary
// @desc    Get a full summary of dashboard metrics
// @access  Private
router.get('/summary', authenticate, async (req: Request, res: Response) => {
  try {
    const { base_id, start_date, end_date, asset_type_id } = req.query as { [key: string]: string };
    const { role, base_id: user_base_id } = req.user!;

    const targetBaseId = (role === 'admin' && base_id) ? base_id : user_base_id;
    
    const queryParams: any[] = [targetBaseId];
    if (start_date && end_date) {
      queryParams.push(start_date, end_date);
    }
    if (asset_type_id) {
      queryParams.push(asset_type_id);
    }

    const dateFilter = (dateCol: string) => 
      !start_date || !end_date ? '' : `AND ${dateCol}::date BETWEEN $2 AND $3`;
    
    const assetTypeFilter = asset_type_id ? 
      `AND asset_type_id = $${queryParams.length}` : '';

    const purchasesQuery = `SELECT COALESCE(SUM(quantity), 0) AS count FROM purchases WHERE base_id = $1 ${dateFilter('purchase_date')} ${assetTypeFilter}`;
    const expendedQuery = `SELECT COALESCE(SUM(quantity), 0) AS count FROM expenditures WHERE base_id = $1 ${dateFilter('expenditure_date')} ${assetTypeFilter}`;
    
    // For assignments, we need to join through assets table to get asset_type_id
    const assignmentsQuery = asset_type_id ? 
      `SELECT COALESCE(COUNT(*), 0) AS count FROM assignments a 
       JOIN assets ast ON a.asset_id = ast.id 
       WHERE a.status = 'active' AND a.base_id = $1 ${dateFilter('a.assignment_date')} AND ast.asset_type_id = $${queryParams.length}` :
      `SELECT COALESCE(COUNT(*), 0) AS count FROM assignments WHERE status = 'active' AND base_id = $1 ${dateFilter('assignment_date')}`;
    
    const transfersInQuery = `SELECT COALESCE(SUM(quantity), 0) AS count FROM transfers WHERE status = 'completed' AND to_base_id = $1 ${dateFilter('transfer_date')} ${assetTypeFilter}`;
    const transfersOutQuery = `SELECT COALESCE(SUM(quantity), 0) AS count FROM transfers WHERE status = 'completed' AND from_base_id = $1 ${dateFilter('transfer_date')} ${assetTypeFilter}`;

    const [
      purchasesRes,
      expendedRes,
      assignmentsRes,
      transfersInRes,
      transfersOutRes
    ] = await Promise.all([
      query(purchasesQuery, queryParams),
      query(expendedQuery, queryParams),
      query(assignmentsQuery, queryParams),
      query(transfersInQuery, queryParams),
      query(transfersOutQuery, queryParams)
    ]);
    
    const purchases = parseInt(purchasesRes.rows[0].count) || 0;
    const expended = parseInt(expendedRes.rows[0].count) || 0;
    const assigned = parseInt(assignmentsRes.rows[0].count) || 0;
    const transfers_in = parseInt(transfersInRes.rows[0].count) || 0;
    const transfers_out = parseInt(transfersOutRes.rows[0].count) || 0;

    // Opening balance is a tricky concept without historical snapshots.
    // For this dashboard, we'll consider it 0 and focus on movements.
    const opening_balance = 0;
    const net_movement = (purchases + transfers_in) - (transfers_out + expended);
    const closing_balance = opening_balance + net_movement;

    res.json({
      success: true,
      data: {
        opening_balance,
        closing_balance,
        net_movement,
        purchases,
        transfers_in,
        transfers_out,
        assigned,
        expended
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

export default router; 