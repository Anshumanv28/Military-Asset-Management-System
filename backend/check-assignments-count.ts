import { query, testConnection } from './src/database/connection';
import { logger } from './src/utils/logger';

const checkAssignmentsCount = async () => {
  try {
    await testConnection();
    logger.info('Checking assignments count...');

    const result = await query('SELECT COUNT(*) as count FROM assignments');
    const count = result.rows[0].count;
    
    logger.info(`Total assignments in database: ${count}`);

    if (count > 0) {
      const assignments = await query(`
        SELECT a.*, ast.name as asset_name, p.first_name, p.last_name, b.name as base_name
        FROM assignments a
        JOIN assets ast ON a.asset_id = ast.id
        JOIN personnel p ON a.assigned_to = p.id::text
        JOIN bases b ON a.base_id = b.id
        LIMIT 5
      `);
      
      logger.info('Sample assignments:');
      assignments.rows.forEach((assignment: any, index: number) => {
        logger.info(`  ${index + 1}. ${assignment.asset_name} assigned to ${assignment.first_name} ${assignment.last_name} at ${assignment.base_name} (${assignment.status})`);
      });
    }

  } catch (error) {
    logger.error('Error checking assignments:', error);
  }
};

checkAssignmentsCount(); 