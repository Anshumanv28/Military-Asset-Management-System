import bcrypt from 'bcryptjs';
import { query, testConnection } from './connection';
import { logger } from '../utils/logger';

const seedDatabase = async () => {
  try {
    // Test database connection
    await testConnection();
    
    logger.info('Starting database seeding...');

    // Create admin user
    const adminPassword = await bcrypt.hash('admin123', 10);
    let adminUserId;
    
    try {
      const adminUser = await query(`
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
      
      adminUserId = adminUser.rows[0].id;
    } catch (error) {
      // If admin user creation fails, try to get existing admin user
      const existingAdmin = await query(`
        SELECT id FROM users WHERE username = 'admin'
      `);
      adminUserId = existingAdmin.rows[0]?.id;
    }

    // Create sample bases
    const bases = [
      { name: 'Fort Bragg', code: 'FB', location: 'North Carolina, USA' },
      { name: 'Camp Pendleton', code: 'CP', location: 'California, USA' },
      { name: 'Fort Hood', code: 'FH', location: 'Texas, USA' },
      { name: 'Joint Base Lewis-McChord', code: 'JBLM', location: 'Washington, USA' }
    ];

    const baseIds = [];
    for (const base of bases) {
      const result = await query(`
        INSERT INTO bases (name, code, location)
        VALUES ($1, $2, $3)
        ON CONFLICT (code) DO UPDATE SET name = EXCLUDED.name, location = EXCLUDED.location
        RETURNING id
      `, [base.name, base.code, base.location]);
      
      baseIds.push(result.rows[0].id);
    }

    // Create sample users for each base
    const users = [
      { username: 'commander1', email: 'commander1@military.gov', first_name: 'John', last_name: 'Smith', role: 'base_commander', base_id: baseIds[0] },
      { username: 'commander2', email: 'commander2@military.gov', first_name: 'Sarah', last_name: 'Johnson', role: 'base_commander', base_id: baseIds[1] },
      { username: 'logistics1', email: 'logistics1@military.gov', first_name: 'Mike', last_name: 'Davis', role: 'logistics_officer', base_id: baseIds[0] },
      { username: 'logistics2', email: 'logistics2@military.gov', first_name: 'Lisa', last_name: 'Wilson', role: 'logistics_officer', base_id: baseIds[1] }
    ];

    for (const user of users) {
      const password = await bcrypt.hash('password123', 10);
      await query(`
        INSERT INTO users (username, email, password_hash, first_name, last_name, role, base_id)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        ON CONFLICT (username) DO UPDATE SET 
          email = EXCLUDED.email, 
          password_hash = EXCLUDED.password_hash,
          first_name = EXCLUDED.first_name,
          last_name = EXCLUDED.last_name,
          role = EXCLUDED.role,
          base_id = EXCLUDED.base_id
      `, [user.username, user.email, password, user.first_name, user.last_name, user.role, user.base_id]);
    }

    // Create sample personnel
    const personnel = [
      { first_name: 'James', last_name: 'Wilson', rank: 'Sergeant', base_id: baseIds[0], email: 'jwilson@military.gov', department: 'Infantry' },
      { first_name: 'Maria', last_name: 'Garcia', rank: 'Corporal', base_id: baseIds[0], email: 'mgarcia@military.gov', department: 'Logistics' },
      { first_name: 'Robert', last_name: 'Chen', rank: 'Lieutenant', base_id: baseIds[1], email: 'rchen@military.gov', department: 'Armor' },
      { first_name: 'Jennifer', last_name: 'Taylor', rank: 'Captain', base_id: baseIds[1], email: 'jtaylor@military.gov', department: 'Artillery' },
      { first_name: 'David', last_name: 'Brown', rank: 'Staff Sergeant', base_id: baseIds[2], email: 'dbrown@military.gov', department: 'Engineers' },
      { first_name: 'Amanda', last_name: 'Miller', rank: 'First Lieutenant', base_id: baseIds[2], email: 'amiller@military.gov', department: 'Medical' },
      { first_name: 'Christopher', last_name: 'Anderson', rank: 'Sergeant First Class', base_id: baseIds[3], email: 'canderson@military.gov', department: 'Military Police' },
      { first_name: 'Jessica', last_name: 'Thomas', rank: 'Major', base_id: baseIds[3], email: 'jthomas@military.gov', department: 'Intelligence' }
    ];

    const personnelIds = [];
    for (const person of personnel) {
      const result = await query(`
        INSERT INTO personnel (first_name, last_name, rank, base_id, email, department)
        VALUES ($1, $2, $3, $4, $5, $6)
        ON CONFLICT (first_name, last_name, email) DO UPDATE SET 
          rank = EXCLUDED.rank,
          base_id = EXCLUDED.base_id,
          department = EXCLUDED.department
        RETURNING id
      `, [person.first_name, person.last_name, person.rank, person.base_id, person.email, person.department]);
      
      if (result.rows[0]) {
        personnelIds.push(result.rows[0].id);
      }
    }

    // Create asset types
    const assetTypes = [
      { name: 'M4 Carbine', category: 'weapon', description: 'Standard issue rifle', unit_of_measure: 'units' },
      { name: '9mm Ammunition', category: 'ammunition', description: 'Standard pistol ammunition', unit_of_measure: 'rounds' },
      { name: 'HMMWV', category: 'vehicle', description: 'High Mobility Multipurpose Wheeled Vehicle', unit_of_measure: 'units' },
      { name: 'Night Vision Goggles', category: 'equipment', description: 'Night vision equipment', unit_of_measure: 'units' },
      { name: 'Body Armor', category: 'equipment', description: 'Personal protective equipment', unit_of_measure: 'units' },
      { name: '5.56mm Ammunition', category: 'ammunition', description: 'Rifle ammunition', unit_of_measure: 'rounds' }
    ];

    const assetTypeIds = [];
    for (const assetType of assetTypes) {
      const result = await query(`
        INSERT INTO asset_types (name, category, description, unit_of_measure)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (name) DO UPDATE SET 
          category = EXCLUDED.category,
          description = EXCLUDED.description,
          unit_of_measure = EXCLUDED.unit_of_measure
        RETURNING id
      `, [assetType.name, assetType.category, assetType.description, assetType.unit_of_measure]);
      
      assetTypeIds.push(result.rows[0].id);
    }

    // Create initial asset quantities for each base
    const initialAssets = [
      // Fort Bragg assets
      { asset_type_id: assetTypeIds[0], base_id: baseIds[0], quantity: 150, available_quantity: 120, assigned_quantity: 30 }, // M4 Carbines
      { asset_type_id: assetTypeIds[1], base_id: baseIds[0], quantity: 50000, available_quantity: 45000, assigned_quantity: 5000 }, // 9mm Ammo
      { asset_type_id: assetTypeIds[2], base_id: baseIds[0], quantity: 25, available_quantity: 20, assigned_quantity: 5 }, // HMMWVs
      { asset_type_id: assetTypeIds[3], base_id: baseIds[0], quantity: 200, available_quantity: 180, assigned_quantity: 20 }, // Night Vision
      { asset_type_id: assetTypeIds[4], base_id: baseIds[0], quantity: 300, available_quantity: 250, assigned_quantity: 50 }, // Body Armor
      { asset_type_id: assetTypeIds[5], base_id: baseIds[0], quantity: 100000, available_quantity: 90000, assigned_quantity: 10000 }, // 5.56mm Ammo
      
      // Camp Pendleton assets
      { asset_type_id: assetTypeIds[0], base_id: baseIds[1], quantity: 120, available_quantity: 100, assigned_quantity: 20 }, // M4 Carbines
      { asset_type_id: assetTypeIds[1], base_id: baseIds[1], quantity: 40000, available_quantity: 35000, assigned_quantity: 5000 }, // 9mm Ammo
      { asset_type_id: assetTypeIds[2], base_id: baseIds[1], quantity: 20, available_quantity: 15, assigned_quantity: 5 }, // HMMWVs
      { asset_type_id: assetTypeIds[3], base_id: baseIds[1], quantity: 150, available_quantity: 130, assigned_quantity: 20 }, // Night Vision
      { asset_type_id: assetTypeIds[4], base_id: baseIds[1], quantity: 250, available_quantity: 200, assigned_quantity: 50 }, // Body Armor
      { asset_type_id: assetTypeIds[5], base_id: baseIds[1], quantity: 80000, available_quantity: 70000, assigned_quantity: 10000 }, // 5.56mm Ammo
      
      // Fort Hood assets
      { asset_type_id: assetTypeIds[0], base_id: baseIds[2], quantity: 100, available_quantity: 80, assigned_quantity: 20 }, // M4 Carbines
      { asset_type_id: assetTypeIds[1], base_id: baseIds[2], quantity: 30000, available_quantity: 25000, assigned_quantity: 5000 }, // 9mm Ammo
      { asset_type_id: assetTypeIds[2], base_id: baseIds[2], quantity: 15, available_quantity: 12, assigned_quantity: 3 }, // HMMWVs
      { asset_type_id: assetTypeIds[3], base_id: baseIds[2], quantity: 100, available_quantity: 85, assigned_quantity: 15 }, // Night Vision
      { asset_type_id: assetTypeIds[4], base_id: baseIds[2], quantity: 200, available_quantity: 160, assigned_quantity: 40 }, // Body Armor
      { asset_type_id: assetTypeIds[5], base_id: baseIds[2], quantity: 60000, available_quantity: 50000, assigned_quantity: 10000 }, // 5.56mm Ammo
      
      // Joint Base Lewis-McChord assets
      { asset_type_id: assetTypeIds[0], base_id: baseIds[3], quantity: 80, available_quantity: 65, assigned_quantity: 15 }, // M4 Carbines
      { asset_type_id: assetTypeIds[1], base_id: baseIds[3], quantity: 25000, available_quantity: 20000, assigned_quantity: 5000 }, // 9mm Ammo
      { asset_type_id: assetTypeIds[2], base_id: baseIds[3], quantity: 12, available_quantity: 10, assigned_quantity: 2 }, // HMMWVs
      { asset_type_id: assetTypeIds[3], base_id: baseIds[3], quantity: 80, available_quantity: 70, assigned_quantity: 10 }, // Night Vision
      { asset_type_id: assetTypeIds[4], base_id: baseIds[3], quantity: 150, available_quantity: 120, assigned_quantity: 30 }, // Body Armor
      { asset_type_id: assetTypeIds[5], base_id: baseIds[3], quantity: 50000, available_quantity: 40000, assigned_quantity: 10000 }, // 5.56mm Ammo
    ];

    for (const asset of initialAssets) {
      if (asset.asset_type_id && asset.base_id) {
        await query(`
          INSERT INTO assets (asset_type_id, base_id, quantity, available_quantity, assigned_quantity)
          VALUES ($1, $2, $3, $4, $5)
          ON CONFLICT (asset_type_id, base_id) DO UPDATE SET 
            quantity = EXCLUDED.quantity,
            available_quantity = EXCLUDED.available_quantity,
            assigned_quantity = EXCLUDED.assigned_quantity
        `, [asset.asset_type_id, asset.base_id, asset.quantity, asset.available_quantity, asset.assigned_quantity]);
      }
    }

    // Create sample assignments
    const assignments = [
      { asset_type_id: assetTypeIds[0], assigned_to: personnelIds[0], base_id: baseIds[0], quantity: 1, assignment_date: '2024-01-15', status: 'active' },
      { asset_type_id: assetTypeIds[4], assigned_to: personnelIds[1], base_id: baseIds[0], quantity: 1, assignment_date: '2024-01-20', status: 'active' },
      { asset_type_id: assetTypeIds[2], assigned_to: personnelIds[2], base_id: baseIds[1], quantity: 1, assignment_date: '2024-02-01', status: 'active' },
      { asset_type_id: assetTypeIds[3], assigned_to: personnelIds[3], base_id: baseIds[1], quantity: 1, assignment_date: '2024-02-05', status: 'returned', return_date: '2024-02-15' }
    ];

    for (const assignment of assignments) {
      if (assignment.asset_type_id && assignment.assigned_to && assignment.base_id) {
        await query(`
          INSERT INTO assignments (asset_type_id, assigned_to, assigned_by, base_id, quantity, assignment_date, return_date, status)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        `, [
          assignment.asset_type_id,
          assignment.assigned_to,
          adminUserId || '00000000-0000-0000-0000-000000000000',
          assignment.base_id,
          assignment.quantity,
          assignment.assignment_date,
          assignment.return_date || null,
          assignment.status
        ]);
      }
    }

    // Create sample purchases (Create operations)
    const purchases = [
      { asset_type_id: assetTypeIds[1], base_id: baseIds[0], quantity: 1000, supplier: 'AmmoCorp', purchase_date: '2024-01-15' },
      { asset_type_id: assetTypeIds[5], base_id: baseIds[1], quantity: 2000, supplier: 'AmmoCorp', purchase_date: '2024-01-20' },
      { asset_type_id: assetTypeIds[4], base_id: baseIds[0], quantity: 50, supplier: 'ProtectGear', purchase_date: '2024-02-01' }
    ];

    for (const purchase of purchases) {
      if (purchase.asset_type_id && purchase.base_id) {
        await query(`
          INSERT INTO purchases (asset_type_id, base_id, quantity, supplier, purchase_date, created_by)
          VALUES ($1, $2, $3, $4, $5, $6)
        `, [
          purchase.asset_type_id,
          purchase.base_id,
          purchase.quantity,
          purchase.supplier,
          purchase.purchase_date,
          adminUserId || '00000000-0000-0000-0000-000000000000'
        ]);
      }
    }

    // Create sample transfers (Update operations)
    const transfers = [
      { 
        transfer_number: 'TR-001', 
        from_base_id: baseIds[0], 
        to_base_id: baseIds[1], 
        asset_type_id: assetTypeIds[1], 
        quantity: 500, 
        transfer_date: '2024-01-25',
        status: 'completed'
      },
      { 
        transfer_number: 'TR-002', 
        from_base_id: baseIds[1], 
        to_base_id: baseIds[2], 
        asset_type_id: assetTypeIds[3], 
        quantity: 10, 
        transfer_date: '2024-02-10',
        status: 'completed'
      }
    ];

    for (const transfer of transfers) {
      if (transfer.from_base_id && transfer.to_base_id && transfer.asset_type_id) {
        await query(`
          INSERT INTO transfers (transfer_number, from_base_id, to_base_id, asset_type_id, quantity, transfer_date, status, created_by)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        `, [
          transfer.transfer_number,
          transfer.from_base_id,
          transfer.to_base_id,
          transfer.asset_type_id,
          transfer.quantity,
          transfer.transfer_date,
          transfer.status,
          adminUserId || '00000000-0000-0000-0000-000000000000'
        ]);
      }
    }

    // Create sample expenditures (Delete operations)
    const expenditures = [
      { asset_type_id: assetTypeIds[1], base_id: baseIds[0], quantity: 100, expenditure_date: '2024-01-30', reason: 'Training exercise' },
      { asset_type_id: assetTypeIds[5], base_id: baseIds[1], quantity: 200, expenditure_date: '2024-02-15', reason: 'Range qualification' },
      { asset_type_id: assetTypeIds[4], base_id: baseIds[0], quantity: 5, expenditure_date: '2024-02-20', reason: 'Damaged in field training' }
    ];

    for (const expenditure of expenditures) {
      if (expenditure.asset_type_id && expenditure.base_id) {
        await query(`
          INSERT INTO expenditures (asset_type_id, base_id, quantity, expenditure_date, reason, created_by)
          VALUES ($1, $2, $3, $4, $5, $6)
        `, [
          expenditure.asset_type_id,
          expenditure.base_id,
          expenditure.quantity,
          expenditure.expenditure_date,
          expenditure.reason,
          adminUserId || '00000000-0000-0000-0000-000000000000'
        ]);
      }
    }

    logger.info('Database seeding completed successfully');
  } catch (error) {
    logger.error('Error seeding database:', error);
    throw error;
  }
};

export default seedDatabase;