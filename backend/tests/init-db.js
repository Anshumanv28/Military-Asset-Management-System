const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const initDatabase = async () => {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {
    console.error('DATABASE_URL not found in .env file');
    process.exit(1);
  }

  const pool = new Pool({
    connectionString: dbUrl,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  });

  try {
    console.log('📖 Reading schema file...');
    const schemaPath = path.join(__dirname, 'src', 'database', 'schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');

    console.log('🏗️ Creating database schema...');
    await pool.query(schema);
    console.log('✅ Schema created successfully');

    console.log('🌱 Running seed script...');
    const { execSync } = require('child_process');
    execSync('npx ts-node src/database/seed.ts', { stdio: 'inherit' });
    console.log('✅ Database seeded successfully');

    console.log('🎉 Database initialization completed!');
    console.log('You can now start the server with: npm start');

  } catch (error) {
    console.error('❌ Error initializing database:', error.message);
    process.exit(1);
  } finally {
    await pool.end();
  }
};

initDatabase(); 