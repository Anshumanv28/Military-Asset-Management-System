const { PrismaClient } = require('./src/generated/prisma');

const prisma = new PrismaClient();

async function testAssets() {
  try {
    console.log('Testing Assets endpoint with Prisma...');
    
    // Test 1: Count total assets
    const totalAssets = await prisma.assets.count();
    console.log(`Total assets in database: ${totalAssets}`);
    
    // Test 2: Get first 5 assets with base info
    const assets = await prisma.assets.findMany({
      take: 5,
      include: {
        bases: {
          select: {
            name: true,
            code: true
          }
        }
      },
      orderBy: {
        name: 'asc'
      }
    });

    console.log('\nFirst 5 assets:');
    assets.forEach((asset, index) => {
      console.log(`${index + 1}. ${asset.name} - Base: ${asset.bases.name} (${asset.bases.code}) - Qty: ${asset.quantity}`);
    });

    // Test 3: Test filtering by base
    if (assets.length > 0) {
      const firstBaseId = assets[0].base_id;
      const assetsInBase = await prisma.assets.findMany({
        where: {
          base_id: firstBaseId
        },
        include: {
          bases: {
            select: {
              name: true
            }
          }
        }
      });
      console.log(`\nAssets in base ${assets[0].bases.name}: ${assetsInBase.length}`);
    }

    // Test 4: Test status filtering
    const availableAssets = await prisma.assets.count({
      where: {
        status: 'available'
      }
    });
    console.log(`\nAvailable assets: ${availableAssets}`);

  } catch (error) {
    console.error('Error testing assets:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testAssets(); 