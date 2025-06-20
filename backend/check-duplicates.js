const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'MAMS',
  user: 'postgres',
  password: 'root'
});

async function checkDuplicates() {
  try {
    const client = await pool.connect();
    
    // Check for duplicate personnel by name
    const duplicateNames = await client.query(`
      SELECT first_name, last_name, COUNT(*) as count
      FROM personnel
      GROUP BY first_name, last_name
      HAVING COUNT(*) > 1
      ORDER BY count DESC
    `);
    
    console.log('Duplicate personnel names:');
    if (duplicateNames.rows.length > 0) {
      duplicateNames.rows.forEach(row => {
        console.log(`- ${row.first_name} ${row.last_name}: ${row.count} records`);
      });
    } else {
      console.log('No duplicate names found');
    }
    
    // Check total personnel count
    const totalCount = await client.query('SELECT COUNT(*) as count FROM personnel');
    console.log(`\nTotal personnel records: ${totalCount.rows[0].count}`);
    
    // Show sample personnel records
    const samplePersonnel = await client.query(`
      SELECT id, first_name, last_name, rank, email, department
      FROM personnel
      ORDER BY first_name, last_name
      LIMIT 10
    `);
    
    console.log('\nSample personnel records:');
    samplePersonnel.rows.forEach((person, index) => {
      console.log(`${index + 1}. ${person.first_name} ${person.last_name} (${person.rank}) - ${person.email}`);
    });
    
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await pool.end();
  }
}

checkDuplicates(); 