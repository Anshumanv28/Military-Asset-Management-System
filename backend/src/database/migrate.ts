import { query, testConnection } from './connection';
import { logger } from '../utils/logger';

const runMigrations = async () => {
  try {
    // Test database connection
    await testConnection();
    
    logger.info('Starting database migrations...');

    // Check if status column already exists in purchases table
    const checkColumnQuery = `
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'purchases' AND column_name = 'status'
    `;
    
    const columnExists = await query(checkColumnQuery);
    
    if (columnExists.rows.length === 0) {
      logger.info('Adding status fields to purchases table...');
      
      // Add status, approved_by, and approved_at columns to purchases table
      const alterQuery = `
        ALTER TABLE purchases 
        ADD COLUMN status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'cancelled')),
        ADD COLUMN approved_by UUID REFERENCES users(id),
        ADD COLUMN approved_at TIMESTAMP
      `;
      
      await query(alterQuery);
      logger.info('✅ Status fields added to purchases table');
    } else {
      logger.info('✅ Status fields already exist in purchases table');
    }

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