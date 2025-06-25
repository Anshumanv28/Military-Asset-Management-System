require('dotenv').config();
const postgres = require('postgres');

async function testDirectIPConnection() {
  console.log('🔍 Testing direct IP connection to Supabase...');
  
  if (!process.env.DATABASE_URL) {
    console.error('❌ DATABASE_URL not found in environment variables');
    process.exit(1);
  }

  // Parse the original connection string
  const url = new URL(process.env.DATABASE_URL);
  const originalHostname = url.hostname;
  
  console.log('🌐 Original hostname:', originalHostname);
  console.log('🔧 Port:', url.port);
  console.log('📊 Database:', url.pathname.slice(1));
  console.log('👤 Username:', url.username);
  
  // Try connecting with the IPv4 address we saw
  const ipv4Address = '10.2.0.1';
  
  console.log(`\n🔄 Trying direct connection to ${ipv4Address}...`);
  
  const sql = postgres({
    host: ipv4Address,
    port: parseInt(url.port),
    database: url.pathname.slice(1),
    username: url.username,
    password: url.password,
    ssl: {
      rejectUnauthorized: false
    },
    max: 1,
    connect_timeout: 10,
  });

  try {
    console.log('🔄 Attempting to connect...');
    const result = await sql`SELECT version()`;
    console.log('✅ Connection successful!');
    console.log('📊 Database version:', result[0].version);
    
    // Test a simple query
    const testResult = await sql`SELECT COUNT(*) as count FROM information_schema.tables`;
    console.log('📋 Tables in database:', testResult[0].count);
    
    await sql.end();
    console.log('🔌 Connection closed');
    
    console.log('\n💡 Success! You can use direct IP connection.');
    console.log('📝 Update your connection configuration to use the IP address.');
    
  } catch (error) {
    console.error('❌ Direct IP connection failed:', error.message);
    console.error('🔍 Error details:', {
      code: error.code,
      errno: error.errno,
      syscall: error.syscall
    });
    await sql.end();
  }
}

testDirectIPConnection(); 