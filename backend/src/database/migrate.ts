import { readFileSync } from 'fs';
import { join } from 'path';
import { query, testConnection } from './connection';
import { logger } from '../utils/logger';

const runMigrations = async () => {
  try {
    // Test database connection
    await testConnection();
    
    logger.info('Starting database migrations...');

    // Read and execute schema
    const schemaPath = join(__dirname, 'schema.sql');
    const schema = readFileSync(schemaPath, 'utf8');

    // Execute the entire schema as a single query
    await query(schema);

    logger.info('✅ Database migrations completed successfully');
  } catch (error) {
    logger.error('❌ Database migration failed:', error);
    process.exit(1);
  }
};

// Run migrations if this file is executed directly
if (require.main === module) {
  runMigrations();
}

export { runMigrations }; 