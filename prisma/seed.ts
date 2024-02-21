import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import * as argon from 'argon2';
async function main() {
  const hash = await argon.hash('1qaz2wsx');
  const user = await prisma.user.create({
    data: {
      username: 'lijun.wan',
      password: hash,
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
