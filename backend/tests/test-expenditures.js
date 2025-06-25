const axios = require('axios');

const BASE_URL = 'http://localhost:3001/api';
let authToken = '';
let testExpenditureId = '';
let testAssetId = '';
let testBaseId = '';

// Test data
const testExpenditure = {
  asset_name: 'Test Asset for Expenditure',
  base_id: '',
  quantity: 5,
  expenditure_date: '2024-01-15',
  reason: 'Training exercise',
  notes: 'Test expenditure for migration'
};

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
      testExpenditure.base_id = testBaseId;
      console.log(`✅ Found test base: ${testBaseId}`);
    }
    
    // Check if test asset exists, create if not
    const assetsResponse = await axios.get(`${BASE_URL}/assets?limit=10`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    
    let testAsset = assetsResponse.data.data.find(asset => 
      asset.name === testExpenditure.asset_name && asset.base_id === testBaseId
    );
    
    if (!testAsset) {
      console.log('⚠️  Test asset not found, creating one...');
      const assetResponse = await axios.post(`${BASE_URL}/assets`, {
        name: testExpenditure.asset_name,
        base_id: testBaseId,
        quantity: 20,
        available_quantity: 20,
        assigned_quantity: 0,
        status: 'available'
      }, {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      
      testAsset = assetResponse.data.data;
      console.log(`✅ Created test asset: ${testAsset.id}`);
    } else {
      console.log(`✅ Found test asset: ${testAsset.id}`);
    }
    
    testAssetId = testAsset.id;
    
    return true;
  } catch (error) {
    console.error('❌ Failed to get test data:', error.response?.data || error.message);
    return false;
  }
}

async function testGetExpenditures() {
  try {
    console.log('\n📋 Testing GET /expenditures...');
    
    const response = await axios.get(`${BASE_URL}/expenditures`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    
    console.log('✅ Get expenditures successful');
    console.log(`📊 Found ${response.data.data.length} expenditures`);
    console.log(`📄 Pagination: ${response.data.pagination.page}/${response.data.pagination.totalPages}`);
    
    return true;
  } catch (error) {
    console.error('❌ Get expenditures failed:', error.response?.data || error.message);
    return false;
  }
}

async function testGetExpendituresWithFilters() {
  try {
    console.log('\n🔍 Testing GET /expenditures with filters...');
    
    const response = await axios.get(`${BASE_URL}/expenditures?base_id=${testBaseId}&page=1&limit=5`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    
    console.log('✅ Get expenditures with filters successful');
    console.log(`📊 Found ${response.data.data.length} filtered expenditures`);
    
    return true;
  } catch (error) {
    console.error('❌ Get expenditures with filters failed:', error.response?.data || error.message);
    return false;
  }
}

async function testCreateExpenditure() {
  try {
    console.log('\n➕ Testing POST /expenditures...');
    
    const response = await axios.post(`${BASE_URL}/expenditures`, testExpenditure, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    
    testExpenditureId = response.data.data.id;
    console.log('✅ Create expenditure successful');
    console.log(`🆔 Created expenditure ID: ${testExpenditureId}`);
    console.log(`📊 Quantity: ${response.data.data.quantity}`);
    console.log(`📝 Reason: ${response.data.data.reason}`);
    
    // Check if asset inventory was updated
    const assetsResponse = await axios.get(`${BASE_URL}/assets?limit=10`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    
    const updatedAsset = assetsResponse.data.data.find(asset => asset.id === testAssetId);
    if (updatedAsset) {
      console.log(`📦 Asset inventory updated - Available: ${updatedAsset.available_quantity}`);
    }
    
    return true;
  } catch (error) {
    console.error('❌ Create expenditure failed:', error.response?.data || error.message);
    return false;
  }
}

async function testUpdateExpenditure() {
  try {
    console.log('\n✏️  Testing PUT /expenditures/:id...');
    
    const updateData = {
      quantity: 3,
      reason: 'Updated training exercise',
      notes: 'Updated test expenditure'
    };
    
    const response = await axios.put(`${BASE_URL}/expenditures/${testExpenditureId}`, updateData, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    
    console.log('✅ Update expenditure successful');
    console.log(`📊 Updated quantity: ${response.data.data.quantity}`);
    console.log(`📝 Updated reason: ${response.data.data.reason}`);
    console.log(`📝 Updated notes: ${response.data.data.notes}`);
    
    // Check if asset inventory was adjusted
    const assetsResponse = await axios.get(`${BASE_URL}/assets?limit=10`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    
    const updatedAsset = assetsResponse.data.data.find(asset => asset.id === testAssetId);
    if (updatedAsset) {
      console.log(`📦 Asset inventory adjusted - Available: ${updatedAsset.available_quantity}`);
    }
    
    return true;
  } catch (error) {
    console.error('❌ Update expenditure failed:', error.response?.data || error.message);
    return false;
  }
}

async function testCreateAnotherExpenditure() {
  try {
    console.log('\n➕ Creating another expenditure for deletion test...');
    
    const anotherExpenditure = {
      ...testExpenditure,
      quantity: 2,
      reason: 'Equipment maintenance',
      notes: 'Expenditure for deletion test'
    };
    
    const response = await axios.post(`${BASE_URL}/expenditures`, anotherExpenditure, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    
    const deleteExpenditureId = response.data.data.id;
    console.log(`✅ Created expenditure for deletion: ${deleteExpenditureId}`);
    
    // Test deletion
    console.log('\n🗑️  Testing DELETE /expenditures/:id...');
    const deleteResponse = await axios.delete(`${BASE_URL}/expenditures/${deleteExpenditureId}`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    
    console.log('✅ Delete expenditure successful');
    console.log(`💬 Message: ${deleteResponse.data.message}`);
    
    // Check if asset inventory was restored
    const assetsResponse = await axios.get(`${BASE_URL}/assets?limit=10`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    
    const restoredAsset = assetsResponse.data.data.find(asset => asset.id === testAssetId);
    if (restoredAsset) {
      console.log(`📦 Asset inventory restored - Available: ${restoredAsset.available_quantity}`);
    }
    
    return true;
  } catch (error) {
    console.error('❌ Create/delete expenditure failed:', error.response?.data || error.message);
    return false;
  }
}

async function testErrorHandling() {
  try {
    console.log('\n🚨 Testing error handling...');
    
    // Test invalid expenditure ID
    try {
      await axios.get(`${BASE_URL}/expenditures/invalid-id`, {
        headers: { Authorization: `Bearer ${authToken}` }
      });
    } catch (error) {
      if (error.response?.status === 404) {
        console.log('✅ 404 error handling works for invalid ID');
      }
    }
    
    // Test creating expenditure with insufficient inventory
    try {
      await axios.post(`${BASE_URL}/expenditures`, {
        ...testExpenditure,
        quantity: 1000 // More than available
      }, {
        headers: { Authorization: `Bearer ${authToken}` }
      });
    } catch (error) {
      if (error.response?.status === 400) {
        console.log('✅ 400 error handling works for insufficient inventory');
      }
    }
    
    // Test creating expenditure with invalid data
    try {
      await axios.post(`${BASE_URL}/expenditures`, {
        asset_name: '',
        base_id: 'invalid-base-id',
        quantity: -1,
        expenditure_date: 'invalid-date'
      }, {
        headers: { Authorization: `Bearer ${authToken}` }
      });
    } catch (error) {
      if (error.response?.status === 400) {
        console.log('✅ 400 error handling works for invalid data');
      }
    }
    
    return true;
  } catch (error) {
    console.error('❌ Error handling test failed:', error.response?.data || error.message);
    return false;
  }
}

async function testInventoryManagement() {
  try {
    console.log('\n📦 Testing inventory management...');
    
    // Get current asset inventory
    const assetsResponse = await axios.get(`${BASE_URL}/assets?limit=10`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    
    const asset = assetsResponse.data.data.find(a => a.id === testAssetId);
    if (asset) {
      console.log(`📊 Current asset inventory:`);
      console.log(`   - Total quantity: ${asset.quantity}`);
      console.log(`   - Available quantity: ${asset.available_quantity}`);
      console.log(`   - Assigned quantity: ${asset.assigned_quantity}`);
      console.log(`   - Status: ${asset.status}`);
    }
    
    // Create a small expenditure to test status changes
    const smallExpenditure = {
      ...testExpenditure,
      quantity: 1,
      reason: 'Status test',
      notes: 'Testing inventory status changes'
    };
    
    const response = await axios.post(`${BASE_URL}/expenditures`, smallExpenditure, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    
    console.log(`✅ Created test expenditure: ${response.data.data.id}`);
    
    // Check updated inventory
    const updatedAssetsResponse = await axios.get(`${BASE_URL}/assets?limit=10`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    
    const updatedAsset = updatedAssetsResponse.data.data.find(a => a.id === testAssetId);
    if (updatedAsset) {
      console.log(`📊 Updated asset inventory:`);
      console.log(`   - Total quantity: ${updatedAsset.quantity}`);
      console.log(`   - Available quantity: ${updatedAsset.available_quantity}`);
      console.log(`   - Status: ${updatedAsset.status}`);
    }
    
    return true;
  } catch (error) {
    console.error('❌ Inventory management test failed:', error.response?.data || error.message);
    return false;
  }
}

async function runAllTests() {
  console.log('🚀 Starting Expenditures Route Tests...\n');
  
  const tests = [
    { name: 'Login', fn: login },
    { name: 'Get Test Data', fn: getTestData },
    { name: 'Get Expenditures', fn: testGetExpenditures },
    { name: 'Get Expenditures with Filters', fn: testGetExpendituresWithFilters },
    { name: 'Create Expenditure', fn: testCreateExpenditure },
    { name: 'Update Expenditure', fn: testUpdateExpenditure },
    { name: 'Create and Delete Expenditure', fn: testCreateAnotherExpenditure },
    { name: 'Inventory Management', fn: testInventoryManagement },
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
    console.log('\n🎉 All tests passed! Expenditures route migration successful!');
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
  testGetExpenditures,
  testCreateExpenditure,
  testUpdateExpenditure,
  testCreateAnotherExpenditure
}; 