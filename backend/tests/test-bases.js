const { PrismaClient } = require('../src/generated/prisma');

const prisma = new PrismaClient();

async function testBases() {
  try {
    console.log('Testing Bases endpoint with Prisma...');
    
    // Test 1: Count total bases
    const totalBases = await prisma.bases.count();
    console.log(`Total bases in database: ${totalBases}`);
    
    // Test 2: Count active bases
    const activeBases = await prisma.bases.count({
      where: { is_active: true }
    });
    console.log(`Active bases: ${activeBases}`);
    
    // Test 3: Get all bases with commander info
    const bases = await prisma.bases.findMany({
      where: { is_active: true },
      include: {
        users_bases_commander_idTousers: {
          select: {
            first_name: true,
            last_name: true
          }
        }
      },
      orderBy: {
        name: 'asc'
      }
    });

    console.log('\nAll bases with commanders:');
    bases.forEach((base, index) => {
      const commander = base.users_bases_commander_idTousers;
      const commanderName = commander ? `${commander.first_name} ${commander.last_name}` : 'No commander';
      console.log(`${index + 1}. ${base.name} (${base.code}) - ${base.location} - Commander: ${commanderName}`);
    });

    // Test 4: Test filtering by commander
    if (bases.length > 0 && bases[0].commander_id) {
      const basesWithCommander = await prisma.bases.findMany({
        where: {
          commander_id: bases[0].commander_id,
          is_active: true
        }
      });
      console.log(`\nBases with commander ${bases[0].commander_id}: ${basesWithCommander.length}`);
    }

    // Test 5: Test unique code constraint
    const uniqueCodes = await prisma.bases.findMany({
      select: { code: true },
      orderBy: { code: 'asc' }
    });
    console.log('\nBase codes:');
    uniqueCodes.forEach(base => {
      console.log(`  - ${base.code}`);
    });

  } catch (error) {
    console.error('Error testing bases:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testBases(); 