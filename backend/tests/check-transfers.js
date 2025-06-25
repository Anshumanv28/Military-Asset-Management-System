const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'military_assets',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
});

async function checkTransfers() {
  try {
    const result = await pool.query('SELECT id, transfer_number, asset_name, status, from_base_id, to_base_id FROM transfers ORDER BY created_at DESC LIMIT 10');
    
    console.log('Transfers in database:');
    console.log('Total transfers:', result.rows.length);
    
    result.rows.forEach(t => {
      console.log(`- ${t.transfer_number}: ${t.asset_name} (${t.status})`);
    });
    
    const pendingCount = result.rows.filter(t => t.status === 'pending').length;
    console.log(`\nPending transfers: ${pendingCount}`);
    
    await pool.end();
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    await pool.end();
    process.exit(1);
  }
}

checkTransfers(); 