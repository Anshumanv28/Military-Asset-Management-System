const { Pool } = require('pg');
require('dotenv').config();

const resetDatabase = async () => {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {
    console.error('DATABASE_URL not found in .env file');
    process.exit(1);
  }

  // Parse the database URL to get connection details
  const url = new URL(dbUrl);
  const host = url.hostname;
  const port = url.port;
  const user = url.username;
  const password = url.password;
  const database = url.pathname.slice(1); // Remove leading slash

  console.log(`Resetting database: ${database} on ${host}:${port}`);

  // Connect to postgres database (not the target database)
  const postgresPool = new Pool({
    host,
    port,
    user,
    password,
    database: 'postgres', // Connect to default postgres database
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  });

  try {
    // Terminate all connections to the target database
    console.log('Terminating existing connections...');
    await postgresPool.query(`
      SELECT pg_terminate_backend(pid)
      FROM pg_stat_activity
      WHERE datname = $1 AND pid <> pg_backend_pid()
    `, [database]);

    // Drop the database if it exists
    console.log('Dropping database...');
    await postgresPool.query(`DROP DATABASE IF EXISTS "${database}"`);

    // Create the database
    console.log('Creating database...');
    await postgresPool.query(`CREATE DATABASE "${database}"`);

    console.log('✅ Database reset completed successfully!');
    console.log('Now run: npx ts-node src/database/seed.ts');

  } catch (error) {
    console.error('❌ Error resetting database:', error.message);
    process.exit(1);
  } finally {
    await postgresPool.end();
  }
};

resetDatabase(); 