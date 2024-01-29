import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const user = await prisma.user.create({
    data: {
      username: 'lijun.wan',
      password: '1qaz2wsx',
      role: {
        create: {
          name: '超级管理员',
        },
      },
    },
  });
  return user;
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
