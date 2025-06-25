const dotenv = require('dotenv');
const postgres = require('postgres');

// Load environment variables exactly like the main app
dotenv.config();

console.log('🔍 Debugging main app environment loading...');
console.log('📡 DATABASE_URL from env:', process.env.DATABASE_URL);
console.log('🌍 NODE_ENV:', process.env.NODE_ENV);

// Parse the connection string to see what user it contains
if (process.env.DATABASE_URL) {
  const url = new URL(process.env.DATABASE_URL);
  console.log('👤 Username from connection string:', url.username);
  console.log('🌐 Hostname from connection string:', url.hostname);
  console.log('🔌 Port from connection string:', url.port);
  console.log('🗄️ Database from connection string:', url.pathname);
}

// Try to create the same connection as the main app
console.log('\n🔌 Testing main app connection...');

async function testConnection() {
  try {
    const connectionString = process.env['DATABASE_URL'];
    console.log('🔗 Using connection string:', connectionString);
    
    const sql = postgres(connectionString, {
      ssl: false,
      max: 10,
      idle_timeout: 20,
      connect_timeout: 30,
      max_lifetime: 60 * 30,
      onnotice: () => {},
      onparameter: () => {},
    });

    // Test the connection
    const result = await sql`SELECT current_user, current_database()`;
    console.log('✅ Main app connection successful!');
    console.log('👤 Connected as user:', result[0].current_user);
    console.log('🗄️ Connected to database:', result[0].current_database);
    
    await sql.end();
    console.log('🔌 Connection closed');
  } catch (error) {
    console.error('❌ Main app connection failed:', error.message);
    console.error('🔍 Error details:', {
      code: error.code,
      errno: error.errno,
      syscall: error.syscall,
      stack: error.stack
    });
  }
}

testConnection(); 