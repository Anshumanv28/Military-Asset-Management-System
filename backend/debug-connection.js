require('dotenv').config();

console.log('🔍 Debugging connection...');
console.log('📡 DATABASE_URL from env:', process.env.DATABASE_URL);

// Parse the connection string manually
const url = new URL(process.env.DATABASE_URL);
console.log('🌐 Hostname:', url.hostname);
console.log('🔧 Port:', url.port);
console.log('📊 Database:', url.pathname.slice(1));
console.log('👤 Username:', url.username);
console.log('🔑 Password length:', url.password ? url.password.length : 0);

// Test with postgres package
const postgres = require('postgres');

const sql = postgres(process.env.DATABASE_URL, {
  ssl: false,
  max: 1,
  connect_timeout: 10,
});

async function testConnection() {
  try {
    console.log('🔄 Attempting to connect...');
    const result = await sql`SELECT version()`;
    console.log('✅ Connection successful!');
    console.log('📊 Database version:', result[0].version);
    
    await sql.end();
    console.log('🔌 Connection closed');
    
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

testConnection(); 