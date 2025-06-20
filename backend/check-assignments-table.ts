import { query, testConnection } from './src/database/connection';
import { logger } from './src/utils/logger';

const checkAssignmentsTable = async () => {
  try {
    await testConnection();
    logger.info('Checking assignments table structure...');

    // Get table structure
    const result = await query(`
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns
      WHERE table_name = 'assignments'
      ORDER BY ordinal_position;
    `);

    logger.info('Assignments table columns:');
    result.rows.forEach((row: any) => {
      logger.info(`  ${row.column_name}: ${row.data_type} (nullable: ${row.is_nullable})`);
    });

    // Check if personnel_id exists
    const personnelIdExists = result.rows.some((row: any) => row.column_name === 'personnel_id');
    logger.info(`personnel_id column exists: ${personnelIdExists}`);

    // Check if assigned_to exists
    const assignedToExists = result.rows.some((row: any) => row.column_name === 'assigned_to');
    logger.info(`assigned_to column exists: ${assignedToExists}`);

  } catch (error) {
    logger.error('Error checking assignments table:', error);
  }
};

checkAssignmentsTable(); 