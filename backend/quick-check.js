const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'MAMS',
  user: 'postgres',
  password: 'root'
});

async function quickCheck() {
  try {
    const client = await pool.connect();
    
    // Check assignments
    const assignmentsResult = await client.query('SELECT COUNT(*) as count FROM assignments');
    console.log('Assignments count:', assignmentsResult.rows[0].count);
    
    // Check transfers
    const transfersResult = await client.query('SELECT COUNT(*) as count FROM transfers');
    console.log('Transfers count:', transfersResult.rows[0].count);
    
    if (transfersResult.rows[0].count > 0) {
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
        console.log(`- Status: ${transfer.status}`);
        console.log(`- From: ${transfer.from_base_name} -> To: ${transfer.to_base_name}`);
        console.log(`- Asset: ${transfer.asset_type_name} (${transfer.quantity})`);
        console.log(`- Created by: ${transfer.first_name} ${transfer.last_name}`);
        console.log(`- Should show approve/reject: ${transfer.status === 'pending' ? 'YES' : 'NO'}`);
      }
    }
    
    client.release();
    pool.end();
  } catch (error) {
    console.error('Error:', error);
    pool.end();
  }
}

quickCheck(); 