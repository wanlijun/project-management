import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import * as argon from 'argon2';
async function main() {
  const hash = await argon.hash('1qaz2wsx');
  await prisma.user.create({
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
  // 创建内置的环境
  await prisma.environment.createMany({
    data: [
      {
        name: '测试',
      },
      {
        name: '预发布',
      },
      {
        name: '正式',
      },
      {
        name: '演示',
      },
    ],
  });
  // 创建内置的平台
  await prisma.platform.createMany({
    data: [
      {
        name: 'H5',
      },
      {
        name: 'PC前台',
      },
      {
        name: '后台',
      },
      {
        name: '大屏',
      },
    ],
  });
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
