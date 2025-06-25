import sql from './db';
import { logger } from '../utils/logger';

// Test database connection
export const testConnection = async (): Promise<void> => {
  try {
    await sql`SELECT 1`;
    logger.info('✅ Database connection successful');
  } catch (error) {
    logger.error('❌ Database connection failed:', error);
    throw error;
  }
};

// Execute a query with $1, $2, ... placeholders using sql.unsafe with positional parameters
export const query = async (text: string, params?: any[]): Promise<any> => {
  const start = Date.now();
  try {
    let res;
    if (params && params.length > 0) {
      // Use sql.unsafe with the query text and parameters as an array
      res = await sql.unsafe(text, params);
    } else {
      res = await sql.unsafe(text);
    }
    const duration = Date.now() - start;
    logger.debug(`Executed query in ${duration}ms: ${text.substring(0, 100)}...`);
    return { rows: res };
  } catch (error) {
    logger.error('Query error:', error);
    throw error;
  }
};

export default sql; 