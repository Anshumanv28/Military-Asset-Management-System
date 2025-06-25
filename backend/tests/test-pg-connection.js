require('dotenv').config();
const { Pool } = require('pg');

async function testPGConnection() {
  console.log('🔍 Testing pg connection to Supabase...');
  console.log('📡 Connection URL:', process.env.DATABASE_URL ? 'Set' : 'Not set');
  
  if (!process.env.DATABASE_URL) {
    console.error('❌ DATABASE_URL not found in environment variables');
    process.exit(1);
  }

  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    },
    max: 1,
    connectionTimeoutMillis: 30000,
  });

  try {
    console.log('🔄 Attempting to connect...');
    const client = await pool.connect();
    
    const result = await client.query('SELECT version()');
    console.log('✅ Connection successful!');
    console.log('📊 Database version:', result.rows[0].version);
    
    // Test a simple query
    const testResult = await client.query('SELECT COUNT(*) as count FROM information_schema.tables');
    console.log('📋 Tables in database:', testResult.rows[0].count);
    
    client.release();
    await pool.end();
    console.log('🔌 Connection closed');
    
    console.log('\n🎉 Success! pg connection is working.');
    console.log('📝 You can now start your backend server.');
    
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    console.error('🔍 Error details:', {
      code: error.code,
      errno: error.errno,
      syscall: error.syscall
    });
    await pool.end();
  }
}

testPGConnection(); 