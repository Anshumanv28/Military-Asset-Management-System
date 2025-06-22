import { query, testConnection } from './src/database/connection';

const checkAssignmentsTable = async () => {
  try {
    await testConnection();
    console.log('✅ Database connection successful');

    // Check assignments table structure
    const result = await query(`
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns
      WHERE table_name = 'assignments'
      ORDER BY ordinal_position;
    `);

    console.log('\n📋 Assignments table structure:');
    console.table(result.rows);

    // Check if personnel_id column exists
    const personnelIdExists = result.rows.some((row: any) => row.column_name === 'personnel_id');
    console.log(`\n🔍 personnel_id column exists: ${personnelIdExists}`);

    // Check if assigned_to column exists
    const assignedToExists = result.rows.some((row: any) => row.column_name === 'assigned_to');
    console.log(`🔍 assigned_to column exists: ${assignedToExists}`);

    if (!personnelIdExists && !assignedToExists) {
      console.log('\n❌ Neither personnel_id nor assigned_to column exists!');
      console.log('Available columns:', result.rows.map((row: any) => row.column_name).join(', '));
    }

  } catch (error) {
    console.error('❌ Error checking assignments table:', error);
  } finally {
    process.exit(0);
  }
};

checkAssignmentsTable(); 