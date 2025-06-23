import { Router, Request, Response } from 'express';
import { query } from '../database/connection';
import { authenticate } from '../middleware/auth';
import { logger } from '../utils/logger';

const router = Router();

// @route   GET /api/dashboard/summary
// @desc    Get a full summary of dashboard metrics focused on asset quantities
// @access  Private
router.get('/summary', authenticate, async (req: Request, res: Response) => {
  try {
    const { base_id, start_date, end_date, asset_type_id } = req.query as { [key: string]: string };
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
    
    const queryParams: any[] = [];
    let baseFilter = '';
    
    if (targetBaseId) {
      queryParams.push(targetBaseId);
      baseFilter = 'AND base_id = $1';
    }
    
    if (start_date && end_date) {
      queryParams.push(start_date, end_date);
    }
    if (asset_type_id) {
      queryParams.push(asset_type_id);
    }

    const dateFilter = (dateCol: string) => 
      !start_date || !end_date ? '' : `AND ${dateCol}::date BETWEEN $${queryParams.length - (asset_type_id ? 1 : 0)} AND $${queryParams.length - (asset_type_id ? 1 : 0) + 1}`;
    
    const assetTypeFilter = asset_type_id ? 
      `AND asset_type_id = $${queryParams.length}` : '';

    // Get total asset quantities
    const totalQuantitiesQuery = `
      SELECT COALESCE(SUM(quantity), 0) AS count 
      FROM assets 
      WHERE 1=1 ${baseFilter} ${assetTypeFilter}
    `;

    // Get available asset quantities
    const availableQuantitiesQuery = `
      SELECT COALESCE(SUM(available_quantity), 0) AS count 
      FROM assets 
      WHERE 1=1 ${baseFilter} ${assetTypeFilter}
    `;

    // Get assigned asset quantities
    const assignedQuantitiesQuery = `
      SELECT COALESCE(SUM(assigned_quantity), 0) AS count 
      FROM assets 
      WHERE 1=1 ${baseFilter} ${assetTypeFilter}
    `;

    // Get low stock asset quantities
    const lowStockQuantitiesQuery = `
      SELECT COALESCE(SUM(quantity), 0) AS count 
      FROM assets 
      WHERE status = 'low_stock' ${baseFilter} ${assetTypeFilter}
    `;

    // Get assets purchased in date range (quantities)
    const purchasedQuantitiesQuery = `
      SELECT COALESCE(SUM(quantity), 0) AS count 
      FROM purchases 
      WHERE status = 'approved' ${baseFilter} ${assetTypeFilter} ${dateFilter('purchase_date')}
    `;

    // Get assets transferred in (approved transfers - quantities)
    const transfersInQuery = `
      SELECT COALESCE(SUM(quantity), 0) AS count 
      FROM transfers
      WHERE status = 'approved' AND to_base_id = $1 ${assetTypeFilter} ${dateFilter('transfer_date')}
    `;

    // Get assets transferred out (approved transfers - quantities)
    const transfersOutQuery = `
      SELECT COALESCE(SUM(quantity), 0) AS count 
      FROM transfers
      WHERE status = 'approved' AND from_base_id = $1 ${assetTypeFilter} ${dateFilter('transfer_date')}
    `;

    // Get assets expended in date range (quantities)
    const expendedQuantitiesQuery = `
      SELECT COALESCE(SUM(quantity), 0) AS count 
      FROM expenditures 
      WHERE 1=1 ${baseFilter} ${assetTypeFilter} ${dateFilter('expenditure_date')}
    `;

    const queries = [
      query(totalQuantitiesQuery, queryParams),
      query(availableQuantitiesQuery, queryParams),
      query(assignedQuantitiesQuery, queryParams),
      query(lowStockQuantitiesQuery, queryParams),
      query(purchasedQuantitiesQuery, queryParams),
      query(expendedQuantitiesQuery, queryParams)
    ];

    // Add transfer queries only if we have a specific base
    if (targetBaseId) {
      queries.push(query(transfersInQuery, [targetBaseId, ...(asset_type_id ? [asset_type_id] : []), ...(start_date && end_date ? [start_date, end_date] : [])]));
      queries.push(query(transfersOutQuery, [targetBaseId, ...(asset_type_id ? [asset_type_id] : []), ...(start_date && end_date ? [start_date, end_date] : [])]));
    } else if (role === 'admin') {
      // For admin viewing all bases, show combined transfers
      const adminTransfersQuery = `
        SELECT COALESCE(SUM(quantity), 0) AS count 
        FROM transfers
        WHERE status = 'approved' ${assetTypeFilter} ${dateFilter('transfer_date')}
      `;
      queries.push(query(adminTransfersQuery, [...(asset_type_id ? [asset_type_id] : []), ...(start_date && end_date ? [start_date, end_date] : [])]));
      queries.push(query(adminTransfersQuery, [...(asset_type_id ? [asset_type_id] : []), ...(start_date && end_date ? [start_date, end_date] : [])]));
    } else {
      // For non-admin users viewing all bases, transfers are not applicable
      queries.push(Promise.resolve({ rows: [{ count: '0' }] }));
      queries.push(Promise.resolve({ rows: [{ count: '0' }] }));
    }

    const [
      totalQuantitiesRes,
      availableQuantitiesRes,
      assignedQuantitiesRes,
      lowStockQuantitiesRes,
      purchasedQuantitiesRes,
      expendedQuantitiesRes,
      transfersInRes,
      transfersOutRes
    ] = await Promise.all(queries);
    
    const total_quantities = parseInt(totalQuantitiesRes.rows[0].count) || 0;
    const available_quantities = parseInt(availableQuantitiesRes.rows[0].count) || 0;
    const assigned_quantities = parseInt(assignedQuantitiesRes.rows[0].count) || 0;
    const low_stock_quantities = parseInt(lowStockQuantitiesRes.rows[0].count) || 0;
    const purchased_quantities = parseInt(purchasedQuantitiesRes.rows[0].count) || 0;
    const expended_quantities = parseInt(expendedQuantitiesRes.rows[0].count) || 0;
    const transfers_in = parseInt(transfersInRes.rows[0].count) || 0;
    const transfers_out = parseInt(transfersOutRes.rows[0].count) || 0;

    // Calculate opening and closing balance for asset quantities
    const opening_balance = total_quantities - purchased_quantities - transfers_in + transfers_out + expended_quantities;
    const closing_balance = total_quantities;
    const net_movement = purchased_quantities + transfers_in - transfers_out - expended_quantities;

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
        transfers_in,
        transfers_out,
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
router.get('/movements', authenticate, async (req: Request, res: Response) => {
  try {
    const { base_id, start_date, end_date, asset_name } = req.query as { [key: string]: string };
    const { role, base_id: user_base_id } = req.user!;

    // Determine target base based on user role
    let targetBaseId: string;
    if (role === 'admin') {
      targetBaseId = base_id || '';
    } else {
      targetBaseId = user_base_id || '';
    }
    
    const queryParams: any[] = [];
    let baseFilter = '';
    
    if (targetBaseId) {
      queryParams.push(targetBaseId);
      baseFilter = 'AND p.base_id = $1';
    }
    
    if (start_date && end_date) {
      queryParams.push(start_date, end_date);
    }
    if (asset_name) {
      queryParams.push(asset_name);
    }

    const dateFilter = (dateCol: string) => 
      !start_date || !end_date ? '' : `AND ${dateCol}::date BETWEEN $${queryParams.length - (asset_name ? 1 : 0)} AND $${queryParams.length - (asset_name ? 1 : 0) + 1}`;
    
    const purchaseAssetNameFilter = asset_name ? 
      `AND a.name ILIKE $${queryParams.length}` : '';
    
    const transferAssetNameFilter = asset_name ? 
      `AND t.asset_name ILIKE $${queryParams.length}` : '';

    // Get purchases breakdown
    const purchasesQuery = `
      SELECT 
        p.id,
        a.name as name,
        a.name as asset_name,
        p.quantity,
        b.name as base_name,
        p.purchase_date as date
      FROM purchases p
      JOIN assets a ON p.asset_id = a.id
      JOIN bases b ON p.base_id = b.id
      WHERE p.status = 'approved' ${baseFilter} ${purchaseAssetNameFilter} ${dateFilter('p.purchase_date')}
      ORDER BY p.purchase_date DESC
      LIMIT 10
    `;

    // Get transfers breakdown
    const transfersQuery = `
      SELECT 
        t.id,
        t.asset_name as name,
        t.asset_name as asset_name,
        t.quantity,
        fb.name as from_base_name,
        tb.name as to_base_name,
        t.transfer_date as date
      FROM transfers t
      JOIN bases fb ON t.from_base_id = fb.id
      JOIN bases tb ON t.to_base_id = tb.id
      WHERE t.status = 'approved' ${baseFilter ? 'AND (t.from_base_id = $1 OR t.to_base_id = $1)' : ''} ${transferAssetNameFilter} ${dateFilter('t.transfer_date')}
      ORDER BY t.transfer_date DESC
      LIMIT 10
    `;

    const [purchasesRes, transfersRes] = await Promise.all([
      query(purchasesQuery, queryParams),
      query(transfersQuery, queryParams)
    ]);

    // Separate transfers into incoming and outgoing based on target base
    let transfersIn: any[] = [];
    let transfersOut: any[] = [];
    
    if (targetBaseId) {
      // Get the base name for the target base
      const baseQuery = 'SELECT name FROM bases WHERE id = $1';
      const baseRes = await query(baseQuery, [targetBaseId]);
      const targetBaseName = baseRes.rows[0]?.name;
      
      if (targetBaseName) {
        transfersIn = transfersRes.rows.filter((t: any) => t.to_base_name === targetBaseName);
        transfersOut = transfersRes.rows.filter((t: any) => t.from_base_name === targetBaseName);
      }
    }

    res.json({
      success: true,
      data: {
        purchased_assets: purchasesRes.rows,
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
router.get('/inventory', authenticate, async (req: Request, res: Response) => {
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
    
    const queryParams: any[] = [];
    let baseFilter = '';
    
    if (targetBaseId) {
      queryParams.push(targetBaseId);
      baseFilter = 'WHERE a.base_id = $1';
    }

    const inventoryQuery = `
      SELECT 
        a.name as asset_name,
        a.quantity,
        a.available_quantity,
        a.assigned_quantity,
        a.status,
        b.name as base_name
      FROM assets a
      JOIN bases b ON a.base_id = b.id
      ${baseFilter}
      ORDER BY a.name, b.name
    `;

    const inventoryRes = await query(inventoryQuery, queryParams);

    res.json({
      success: true,
      data: inventoryRes.rows
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
router.get('/expended-assets', authenticate, async (req: Request, res: Response) => {
  try {
    const { base_id, start_date, end_date, asset_name } = req.query as { [key: string]: string };
    const { role, base_id: user_base_id } = req.user!;

    // Determine target base based on user role
    let targetBaseId: string;
    if (role === 'admin') {
      targetBaseId = base_id || '';
    } else {
      targetBaseId = user_base_id || '';
    }
    
    const queryParams: any[] = [];
    let baseFilter = '';
    
    if (targetBaseId) {
      queryParams.push(targetBaseId);
      baseFilter = 'AND e.base_id = $1';
    }
    
    if (start_date && end_date) {
      queryParams.push(start_date, end_date);
    }
    if (asset_name) {
      queryParams.push(asset_name);
    }

    const dateFilter = (dateCol: string) => 
      !start_date || !end_date ? '' : `AND ${dateCol}::date BETWEEN $${queryParams.length - (asset_name ? 1 : 0)} AND $${queryParams.length - (asset_name ? 1 : 0) + 1}`;
    
    const assetNameFilter = asset_name ? 
      `AND e.asset_name ILIKE $${queryParams.length}` : '';

    // Get expended assets by asset name
    const expendedAssetsQuery = `
      SELECT 
        e.asset_name,
        COALESCE(SUM(e.quantity), 0) as expended_quantity
      FROM expenditures e
      WHERE 1=1 ${baseFilter} ${assetNameFilter} ${dateFilter('e.expenditure_date')}
      GROUP BY e.asset_name
      ORDER BY expended_quantity DESC
      LIMIT 10
    `;

    const expendedAssetsRes = await query(expendedAssetsQuery, queryParams);

    // Format data for chart
    const chartData = expendedAssetsRes.rows.map((row: any) => ({
      name: row.asset_name,
      value: parseInt(row.expended_quantity) || 0
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