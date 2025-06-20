const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'MAMS',
  user: 'postgres',
  password: 'root'
});

async function testTransfers() {
  try {
    const client = await pool.connect();
    
    console.log('Testing transfers...');
    
    // Check transfers count
    const countResult = await client.query('SELECT COUNT(*) as count FROM transfers');
    console.log(`Total transfers: ${countResult.rows[0].count}`);
    
    if (countResult.rows[0].count > 0) {
      // Get the most recent transfer
      const recentTransfer = await client.query(`
        SELECT t.*, 
               fb.name as from_base_name, tb.name as to_base_name,
               at.name as asset_type_name,
               u.first_name, u.last_name
        FROM transfers t
        JOIN bases fb ON t.from_base_id = fb.id
        JOIN bases tb ON t.to_base_id = tb.id
        JOIN asset_types at ON t.asset_type_id = at.id
        JOIN users u ON t.created_by::uuid = u.id
        ORDER BY t.created_at DESC
        LIMIT 1
      `);
      
      if (recentTransfer.rows.length > 0) {
        const transfer = recentTransfer.rows[0];
        console.log('\nMost recent transfer:');
        console.log(`- ID: ${transfer.id}`);
        console.log(`- Transfer Number: ${transfer.transfer_number}`);
        console.log(`- Status: ${transfer.status}`);
        console.log(`- From: ${transfer.from_base_name}`);
        console.log(`- To: ${transfer.to_base_name}`);
        console.log(`- Asset Type: ${transfer.asset_type_name}`);
        console.log(`- Quantity: ${transfer.quantity}`);
        console.log(`- Created by: ${transfer.first_name} ${transfer.last_name}`);
        console.log(`- Created at: ${transfer.created_at}`);
        
        // Check if this transfer should show approve/reject buttons
        console.log(`\nShould show approve/reject buttons: ${transfer.status === 'pending' ? 'YES' : 'NO'}`);
      }
    }
    
    client.release();
    pool.end();
  } catch (error) {
    console.error('Error testing transfers:', error);
    pool.end();
  }
}

testTransfers(); 