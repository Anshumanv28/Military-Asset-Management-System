require('dotenv').config();
const postgres = require('postgres');

async function testVPNConnection() {
  console.log('🔍 Testing VPN connection to Supabase...');
  console.log('📡 Connection URL:', process.env.DATABASE_URL ? 'Set' : 'Not set');
  
  if (!process.env.DATABASE_URL) {
    console.error('❌ DATABASE_URL not found in environment variables');
    process.exit(1);
  }

  // Try different connection configurations for VPN
  const configs = [
    {
      name: 'Standard VPN config',
      options: {
        ssl: {
          rejectUnauthorized: false
        },
        max: 1,
        connect_timeout: 30,
        idle_timeout: 20,
      }
    },
    {
      name: 'VPN with longer timeout',
      options: {
        ssl: {
          rejectUnauthorized: false
        },
        max: 1,
        connect_timeout: 60,
        idle_timeout: 30,
      }
    },
    {
      name: 'VPN with no SSL (fallback)',
      options: {
        ssl: false,
        max: 1,
        connect_timeout: 30,
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
      
      console.log('\n🎉 Success! VPN connection is working.');
      console.log('📝 You can now start your backend server.');
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
  
  console.log('\n❌ All VPN connection attempts failed');
  console.log('\n💡 Additional suggestions:');
  console.log('1. Try a different VPN server/location');
  console.log('2. Check if your VPN blocks certain ports');
  console.log('3. Try connecting from a different network entirely');
  console.log('4. Contact Supabase support about your region');
}

testVPNConnection(); 