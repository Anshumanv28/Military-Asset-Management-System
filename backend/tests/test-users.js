const { PrismaClient } = require('./src/generated/prisma');

const prisma = new PrismaClient();

async function checkUsers() {
  try {
    console.log('Checking users in database...');
    
    const users = await prisma.users.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        first_name: true,
        last_name: true,
        role: true,
        base_id: true,
        is_active: true
      },
      orderBy: {
        role: 'asc'
      }
    });

    console.log(`Found ${users.length} users:`);
    console.log('\nUsers by role:');
    
    const byRole = {};
    users.forEach(user => {
      if (!byRole[user.role]) byRole[user.role] = [];
      byRole[user.role].push(user);
    });

    Object.keys(byRole).forEach(role => {
      console.log(`\n${role.toUpperCase()} (${byRole[role].length}):`);
      byRole[role].forEach(user => {
        console.log(`  - ${user.first_name} ${user.last_name} (${user.email}) - ${user.is_active ? 'Active' : 'Inactive'}`);
      });
    });

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkUsers(); 