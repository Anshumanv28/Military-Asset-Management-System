require('dotenv').config();
const postgres = require('postgres');

// Try to force IPv4
process.env.NODE_OPTIONS = '--dns-result-order=ipv4first';

async function testIPv4Connection() {
  console.log('🔍 Testing IPv4 connection to Supabase...');
  console.log('📡 Connection URL:', process.env.DATABASE_URL ? 'Set' : 'Not set');
  
  if (!process.env.DATABASE_URL) {
    console.error('❌ DATABASE_URL not found in environment variables');
    process.exit(1);
  }

  // Try to extract hostname and manually resolve
  const url = new URL(process.env.DATABASE_URL);
  const hostname = url.hostname;
  
  console.log('🌐 Hostname:', hostname);
  console.log('🔧 Port:', url.port);
  
  // Try different connection approaches
  const configs = [
    {
      name: 'Standard connection',
      options: {
        ssl: {
          rejectUnauthorized: false
        },
        max: 1,
        connect_timeout: 10,
      }
    },
    {
      name: 'Connection with explicit host',
      options: {
        host: hostname,
        port: parseInt(url.port),
        database: url.pathname.slice(1), // Remove leading slash
        username: url.username,
        password: url.password,
        ssl: {
          rejectUnauthorized: false
        },
        max: 1,
        connect_timeout: 10,
      }
    }
  ];

  for (const config of configs) {
    console.log(`\n🔄 Testing: ${config.name}`);
    
    let sql;
    if (config.options.host) {
      // Use explicit connection parameters
      sql = postgres({
        host: config.options.host,
        port: config.options.port,
        database: config.options.database,
        username: config.options.username,
        password: config.options.password,
        ssl: config.options.ssl,
        max: config.options.max,
        connect_timeout: config.options.connect_timeout,
      });
    } else {
      // Use connection string
      sql = postgres(process.env.DATABASE_URL, config.options);
    }

    try {
      console.log('🔄 Attempting to connect...');
      const result = await sql`SELECT version()`;
      console.log('✅ Connection successful!');
      console.log('📊 Database version:', result[0].version);
      
      await sql.end();
      console.log('🔌 Connection closed');
      return; // Success, exit
      
    } catch (error) {
      console.error('❌ Connection failed:', error.message);
      console.error('🔍 Error details:', {
        code: error.code,
        errno: error.errno,
        syscall: error.syscall
      });
      await sql.end();
    }
  }
  
  console.log('\n❌ All connection attempts failed');
  console.log('\n💡 Suggestions:');
  console.log('1. Check if your network supports IPv6 properly');
  console.log('2. Try connecting from a different network');
  console.log('3. Contact Supabase support about IPv4 connectivity');
  console.log('4. Consider using a VPN or proxy');
}

testIPv4Connection(); 