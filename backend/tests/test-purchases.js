const axios = require('axios');

const BASE_URL = 'http://localhost:3001/api';
let authToken = '';
let testPurchaseId = '';
let testAssetId = '';
let testBaseId = '';

// Test data
const testPurchase = {
  asset_id: '',
  base_id: '',
  quantity: 10,
  supplier: 'Test Supplier',
  purchase_date: '2024-01-15',
  notes: 'Test purchase for migration'
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
    
    // Get first asset
    const assetsResponse = await axios.get(`${BASE_URL}/assets?limit=1`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    
    if (assetsResponse.data.data.length > 0) {
      testAssetId = assetsResponse.data.data[0].id;
      testPurchase.asset_id = testAssetId;
      console.log(`✅ Found test asset: ${testAssetId}`);
    } else {
      console.log('⚠️  No assets found, creating one...');
      // Create a test asset first
      const baseResponse = await axios.get(`${BASE_URL}/bases?limit=1`, {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      
      if (baseResponse.data.data.length > 0) {
        testBaseId = baseResponse.data.data[0].id;
        const assetResponse = await axios.post(`${BASE_URL}/assets`, {
          name: 'Test Asset for Purchase',
          base_id: testBaseId,
          quantity: 5,
          available_quantity: 5,
          assigned_quantity: 0,
          status: 'available'
        }, {
          headers: { Authorization: `Bearer ${authToken}` }
        });
        
        testAssetId = assetResponse.data.data.id;
        testPurchase.asset_id = testAssetId;
        console.log(`✅ Created test asset: ${testAssetId}`);
      }
    }
    
    // Get first base
    const basesResponse = await axios.get(`${BASE_URL}/bases?limit=1`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    
    if (basesResponse.data.data.length > 0) {
      testBaseId = basesResponse.data.data[0].id;
      testPurchase.base_id = testBaseId;
      console.log(`✅ Found test base: ${testBaseId}`);
    }
    
    return true;
  } catch (error) {
    console.error('❌ Failed to get test data:', error.response?.data || error.message);
    return false;
  }
}

async function testGetPurchases() {
  try {
    console.log('\n📋 Testing GET /purchases...');
    
    const response = await axios.get(`${BASE_URL}/purchases`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    
    console.log('✅ Get purchases successful');
    console.log(`📊 Found ${response.data.data.length} purchases`);
    console.log(`📄 Pagination: ${response.data.pagination.page}/${response.data.pagination.totalPages}`);
    
    return true;
  } catch (error) {
    console.error('❌ Get purchases failed:', error.response?.data || error.message);
    return false;
  }
}

async function testGetPurchasesWithFilters() {
  try {
    console.log('\n🔍 Testing GET /purchases with filters...');
    
    const response = await axios.get(`${BASE_URL}/purchases?base_id=${testBaseId}&page=1&limit=5`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    
    console.log('✅ Get purchases with filters successful');
    console.log(`📊 Found ${response.data.data.length} filtered purchases`);
    
    return true;
  } catch (error) {
    console.error('❌ Get purchases with filters failed:', error.response?.data || error.message);
    return false;
  }
}

async function testCreatePurchase() {
  try {
    console.log('\n➕ Testing POST /purchases...');
    
    const response = await axios.post(`${BASE_URL}/purchases`, testPurchase, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    
    testPurchaseId = response.data.data.id;
    console.log('✅ Create purchase successful');
    console.log(`🆔 Created purchase ID: ${testPurchaseId}`);
    console.log(`📊 Status: ${response.data.data.status}`);
    
    return true;
  } catch (error) {
    console.error('❌ Create purchase failed:', error.response?.data || error.message);
    return false;
  }
}

async function testUpdatePurchase() {
  try {
    console.log('\n✏️  Testing PUT /purchases/:id...');
    
    const updateData = {
      ...testPurchase,
      quantity: 15,
      notes: 'Updated test purchase'
    };
    
    const response = await axios.put(`${BASE_URL}/purchases/${testPurchaseId}`, updateData, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    
    console.log('✅ Update purchase successful');
    console.log(`📊 Updated quantity: ${response.data.data.quantity}`);
    console.log(`📝 Updated notes: ${response.data.data.notes}`);
    
    return true;
  } catch (error) {
    console.error('❌ Update purchase failed:', error.response?.data || error.message);
    return false;
  }
}

async function testApprovePurchase() {
  try {
    console.log('\n✅ Testing PUT /purchases/:id/approve...');
    
    const response = await axios.put(`${BASE_URL}/purchases/${testPurchaseId}/approve`, {}, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    
    console.log('✅ Approve purchase successful');
    console.log(`📊 Status: ${response.data.data.status}`);
    console.log(`👤 Approved by: ${response.data.data.approved_by}`);
    console.log(`⏰ Approved at: ${response.data.data.approved_at}`);
    
    // Check if assets were added to inventory
    const assetsResponse = await axios.get(`${BASE_URL}/assets?limit=10`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    
    console.log(`📦 Total assets in inventory: ${assetsResponse.data.data.length}`);
    
    return true;
  } catch (error) {
    console.error('❌ Approve purchase failed:', error.response?.data || error.message);
    return false;
  }
}

async function testCreateAnotherPurchase() {
  try {
    console.log('\n➕ Creating another purchase for cancellation test...');
    
    const anotherPurchase = {
      ...testPurchase,
      quantity: 5,
      notes: 'Purchase for cancellation test'
    };
    
    const response = await axios.post(`${BASE_URL}/purchases`, anotherPurchase, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    
    const cancelPurchaseId = response.data.data.id;
    console.log(`✅ Created purchase for cancellation: ${cancelPurchaseId}`);
    
    // Test cancellation
    console.log('\n❌ Testing PUT /purchases/:id/cancel...');
    const cancelResponse = await axios.put(`${BASE_URL}/purchases/${cancelPurchaseId}/cancel`, {}, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    
    console.log('✅ Cancel purchase successful');
    console.log(`📊 Status: ${cancelResponse.data.data.status}`);
    
    return true;
  } catch (error) {
    console.error('❌ Create/cancel purchase failed:', error.response?.data || error.message);
    return false;
  }
}

async function testDeletePurchase() {
  try {
    console.log('\n🗑️  Testing DELETE /purchases/:id...');
    
    // Create a purchase to delete
    const deletePurchase = {
      ...testPurchase,
      quantity: 3,
      notes: 'Purchase for deletion test'
    };
    
    const createResponse = await axios.post(`${BASE_URL}/purchases`, deletePurchase, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    
    const deletePurchaseId = createResponse.data.data.id;
    console.log(`🆔 Created purchase for deletion: ${deletePurchaseId}`);
    
    // Delete the purchase
    const response = await axios.delete(`${BASE_URL}/purchases/${deletePurchaseId}`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    
    console.log('✅ Delete purchase successful');
    console.log(`💬 Message: ${response.data.message}`);
    
    return true;
  } catch (error) {
    console.error('❌ Delete purchase failed:', error.response?.data || error.message);
    return false;
  }
}

async function testErrorHandling() {
  try {
    console.log('\n🚨 Testing error handling...');
    
    // Test invalid purchase ID
    try {
      await axios.get(`${BASE_URL}/purchases/invalid-id`, {
        headers: { Authorization: `Bearer ${authToken}` }
      });
    } catch (error) {
      if (error.response?.status === 404) {
        console.log('✅ 404 error handling works for invalid ID');
      }
    }
    
    // Test creating purchase with invalid data
    try {
      await axios.post(`${BASE_URL}/purchases`, {
        asset_id: 'invalid-asset-id',
        base_id: 'invalid-base-id',
        quantity: -1,
        purchase_date: 'invalid-date'
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

async function runAllTests() {
  console.log('🚀 Starting Purchases Route Tests...\n');
  
  const tests = [
    { name: 'Login', fn: login },
    { name: 'Get Test Data', fn: getTestData },
    { name: 'Get Purchases', fn: testGetPurchases },
    { name: 'Get Purchases with Filters', fn: testGetPurchasesWithFilters },
    { name: 'Create Purchase', fn: testCreatePurchase },
    { name: 'Update Purchase', fn: testUpdatePurchase },
    { name: 'Approve Purchase', fn: testApprovePurchase },
    { name: 'Create and Cancel Purchase', fn: testCreateAnotherPurchase },
    { name: 'Delete Purchase', fn: testDeletePurchase },
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
    console.log('\n🎉 All tests passed! Purchases route migration successful!');
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
  testGetPurchases,
  testCreatePurchase,
  testUpdatePurchase,
  testApprovePurchase,
  testDeletePurchase
}; 