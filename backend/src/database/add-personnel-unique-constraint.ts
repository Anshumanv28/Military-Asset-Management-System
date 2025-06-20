import { query, testConnection } from './connection';
import { logger } from '../utils/logger';

const addPersonnelUniqueConstraint = async () => {
  try {
    await testConnection();
    logger.info('Starting personnel unique constraint migration...');

    // Check if constraint already exists
    const constraintExists = await query(`
      SELECT constraint_name 
      FROM information_schema.table_constraints 
      WHERE table_name = 'personnel' 
      AND constraint_name = 'personnel_unique_name_email'
    `);

    if (constraintExists.rows.length > 0) {
      logger.info('Unique constraint already exists on personnel table');
      return;
    }

    // Add unique constraint on first_name, last_name, and email combination
    await query(`
      ALTER TABLE personnel 
      ADD CONSTRAINT personnel_unique_name_email 
      UNIQUE (first_name, last_name, email)
    `);

    logger.info('✅ Successfully added unique constraint on personnel table');
    logger.info('   - Constraint: personnel_unique_name_email');
    logger.info('   - Fields: first_name, last_name, email');

  } catch (error) {
    logger.error('❌ Failed to add personnel unique constraint:', error);
    throw error;
  }
};

// Run migration if this file is executed directly
if (require.main === module) {
  addPersonnelUniqueConstraint()
    .then(() => {
      logger.info('Migration completed successfully');
      process.exit(0);
    })
    .catch((error) => {
      logger.error('Migration failed:', error);
      process.exit(1);
    });
}

export { addPersonnelUniqueConstraint }; 