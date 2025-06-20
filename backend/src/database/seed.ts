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
    const adminUser = await query(`
      INSERT INTO users (username, email, password_hash, first_name, last_name, role)
      VALUES ($1, $2, $3, $4, $5, $6)
      ON CONFLICT (username) DO NOTHING
      RETURNING id
    `, ['admin', 'admin@military.gov', adminPassword, 'System', 'Administrator', 'admin']);

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
        ON CONFLICT (code) DO NOTHING
        RETURNING id
      `, [base.name, base.code, base.location]);
      
      if (result.rows.length > 0) {
        baseIds.push(result.rows[0].id);
      }
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
        ON CONFLICT (username) DO NOTHING
      `, [user.username, user.email, password, user.first_name, user.last_name, user.role, user.base_id]);
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
        ON CONFLICT (name) DO NOTHING
        RETURNING id
      `, [assetType.name, assetType.category, assetType.description, assetType.unit_of_measure]);
      
      if (result.rows.length > 0) {
        assetTypeIds.push(result.rows[0].id);
      }
    }

    // Create sample assets
    const assets = [
      { asset_type_id: assetTypeIds[0], serial_number: 'M4-001', name: 'M4 Carbine #001', current_base_id: baseIds[0] },
      { asset_type_id: assetTypeIds[0], serial_number: 'M4-002', name: 'M4 Carbine #002', current_base_id: baseIds[0] },
      { asset_type_id: assetTypeIds[2], serial_number: 'HMMWV-001', name: 'HMMWV #001', current_base_id: baseIds[1] },
      { asset_type_id: assetTypeIds[3], serial_number: 'NVG-001', name: 'Night Vision Goggles #001', current_base_id: baseIds[0] }
    ];

    for (const asset of assets) {
      await query(`
        INSERT INTO assets (asset_type_id, serial_number, name, current_base_id)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (serial_number) DO NOTHING
      `, [asset.asset_type_id, asset.serial_number, asset.name, asset.current_base_id]);
    }

    // Create sample purchases
    const purchases = [
      { asset_type_id: assetTypeIds[1], base_id: baseIds[0], quantity: 1000, unit_cost: 0.50, supplier: 'AmmoCorp', purchase_date: '2024-01-15' },
      { asset_type_id: assetTypeIds[5], base_id: baseIds[1], quantity: 2000, unit_cost: 0.75, supplier: 'AmmoCorp', purchase_date: '2024-01-20' },
      { asset_type_id: assetTypeIds[4], base_id: baseIds[0], quantity: 50, unit_cost: 500.00, supplier: 'ProtectGear', purchase_date: '2024-02-01' }
    ];

    for (const purchase of purchases) {
      const total_cost = purchase.quantity * purchase.unit_cost;
      await query(`
        INSERT INTO purchases (asset_type_id, base_id, quantity, unit_cost, total_cost, supplier, purchase_date, created_by)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      `, [
        purchase.asset_type_id,
        purchase.base_id,
        purchase.quantity,
        purchase.unit_cost,
        total_cost,
        purchase.supplier,
        purchase.purchase_date,
        adminUser.rows[0]?.id || '00000000-0000-0000-0000-000000000000'
      ]);
    }

    // Create sample transfers
    const transfers = [
      { from_base_id: baseIds[0], to_base_id: baseIds[1], asset_type_id: assetTypeIds[1], quantity: 500, transfer_date: '2024-02-15', status: 'completed' },
      { from_base_id: baseIds[1], to_base_id: baseIds[0], asset_type_id: assetTypeIds[5], quantity: 1000, transfer_date: '2024-02-20', status: 'pending' }
    ];

    for (const transfer of transfers) {
      const transferNumber = `TRF-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      await query(`
        INSERT INTO transfers (transfer_number, from_base_id, to_base_id, asset_type_id, quantity, transfer_date, status, created_by)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      `, [
        transferNumber,
        transfer.from_base_id,
        transfer.to_base_id,
        transfer.asset_type_id,
        transfer.quantity,
        transfer.transfer_date,
        transfer.status,
        adminUser.rows[0]?.id || '00000000-0000-0000-0000-000000000000'
      ]);
    }

    // Create sample expenditures
    const expenditures = [
      { asset_type_id: assetTypeIds[1], base_id: baseIds[0], quantity: 100, reason: 'Training exercise', expenditure_date: '2024-02-10' },
      { asset_type_id: assetTypeIds[5], base_id: baseIds[1], quantity: 200, reason: 'Range qualification', expenditure_date: '2024-02-12' }
    ];

    for (const expenditure of expenditures) {
      await query(`
        INSERT INTO expenditures (asset_type_id, base_id, quantity, expenditure_date, reason, created_by)
        VALUES ($1, $2, $3, $4, $5, $6)
      `, [
        expenditure.asset_type_id,
        expenditure.base_id,
        expenditure.quantity,
        expenditure.expenditure_date,
        expenditure.reason,
        adminUser.rows[0]?.id || '00000000-0000-0000-0000-000000000000'
      ]);
    }

    logger.info('✅ Database seeding completed successfully');
    logger.info('📋 Sample data created:');
    logger.info('   - Admin user: admin / admin123');
    logger.info('   - Base commanders: commander1, commander2 / password123');
    logger.info('   - Logistics officers: logistics1, logistics2 / password123');
    logger.info('   - 4 military bases');
    logger.info('   - 6 asset types');
    logger.info('   - Sample assets, purchases, transfers, and expenditures');

  } catch (error) {
    logger.error('❌ Database seeding failed:', error);
    process.exit(1);
  }
};

// Run seeding if this file is executed directly
if (require.main === module) {
  seedDatabase();
}

export { seedDatabase }; 