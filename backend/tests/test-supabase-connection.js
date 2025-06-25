require('dotenv').config();
const postgres = require('postgres');

async function testSupabaseConnection() {
  console.log('🔍 Testing Supabase connection...');
  console.log('📡 Connection URL:', process.env.DATABASE_URL ? 'Set' : 'Not set');
  
  if (!process.env.DATABASE_URL) {
    console.error('❌ DATABASE_URL not found in environment variables');
    process.exit(1);
  }

  // Try different connection configurations
  const configs = [
    {
      name: 'Default SSL config',
      options: {
        ssl: {
          rejectUnauthorized: false
        },
        max: 1,
        connect_timeout: 10,
        onnotice: () => {},
        onparameter: () => {},
      }
    },
    {
      name: 'No SSL',
      options: {
        ssl: false,
        max: 1,
        connect_timeout: 10,
        onnotice: () => {},
        onparameter: () => {},
      }
    },
    {
      name: 'Require SSL',
      options: {
        ssl: 'require',
        max: 1,
        connect_timeout: 10,
        onnotice: () => {},
        onparameter: () => {},
      }
    }
  ];

  for (const config of configs) {
    console.log(`\n🔄 Testing: ${config.name}`);
    
    const sql = postgres(process.env.DATABASE_URL, config.options);

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
}

testSupabaseConnection(); 