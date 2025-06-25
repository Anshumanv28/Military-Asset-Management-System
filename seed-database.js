const { Pool } = require('pg');
const bcrypt = require('bcryptjs');

// Replace this with your Supabase connection string
// Go to Supabase Dashboard → Settings → Database → Connection string (URI format)
// It should look like: postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
const DATABASE_URL = 'postgresql://postgres:WxmiAIhf%23gp7Mst@db.uzhljidxxcumibwgsbti.supabase.co:5432/postgres';

const pool = new Pool({
  connectionString: DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const seedDatabase = async () => {
  try {
    console.log('🚀 Starting database seeding...');
    
    // Test connection
    await pool.query('SELECT NOW()');
    console.log('✅ Database connection successful');

    const adminPassword = await bcrypt.hash('admin123', 10);
    
    // Create admin user
    try {
      await pool.query(`
        INSERT INTO users (username, email, password_hash, first_name, last_name, role)
        VALUES ($1, $2, $3, $4, $5, $6)
        ON CONFLICT (username) DO UPDATE SET 
          email = EXCLUDED.email,
          password_hash = EXCLUDED.password_hash,
          first_name = EXCLUDED.first_name,
          last_name = EXCLUDED.last_name,
          role = EXCLUDED.role
        RETURNING id
      `, ['admin', 'admin@military.gov', adminPassword, 'System', 'Administrator', 'admin']);
      console.log('✅ Admin user created/updated');
    } catch (error) {
      console.log('ℹ️ Admin user already exists');
    }

    // Create bases
    const bases = [
      { name: 'Task Force 141 Base', code: 'TF141', location: 'Classified Location' },
      { name: 'Shadow Company HQ', code: 'SHADOW', location: 'Undisclosed Location' },
      { name: 'Los Vaqueros Compound', code: 'VAQUEROS', location: 'Mexico' },
      { name: 'KorTac Facility', code: 'KORTAC', location: 'United Kingdom' }
    ];

    const baseIds = [];
    for (const base of bases) {
      const result = await pool.query(`
        INSERT INTO bases (name, code, location)
        VALUES ($1, $2, $3)
        ON CONFLICT (code) DO UPDATE SET name = EXCLUDED.name, location = EXCLUDED.location
        RETURNING id
      `, [base.name, base.code, base.location]);
      
      baseIds.push(result.rows[0].id);
      console.log(`✅ Base created: ${base.name}`);
    }

    // Create commanders and logistics officers
    const commanders = [
      { username: 'price', email: 'price@tf141.gov', first_name: 'John', last_name: 'Price', role: 'base_commander', base_id: baseIds[0] },
      { username: 'graves', email: 'graves@shadow.gov', first_name: 'Phillip', last_name: 'Graves', role: 'base_commander', base_id: baseIds[1] },
      { username: 'vargas', email: 'vargas@vaqueros.gov', first_name: 'Alejandro', last_name: 'Vargas', role: 'base_commander', base_id: baseIds[2] },
      { username: 'woods', email: 'woods@kortac.gov', first_name: 'Frank', last_name: 'Woods', role: 'base_commander', base_id: baseIds[3] }
    ];

    const logisticsOfficers = [
      { username: 'laswell', email: 'laswell@tf141.gov', first_name: 'Kate', last_name: 'Laswell', role: 'logistics_officer', base_id: baseIds[0] },
      { username: 'keller', email: 'keller@shadow.gov', first_name: 'Alex', last_name: 'Keller', role: 'logistics_officer', base_id: baseIds[1] },
      { username: 'santiago', email: 'santiago@vaqueros.gov', first_name: 'Dominic', last_name: 'Santiago', role: 'logistics_officer', base_id: baseIds[2] },
      { username: 'mason', email: 'mason@kortac.gov', first_name: 'Alex', last_name: 'Mason', role: 'logistics_officer', base_id: baseIds[3] }
    ];

    const allUsers = [...commanders, ...logisticsOfficers];
    const userIds = [];

    for (const user of allUsers) {
      const password = await bcrypt.hash('password123', 10);
      const result = await pool.query(`
        INSERT INTO users (username, email, password_hash, first_name, last_name, role, base_id)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        ON CONFLICT (username) DO UPDATE SET 
          email = EXCLUDED.email, 
          password_hash = EXCLUDED.password_hash,
          first_name = EXCLUDED.first_name,
          last_name = EXCLUDED.last_name,
          role = EXCLUDED.role,
          base_id = EXCLUDED.base_id
        RETURNING id
      `, [user.username, user.email, password, user.first_name, user.last_name, user.role, user.base_id]);
      
      userIds.push(result.rows[0].id);
      console.log(`✅ User created: ${user.username} (${user.role})`);
    }

    // Update base commanders
    for (let i = 0; i < baseIds.length; i++) {
      await pool.query(`
        UPDATE bases SET commander_id = $1 WHERE id = $2
      `, [userIds[i], baseIds[i]]);
    }
    console.log('✅ Base commanders assigned');

    // Create personnel
    const personnel = [
      // Task Force 141 Personnel
      { first_name: 'John', last_name: 'Price', rank: 'Captain', base_id: baseIds[0], email: 'jprice@tf141.gov', department: 'Special Operations' },
      { first_name: 'John', last_name: 'MacTavish', rank: 'Sergeant', base_id: baseIds[0], email: 'jmactavish@tf141.gov', department: 'Infantry' },
      { first_name: 'Simon', last_name: 'Riley', rank: 'Lieutenant', base_id: baseIds[0], email: 'sriley@tf141.gov', department: 'Intelligence' },
      { first_name: 'Kyle', last_name: 'Garrick', rank: 'Sergeant', base_id: baseIds[0], email: 'kgarrick@tf141.gov', department: 'Logistics' },
      { first_name: 'Kate', last_name: 'Laswell', rank: 'Commander', base_id: baseIds[0], email: 'klaswell@tf141.gov', department: 'Command' },
      
      // Shadow Company Personnel
      { first_name: 'Phillip', last_name: 'Graves', rank: 'Commander', base_id: baseIds[1], email: 'pgraves@shadow.gov', department: 'Command' },
      { first_name: 'Alex', last_name: 'Keller', rank: 'Sergeant', base_id: baseIds[1], email: 'akeller@shadow.gov', department: 'Infantry' },
      { first_name: 'Farah', last_name: 'Karim', rank: 'Lieutenant', base_id: baseIds[1], email: 'fkarim@shadow.gov', department: 'Intelligence' },
      { first_name: 'Nikto', last_name: 'Unknown', rank: 'Specialist', base_id: baseIds[1], email: 'nikto@shadow.gov', department: 'Special Operations' },
      { first_name: 'Rorke', last_name: 'Unknown', rank: 'Captain', base_id: baseIds[1], email: 'rorke@shadow.gov', department: 'Tactical' },
      
      // Los Vaqueros Personnel
      { first_name: 'Alejandro', last_name: 'Vargas', rank: 'Colonel', base_id: baseIds[2], email: 'avargas@vaqueros.gov', department: 'Command' },
      { first_name: 'Rudy', last_name: 'Parra', rank: 'Sergeant', base_id: baseIds[2], email: 'rparra@vaqueros.gov', department: 'Infantry' },
      { first_name: 'Valeria', last_name: 'Garza', rank: 'Lieutenant', base_id: baseIds[2], email: 'vgarza@vaqueros.gov', department: 'Intelligence' },
      { first_name: 'Marcus', last_name: 'Fenix', rank: 'Captain', base_id: baseIds[2], email: 'mfenix@vaqueros.gov', department: 'Special Operations' },
      { first_name: 'Dominic', last_name: 'Santiago', rank: 'Sergeant', base_id: baseIds[2], email: 'dsantiago@vaqueros.gov', department: 'Logistics' },
      
      // KorTac Personnel
      { first_name: 'Logan', last_name: 'Walker', rank: 'Sergeant', base_id: baseIds[3], email: 'lwalker@kortac.gov', department: 'Infantry' },
      { first_name: 'Hesh', last_name: 'Walker', rank: 'Corporal', base_id: baseIds[3], email: 'hwalker@kortac.gov', department: 'Logistics' },
      { first_name: 'Elias', last_name: 'Walker', rank: 'Lieutenant', base_id: baseIds[3], email: 'ewalker@kortac.gov', department: 'Armor' },
      { first_name: 'Frank', last_name: 'Woods', rank: 'Captain', base_id: baseIds[3], email: 'fwoods@kortac.gov', department: 'Engineering' },
      { first_name: 'Alex', last_name: 'Mason', rank: 'Staff Sergeant', base_id: baseIds[3], email: 'amason@kortac.gov', department: 'Intelligence' }
    ];

    for (const person of personnel) {
      await pool.query(`
        INSERT INTO personnel (first_name, last_name, rank, base_id, email, department)
        VALUES ($1, $2, $3, $4, $5, $6)
        ON CONFLICT (first_name, last_name, email) DO UPDATE SET 
          rank = EXCLUDED.rank,
          base_id = EXCLUDED.base_id,
          department = EXCLUDED.department
      `, [person.first_name, person.last_name, person.rank, person.base_id, person.email, person.department]);
    }
    console.log(`✅ ${personnel.length} personnel created`);

    // Create assets
    const assetNames = [
      'M4 Carbine', '9mm Ammunition', 'HMMWV', 'Night Vision Goggles', 'Body Armor',
      '5.56mm Ammunition', 'M249 SAW', 'M240 Machine Gun', 'M2 Browning', '7.62mm Ammunition',
      '.50 Cal Ammunition', 'M1A2 Abrams', 'M2 Bradley', 'UH-60 Black Hawk', 'AH-64 Apache',
      'Combat Helmet', 'Tactical Vest', 'Radio Equipment', 'Medical Kit', 'Rations'
    ];

    const initialAssets = [];
    
    for (let baseIndex = 0; baseIndex < baseIds.length; baseIndex++) {
      const baseId = baseIds[baseIndex];
      const multiplier = baseIndex === 0 ? 1.5 : 1.0; // Fort Bragg gets more assets
      
      initialAssets.push(
        // Weapons
        { name: assetNames[0], base_id: baseId, quantity: Math.floor(3000 * multiplier), available_quantity: Math.floor(2400 * multiplier), assigned_quantity: Math.floor(600 * multiplier) },
        { name: assetNames[6], base_id: baseId, quantity: Math.floor(1500 * multiplier), available_quantity: Math.floor(1200 * multiplier), assigned_quantity: Math.floor(300 * multiplier) },
        { name: assetNames[7], base_id: baseId, quantity: Math.floor(1000 * multiplier), available_quantity: Math.floor(800 * multiplier), assigned_quantity: Math.floor(200 * multiplier) },
        { name: assetNames[8], base_id: baseId, quantity: Math.floor(800 * multiplier), available_quantity: Math.floor(600 * multiplier), assigned_quantity: Math.floor(200 * multiplier) },
        
        // Ammunition
        { name: assetNames[1], base_id: baseId, quantity: Math.floor(4000 * multiplier), available_quantity: Math.floor(3600 * multiplier), assigned_quantity: Math.floor(400 * multiplier) },
        { name: assetNames[5], base_id: baseId, quantity: Math.floor(4500 * multiplier), available_quantity: Math.floor(4050 * multiplier), assigned_quantity: Math.floor(450 * multiplier) },
        { name: assetNames[9], base_id: baseId, quantity: Math.floor(3500 * multiplier), available_quantity: Math.floor(3150 * multiplier), assigned_quantity: Math.floor(350 * multiplier) },
        { name: assetNames[10], base_id: baseId, quantity: Math.floor(2000 * multiplier), available_quantity: Math.floor(1800 * multiplier), assigned_quantity: Math.floor(200 * multiplier) },
        
        // Vehicles
        { name: assetNames[2], base_id: baseId, quantity: Math.floor(2500 * multiplier), available_quantity: Math.floor(1875 * multiplier), assigned_quantity: Math.floor(625 * multiplier) },
        { name: assetNames[11], base_id: baseId, quantity: Math.floor(1200 * multiplier), available_quantity: Math.floor(960 * multiplier), assigned_quantity: Math.floor(240 * multiplier) },
        { name: assetNames[12], base_id: baseId, quantity: Math.floor(1800 * multiplier), available_quantity: Math.floor(1440 * multiplier), assigned_quantity: Math.floor(360 * multiplier) },
        { name: assetNames[13], base_id: baseId, quantity: Math.floor(800 * multiplier), available_quantity: Math.floor(600 * multiplier), assigned_quantity: Math.floor(200 * multiplier) },
        { name: assetNames[14], base_id: baseId, quantity: Math.floor(600 * multiplier), available_quantity: Math.floor(480 * multiplier), assigned_quantity: Math.floor(120 * multiplier) },
        
        // Equipment
        { name: assetNames[3], base_id: baseId, quantity: Math.floor(3500 * multiplier), available_quantity: Math.floor(2925 * multiplier), assigned_quantity: Math.floor(575 * multiplier) },
        { name: assetNames[4], base_id: baseId, quantity: Math.floor(4000 * multiplier), available_quantity: Math.floor(3200 * multiplier), assigned_quantity: Math.floor(800 * multiplier) },
        { name: assetNames[15], base_id: baseId, quantity: Math.floor(4500 * multiplier), available_quantity: Math.floor(3750 * multiplier), assigned_quantity: Math.floor(750 * multiplier) },
        { name: assetNames[16], base_id: baseId, quantity: Math.floor(3000 * multiplier), available_quantity: Math.floor(2625 * multiplier), assigned_quantity: Math.floor(375 * multiplier) },
        { name: assetNames[17], base_id: baseId, quantity: Math.floor(2500 * multiplier), available_quantity: Math.floor(2250 * multiplier), assigned_quantity: Math.floor(250 * multiplier) },
        { name: assetNames[18], base_id: baseId, quantity: Math.floor(2000 * multiplier), available_quantity: Math.floor(1600 * multiplier), assigned_quantity: Math.floor(400 * multiplier) },
        { name: assetNames[19], base_id: baseId, quantity: Math.floor(5000 * multiplier), available_quantity: Math.floor(4500 * multiplier), assigned_quantity: Math.floor(500 * multiplier) }
      );
    }

    for (const asset of initialAssets) {
      if (asset.name && asset.base_id) {
        await pool.query(`
          INSERT INTO assets (name, base_id, quantity, available_quantity, assigned_quantity)
          VALUES ($1, $2, $3, $4, $5)
          ON CONFLICT (name, base_id) DO UPDATE SET 
            quantity = EXCLUDED.quantity,
            available_quantity = EXCLUDED.available_quantity,
            assigned_quantity = EXCLUDED.assigned_quantity
        `, [asset.name, asset.base_id, asset.quantity, asset.available_quantity, asset.assigned_quantity]);
      }
    }
    console.log(`✅ ${initialAssets.length} assets created across all bases`);

    console.log('\n🎉 Database seeding completed successfully!');
    console.log('\n📋 Login Credentials:');
    console.log('Admin: admin@military.gov / admin123');
    console.log('Base Commanders: price@tf141.gov, graves@shadow.gov, vargas@vaqueros.gov, woods@kortac.gov / password123');
    console.log('Logistics Officers: laswell@tf141.gov, keller@shadow.gov, santiago@vaqueros.gov, mason@kortac.gov / password123');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  } finally {
    await pool.end();
  }
};

// Run the seeding
seedDatabase()
  .then(() => {
    console.log('✅ Seeding completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }); 