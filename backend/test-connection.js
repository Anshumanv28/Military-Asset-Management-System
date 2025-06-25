const postgres = require('postgres');
const dns = require('dns');

// Set DNS to prefer IPv6
dns.setDefaultResultOrder('ipv6first');

const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:WxmiAIhf%23gp7Mst@db.uzhljidxxcumibwgsbti.supabase.co:5432/postgres?sslmode=require';

console.log('Testing connection to:', connectionString.replace(/:[^:@]*@/, ':****@'));

// Test DNS resolution first
console.log('Testing DNS resolution...');
dns.lookup('db.uzhljidxxcumibwgsbti.supabase.co', (err, address, family) => {
  if (err) {
    console.error('❌ DNS lookup failed:', err);
  } else {
    console.log('✅ DNS lookup successful:');
    console.log('  Address:', address);
    console.log('  Family:', family === 4 ? 'IPv4' : 'IPv6');
  }
});

const sql = postgres(connectionString, {
  ssl: 'require',
  max: 1,
  timeout: 10
});

async function testConnection() {
  try {
    console.log('Attempting to connect...');
    const result = await sql`SELECT 1 as test`;
    console.log('✅ Connection successful!');
    console.log('Result:', result);
    
    // Test a simple query
    const version = await sql`SELECT version()`;
    console.log('PostgreSQL version:', version[0].version);
    
  } catch (error) {
    console.error('❌ Connection failed:');
    console.error('Error code:', error.code);
    console.error('Error message:', error.message);
    console.error('Full error:', error);
  } finally {
    await sql.end();
  }
}

// Wait a bit for DNS lookup to complete
setTimeout(testConnection, 1000); 