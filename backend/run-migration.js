const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

// Database configuration
const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  password: 'root',
  database: 'MAMS',
  port: 5432
});

async function runMigration() {
  try {
    console.log('Starting database migration...');
    
    // Read the migration SQL file
    const migrationPath = path.join(__dirname, 'src', 'database', 'add-quantity-tracking.sql');
    const migrationSQL = fs.readFileSync(migrationPath, 'utf8');
    
    console.log('Migration SQL loaded successfully');
    
    // Execute the migration
    await pool.query(migrationSQL);
    
    console.log('✅ Migration completed successfully!');
    console.log('Added quantity columns to assignments and assets tables');
    
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    if (error.code === '42701') {
      console.log('Note: Some columns might already exist, which is fine');
    }
  } finally {
    await pool.end();
  }
}

runMigration(); 