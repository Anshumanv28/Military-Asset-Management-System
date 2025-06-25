require('dotenv').config();
const postgres = require('postgres');

async function testPoolerConnection() {
  console.log('🔍 Testing Supabase connection pooler...');
  
  if (!process.env.DATABASE_URL) {
    console.error('❌ DATABASE_URL not found in environment variables');
    process.exit(1);
  }

  // Try connection pooler URL (port 6543 instead of 5432)
  const originalUrl = process.env.DATABASE_URL;
  const poolerUrl = originalUrl.replace(':5432/', ':6543/');
  
  console.log('📡 Original URL:', originalUrl);
  console.log('📡 Pooler URL:', poolerUrl);
  
  const sql = postgres(poolerUrl, {
    ssl: {
      rejectUnauthorized: false
    },
    max: 1,
    connect_timeout: 10,
  });

  try {
    console.log('🔄 Attempting to connect via pooler...');
    const result = await sql`SELECT version()`;
    console.log('✅ Connection successful via pooler!');
    console.log('📊 Database version:', result[0].version);
    
    await sql.end();
    console.log('🔌 Connection closed');
    
    // If this works, update the .env file
    console.log('\n💡 Success! You can use the pooler connection.');
    console.log('📝 Update your DATABASE_URL to use port 6543 instead of 5432');
    
  } catch (error) {
    console.error('❌ Pooler connection failed:', error.message);
    console.error('🔍 Error details:', {
      code: error.code,
      errno: error.errno,
      syscall: error.syscall
    });
    await sql.end();
  }
}

testPoolerConnection(); 