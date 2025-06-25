require('dotenv').config();

console.log('🔍 Testing environment variables...');
console.log('📡 DATABASE_URL:', process.env.DATABASE_URL);
console.log('📡 NODE_ENV:', process.env.NODE_ENV);

// Test the exact same code as the main application
const postgres = require('postgres');

const connectionString = process.env['DATABASE_URL'];
console.log('🔗 Connection string from main app:', connectionString);

// Parse it like the main app does
const url = new URL(connectionString);
console.log('👤 Username from main app:', url.username);
console.log('🌐 Hostname from main app:', url.hostname);

// Create the same connection as the main app
const sql = postgres(connectionString, {
  ssl: false,
  max: 10,
  idle_timeout: 20,
  connect_timeout: 30,
  max_lifetime: 60 * 30,
  onnotice: () => {},
  onparameter: () => {},
});

async function testMainAppConnection() {
  try {
    console.log('🔄 Testing main app connection...');
    await sql`SELECT 1`;
    console.log('✅ Main app connection successful!');
    
    await sql.end();
    console.log('🔌 Connection closed');
    
  } catch (error) {
    console.error('❌ Main app connection failed:', error.message);
    console.error('🔍 Error details:', {
      code: error.code,
      errno: error.errno,
      syscall: error.syscall
    });
    await sql.end();
  }
}

testMainAppConnection(); 