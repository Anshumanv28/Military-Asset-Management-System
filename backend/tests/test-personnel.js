const { PrismaClient } = require('../src/generated/prisma');

const prisma = new PrismaClient();

async function testPersonnel() {
  try {
    console.log('Testing Personnel endpoint with Prisma...');
    
    // Test 1: Count total personnel
    const totalPersonnel = await prisma.personnel.count();
    console.log(`Total personnel in database: ${totalPersonnel}`);
    
    // Test 2: Count active personnel
    const activePersonnel = await prisma.personnel.count({
      where: { is_active: true }
    });
    console.log(`Active personnel: ${activePersonnel}`);
    
    // Test 3: Get personnel by base
    const bases = await prisma.bases.findMany({
      take: 2,
      select: { id: true, name: true }
    });

    for (const base of bases) {
      const personnelInBase = await prisma.personnel.count({
        where: { base_id: base.id }
      });
      console.log(`Personnel in ${base.name}: ${personnelInBase}`);
    }
    
    // Test 4: Get personnel with base info
    const personnel = await prisma.personnel.findMany({
      take: 10,
      include: {
        bases: {
          select: {
            name: true,
            code: true
          }
        }
      },
      orderBy: [
        { first_name: 'asc' },
        { last_name: 'asc' }
      ]
    });

    console.log('\nFirst 10 personnel:');
    personnel.forEach((person, index) => {
      console.log(`${index + 1}. ${person.first_name} ${person.last_name} (${person.rank}) - ${person.bases.name} (${person.bases.code})`);
    });

    // Test 5: Test filtering by rank
    const ranks = await prisma.personnel.findMany({
      select: { rank: true },
      distinct: ['rank'],
      orderBy: { rank: 'asc' }
    });
    
    console.log('\nAvailable ranks:');
    ranks.forEach(rank => {
      console.log(`  - ${rank.rank}`);
    });

    // Test 6: Test unique constraint (first_name, last_name, email)
    const uniquePersonnel = await prisma.personnel.findMany({
      select: { 
        first_name: true, 
        last_name: true, 
        email: true 
      },
      orderBy: [
        { first_name: 'asc' },
        { last_name: 'asc' }
      ]
    });

    console.log('\nUnique personnel combinations:');
    uniquePersonnel.slice(0, 5).forEach(person => {
      const email = person.email || 'No email';
      console.log(`  - ${person.first_name} ${person.last_name} (${email})`);
    });

    // Test 7: Test assignments relationship
    const personnelWithAssignments = await prisma.personnel.findMany({
      include: {
        assignments: {
          where: { status: 'active' },
          select: { asset_name: true, quantity: true }
        }
      },
      take: 5
    });

    console.log('\nPersonnel with active assignments:');
    personnelWithAssignments.forEach(person => {
      if (person.assignments.length > 0) {
        console.log(`${person.first_name} ${person.last_name} has ${person.assignments.length} active assignments`);
        person.assignments.forEach(assignment => {
          console.log(`  - ${assignment.asset_name} (${assignment.quantity})`);
        });
      }
    });

  } catch (error) {
    console.error('Error testing personnel:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testPersonnel(); 