const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const email = process.argv[2];
  const role = process.argv[3] || 'SUPER_ADMIN';

  if (!email) {
    console.error('Usage: npx ts-node scripts/make-admin.ts user@example.com [ROLE]');
    console.error('Roles: SUPER_ADMIN, MINOR_ADMIN, COLLEGE_ADMIN, TRAINER');
    process.exit(1);
  }

  try {
    const user = await prisma.user.update({
      where: { email },
      data: { role },
    });
    console.log(`Successfully promoted ${user.email} to ${user.role}.`);
  } catch (error) {
    console.error('Error promoting user:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
