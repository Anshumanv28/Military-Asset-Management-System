const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'MAMS',
  user: 'postgres',
  password: 'root'
});

async function verifyConstraint() {
  try {
    const client = await pool.connect();
    
    console.log('Verifying personnel unique constraint...');
    
    // Check if the constraint exists
    const constraintResult = await client.query(`
      SELECT constraint_name, constraint_type
      FROM information_schema.table_constraints 
      WHERE table_name = 'personnel' 
      AND constraint_name = 'personnel_unique_name_email'
    `);
    
    if (constraintResult.rows.length > 0) {
      console.log('✅ Unique constraint found:');
      console.log(`   - Name: ${constraintResult.rows[0].constraint_name}`);
      console.log(`   - Type: ${constraintResult.rows[0].constraint_type}`);
      
      // Get the constraint details
      const constraintDetails = await client.query(`
        SELECT column_name
        FROM information_schema.key_column_usage
        WHERE table_name = 'personnel' 
        AND constraint_name = 'personnel_unique_name_email'
        ORDER BY ordinal_position
      `);
      
      console.log('   - Columns:', constraintDetails.rows.map(row => row.column_name).join(', '));
      
    } else {
      console.log('❌ Unique constraint not found');
    }
    
    // Test the constraint by trying to insert a duplicate
    console.log('\nTesting constraint with duplicate data...');
    
    try {
      await client.query(`
        INSERT INTO personnel (first_name, last_name, rank, base_id, email, department)
        VALUES ('Test', 'Duplicate', 'Private', '00000000-0000-0000-0000-000000000000', 'test@military.gov', 'Test')
      `);
      
      // If we get here, the insert succeeded (no constraint violation)
      console.log('⚠️  Warning: Duplicate insert succeeded - constraint may not be working');
      
      // Clean up the test record
      await client.query(`
        DELETE FROM personnel 
        WHERE first_name = 'Test' AND last_name = 'Duplicate' AND email = 'test@military.gov'
      `);
      
    } catch (error) {
      if (error.code === '23505') { // Unique violation error code
        console.log('✅ Constraint working correctly - duplicate insert blocked');
      } else {
        console.log('❌ Unexpected error:', error.message);
      }
    }
    
    console.log('\n🎉 Personnel unique constraint verification completed!');
    
  } catch (error) {
    console.error('Error during verification:', error.message);
  } finally {
    await pool.end();
  }
}

verifyConstraint(); 