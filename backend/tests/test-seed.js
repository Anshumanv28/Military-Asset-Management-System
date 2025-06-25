const { query } = require('./src/database/connection');

async function testSeed() {
  try {
    console.log('Testing database seeding...');
    
    // Test users
    const usersResult = await query('SELECT COUNT(*) as count FROM users');
    console.log('Users count:', usersResult.rows[0].count);
    
    // Test bases
    const basesResult = await query('SELECT COUNT(*) as count FROM bases');
    console.log('Bases count:', basesResult.rows[0].count);
    
    // Test personnel
    const personnelResult = await query('SELECT COUNT(*) as count FROM personnel');
    console.log('Personnel count:', personnelResult.rows[0].count);
    
    // Test asset types
    const assetTypesResult = await query('SELECT COUNT(*) as count FROM asset_types');
    console.log('Asset types count:', assetTypesResult.rows[0].count);
    
    // Test assets
    const assetsResult = await query('SELECT COUNT(*) as count FROM assets');
    console.log('Assets count:', assetsResult.rows[0].count);
    
    // Test assignments
    const assignmentsResult = await query('SELECT COUNT(*) as count FROM assignments');
    console.log('Assignments count:', assignmentsResult.rows[0].count);
    
    // Test purchases
    const purchasesResult = await query('SELECT COUNT(*) as count FROM purchases');
    console.log('Purchases count:', purchasesResult.rows[0].count);
    
    // Test transfers
    const transfersResult = await query('SELECT COUNT(*) as count FROM transfers');
    console.log('Transfers count:', transfersResult.rows[0].count);
    
    // Test expenditures
    const expendituresResult = await query('SELECT COUNT(*) as count FROM expenditures');
    console.log('Expenditures count:', expendituresResult.rows[0].count);
    
    console.log('Database test completed!');
    
  } catch (error) {
    console.error('Error testing database:', error.message);
  }
}

testSeed(); 