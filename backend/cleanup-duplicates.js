const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'MAMS',
  user: 'postgres',
  password: 'root'
});

async function cleanupDuplicates() {
  try {
    const client = await pool.connect();
    
    console.log('Starting duplicate cleanup...');
    
    // First, let's see what we have
    const beforeCount = await client.query('SELECT COUNT(*) as count FROM personnel');
    console.log(`Before cleanup: ${beforeCount.rows[0].count} personnel records`);
    
    // Delete duplicates, keeping only the first record for each person
    const deleteResult = await client.query(`
      DELETE FROM personnel 
      WHERE id NOT IN (
        SELECT MIN(id) 
        FROM personnel 
        GROUP BY first_name, last_name, email
      )
    `);
    
    console.log(`Deleted ${deleteResult.rowCount} duplicate records`);
    
    // Check the final count
    const afterCount = await client.query('SELECT COUNT(*) as count FROM personnel');
    console.log(`After cleanup: ${afterCount.rows[0].count} personnel records`);
    
    // Show remaining personnel
    const remainingPersonnel = await client.query(`
      SELECT id, first_name, last_name, rank, email, department
      FROM personnel
      ORDER BY first_name, last_name
    `);
    
    console.log('\nRemaining personnel:');
    remainingPersonnel.rows.forEach((person, index) => {
      console.log(`${index + 1}. ${person.first_name} ${person.last_name} (${person.rank}) - ${person.email}`);
    });
    
    console.log('\n✅ Duplicate cleanup completed successfully!');
    
  } catch (error) {
    console.error('Error during cleanup:', error.message);
  } finally {
    await pool.end();
  }
}

cleanupDuplicates(); 