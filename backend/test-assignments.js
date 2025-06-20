const { Pool } = require('pg');
const axios = require('axios');

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'MAMS',
  user: 'postgres',
  password: 'root'
});

async function checkAssignments() {
  try {
    const client = await pool.connect();
    
    // Check counts for all related tables
    const personnelResult = await client.query('SELECT COUNT(*) as count FROM personnel');
    const assetsResult = await client.query('SELECT COUNT(*) as count FROM assets');
    const assignmentsResult = await client.query('SELECT COUNT(*) as count FROM assignments');
    
    console.log('Database counts:');
    console.log('- Personnel:', personnelResult.rows[0].count);
    console.log('- Assets:', assetsResult.rows[0].count);
    console.log('- Assignments:', assignmentsResult.rows[0].count);
    
    if (assignmentsResult.rows[0].count > 0) {
      // Get sample assignments
      const assignmentsData = await client.query(`
        SELECT a.*, ast.name as asset_name, p.first_name, p.last_name, b.name as base_name
        FROM assignments a
        JOIN assets ast ON a.asset_id = ast.id
        JOIN personnel p ON a.assigned_to = p.id::text
        JOIN bases b ON a.base_id = b.id
        LIMIT 5
      `);
      
      console.log('\nSample assignments from database:');
      assignmentsData.rows.forEach((row, index) => {
        console.log(`${index + 1}. ${row.asset_name} assigned to ${row.first_name} ${row.last_name} at ${row.base_name} (${row.status})`);
      });
    }
    
    client.release();
    
    // Test API endpoint
    console.log('\n--- Testing API Endpoint ---');
    try {
      const apiResponse = await axios.get('http://localhost:3001/api/assignments?limit=1000');
      console.log('API Response Status:', apiResponse.status);
      console.log('API Response Data Length:', apiResponse.data.data?.length || 0);
      
      if (apiResponse.data.data && apiResponse.data.data.length > 0) {
        console.log('\nSample assignments from API:');
        apiResponse.data.data.slice(0, 3).forEach((assignment, index) => {
          console.log(`${index + 1}. ${assignment.asset_name} assigned to ${assignment.personnel_name} at ${assignment.base_name} (${assignment.status})`);
        });
      } else {
        console.log('No assignments returned from API');
      }
    } catch (apiError) {
      console.error('API Error:', apiError.response?.data || apiError.message);
    }
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await pool.end();
  }
}

checkAssignments(); 