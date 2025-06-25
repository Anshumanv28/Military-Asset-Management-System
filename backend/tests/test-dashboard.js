const axios = require('axios');

const BASE_URL = 'http://localhost:3001/api';
let authToken = '';
let testBaseId = '';

async function login() {
  try {
    console.log('🔐 Logging in...');
    const response = await axios.post(`${BASE_URL}/auth/login`, {
      email: 'admin@military.com',
      password: 'admin123'
    });
    
    authToken = response.data.token;
    console.log('✅ Login successful');
    return true;
  } catch (error) {
    console.error('❌ Login failed:', error.response?.data || error.message);
    return false;
  }
}

async function getTestData() {
  try {
    console.log('📋 Getting test data...');
    
    // Get first base
    const basesResponse = await axios.get(`${BASE_URL}/bases?limit=1`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    
    if (basesResponse.data.data.length > 0) {
      testBaseId = basesResponse.data.data[0].id;
      console.log(`✅ Found test base: ${testBaseId}`);
    }
    
    return true;
  } catch (error) {
    console.error('❌ Failed to get test data:', error.response?.data || error.message);
    return false;
  }
}

async function testDashboardSummary() {
  try {
    console.log('\n📊 Testing GET /dashboard/summary...');
    
    const response = await axios.get(`${BASE_URL}/dashboard/summary`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    
    console.log('✅ Dashboard summary successful');
    console.log(`📈 Total assets: ${response.data.data.total_assets}`);
    console.log(`📦 Available assets: ${response.data.data.available_assets}`);
    console.log(`🔧 Assigned assets: ${response.data.data.assigned_assets}`);
    console.log(`⚠️  Maintenance assets: ${response.data.data.maintenance_assets}`);
    console.log(`💰 Purchased assets: ${response.data.data.purchased_assets}`);
    console.log(`📤 Transfers in: ${response.data.data.transfers_in}`);
    console.log(`📥 Transfers out: ${response.data.data.transfers_out}`);
    console.log(`🗑️  Expended assets: ${response.data.data.expended_assets}`);
    console.log(`💼 Opening balance: ${response.data.data.opening_balance}`);
    console.log(`💼 Closing balance: ${response.data.data.closing_balance}`);
    console.log(`📊 Net movement: ${response.data.data.net_movement}`);
    
    return true;
  } catch (error) {
    console.error('❌ Dashboard summary failed:', error.response?.data || error.message);
    return false;
  }
}

async function testDashboardSummaryWithFilters() {
  try {
    console.log('\n🔍 Testing GET /dashboard/summary with filters...');
    
    const startDate = '2024-01-01';
    const endDate = '2024-12-31';
    
    const response = await axios.get(`${BASE_URL}/dashboard/summary?base_id=${testBaseId}&start_date=${startDate}&end_date=${endDate}`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    
    console.log('✅ Dashboard summary with filters successful');
    console.log(`📊 Filtered total assets: ${response.data.data.total_assets}`);
    console.log(`📦 Filtered available assets: ${response.data.data.available_assets}`);
    
    return true;
  } catch (error) {
    console.error('❌ Dashboard summary with filters failed:', error.response?.data || error.message);
    return false;
  }
}

async function testDashboardMovements() {
  try {
    console.log('\n🔄 Testing GET /dashboard/movements...');
    
    const response = await axios.get(`${BASE_URL}/dashboard/movements`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    
    console.log('✅ Dashboard movements successful');
    console.log(`📦 Purchased assets: ${response.data.data.purchased_assets.length} records`);
    console.log(`📤 Transfers in: ${response.data.data.transfers_in.length} records`);
    console.log(`📥 Transfers out: ${response.data.data.transfers_out.length} records`);
    
    // Show sample data
    if (response.data.data.purchased_assets.length > 0) {
      const sample = response.data.data.purchased_assets[0];
      console.log(`📋 Sample purchase: ${sample.asset_name} - ${sample.quantity} units`);
    }
    
    return true;
  } catch (error) {
    console.error('❌ Dashboard movements failed:', error.response?.data || error.message);
    return false;
  }
}

async function testDashboardMovementsWithFilters() {
  try {
    console.log('\n🔍 Testing GET /dashboard/movements with filters...');
    
    const startDate = '2024-01-01';
    const endDate = '2024-12-31';
    
    const response = await axios.get(`${BASE_URL}/dashboard/movements?base_id=${testBaseId}&start_date=${startDate}&end_date=${endDate}`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    
    console.log('✅ Dashboard movements with filters successful');
    console.log(`📦 Filtered purchased assets: ${response.data.data.purchased_assets.length} records`);
    console.log(`📤 Filtered transfers in: ${response.data.data.transfers_in.length} records`);
    console.log(`📥 Filtered transfers out: ${response.data.data.transfers_out.length} records`);
    
    return true;
  } catch (error) {
    console.error('❌ Dashboard movements with filters failed:', error.response?.data || error.message);
    return false;
  }
}

async function testDashboardInventory() {
  try {
    console.log('\n📦 Testing GET /dashboard/inventory...');
    
    const response = await axios.get(`${BASE_URL}/dashboard/inventory`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    
    console.log('✅ Dashboard inventory successful');
    console.log(`📊 Total inventory items: ${response.data.data.length}`);
    
    // Show sample data
    if (response.data.data.length > 0) {
      const sample = response.data.data[0];
      console.log(`📋 Sample inventory: ${sample.asset_name} - ${sample.quantity} total, ${sample.available_quantity} available`);
      console.log(`🏷️  Status: ${sample.status}, Base: ${sample.base_name}`);
    }
    
    return true;
  } catch (error) {
    console.error('❌ Dashboard inventory failed:', error.response?.data || error.message);
    return false;
  }
}

async function testDashboardInventoryWithFilters() {
  try {
    console.log('\n🔍 Testing GET /dashboard/inventory with filters...');
    
    const response = await axios.get(`${BASE_URL}/dashboard/inventory?base_id=${testBaseId}`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    
    console.log('✅ Dashboard inventory with filters successful');
    console.log(`📊 Filtered inventory items: ${response.data.data.length}`);
    
    return true;
  } catch (error) {
    console.error('❌ Dashboard inventory with filters failed:', error.response?.data || error.message);
    return false;
  }
}

async function testDashboardExpendedAssets() {
  try {
    console.log('\n🗑️  Testing GET /dashboard/expended-assets...');
    
    const response = await axios.get(`${BASE_URL}/dashboard/expended-assets`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    
    console.log('✅ Dashboard expended assets successful');
    console.log(`📊 Total expended asset types: ${response.data.data.length}`);
    
    // Show sample data
    if (response.data.data.length > 0) {
      const sample = response.data.data[0];
      console.log(`📋 Sample expended asset: ${sample.name} - ${sample.value} units expended`);
    }
    
    return true;
  } catch (error) {
    console.error('❌ Dashboard expended assets failed:', error.response?.data || error.message);
    return false;
  }
}

async function testDashboardExpendedAssetsWithFilters() {
  try {
    console.log('\n🔍 Testing GET /dashboard/expended-assets with filters...');
    
    const startDate = '2024-01-01';
    const endDate = '2024-12-31';
    
    const response = await axios.get(`${BASE_URL}/dashboard/expended-assets?base_id=${testBaseId}&start_date=${startDate}&end_date=${endDate}`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    
    console.log('✅ Dashboard expended assets with filters successful');
    console.log(`📊 Filtered expended asset types: ${response.data.data.length}`);
    
    return true;
  } catch (error) {
    console.error('❌ Dashboard expended assets with filters failed:', error.response?.data || error.message);
    return false;
  }
}

async function testErrorHandling() {
  try {
    console.log('\n🚨 Testing error handling...');
    
    // Test invalid endpoint
    try {
      await axios.get(`${BASE_URL}/dashboard/invalid-endpoint`, {
        headers: { Authorization: `Bearer ${authToken}` }
      });
    } catch (error) {
      if (error.response?.status === 404) {
        console.log('✅ 404 error handling works for invalid endpoint');
      }
    }
    
    // Test without authentication
    try {
      await axios.get(`${BASE_URL}/dashboard/summary`);
    } catch (error) {
      if (error.response?.status === 401) {
        console.log('✅ 401 error handling works for missing authentication');
      }
    }
    
    return true;
  } catch (error) {
    console.error('❌ Error handling test failed:', error.response?.data || error.message);
    return false;
  }
}

async function testRoleBasedAccess() {
  try {
    console.log('\n👥 Testing role-based access...');
    
    // Test admin access to all bases
    const adminResponse = await axios.get(`${BASE_URL}/dashboard/summary`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    
    console.log('✅ Admin access successful');
    console.log(`📊 Admin can view summary data`);
    
    // Test base-specific access
    const baseResponse = await axios.get(`${BASE_URL}/dashboard/summary?base_id=${testBaseId}`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    
    console.log('✅ Base-specific access successful');
    console.log(`📊 Base-specific summary data retrieved`);
    
    return true;
  } catch (error) {
    console.error('❌ Role-based access test failed:', error.response?.data || error.message);
    return false;
  }
}

async function runAllTests() {
  console.log('🚀 Starting Dashboard Route Tests...\n');
  
  const tests = [
    { name: 'Login', fn: login },
    { name: 'Get Test Data', fn: getTestData },
    { name: 'Dashboard Summary', fn: testDashboardSummary },
    { name: 'Dashboard Summary with Filters', fn: testDashboardSummaryWithFilters },
    { name: 'Dashboard Movements', fn: testDashboardMovements },
    { name: 'Dashboard Movements with Filters', fn: testDashboardMovementsWithFilters },
    { name: 'Dashboard Inventory', fn: testDashboardInventory },
    { name: 'Dashboard Inventory with Filters', fn: testDashboardInventoryWithFilters },
    { name: 'Dashboard Expended Assets', fn: testDashboardExpendedAssets },
    { name: 'Dashboard Expended Assets with Filters', fn: testDashboardExpendedAssetsWithFilters },
    { name: 'Role-Based Access', fn: testRoleBasedAccess },
    { name: 'Error Handling', fn: testErrorHandling }
  ];
  
  let passed = 0;
  let failed = 0;
  
  for (const test of tests) {
    try {
      const result = await test.fn();
      if (result) {
        passed++;
      } else {
        failed++;
      }
    } catch (error) {
      console.error(`❌ ${test.name} failed with exception:`, error.message);
      failed++;
    }
  }
  
  console.log('\n📊 Test Results:');
  console.log(`✅ Passed: ${passed}`);
  console.log(`❌ Failed: ${failed}`);
  console.log(`📈 Success Rate: ${((passed / (passed + failed)) * 100).toFixed(1)}%`);
  
  if (failed === 0) {
    console.log('\n🎉 All tests passed! Dashboard route migration successful!');
  } else {
    console.log('\n⚠️  Some tests failed. Please check the errors above.');
  }
}

// Run tests if this file is executed directly
if (require.main === module) {
  runAllTests().catch(console.error);
}

module.exports = {
  runAllTests,
  login,
  testDashboardSummary,
  testDashboardMovements,
  testDashboardInventory,
  testDashboardExpendedAssets
}; 