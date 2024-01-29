/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';
import * as argon from 'argon2';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(config: ConfigService) {
    super({
      datasources: {
        db: {
          url: config.get('DATABASE_URL'),
        },
      },
    });
  }
  async initDb() {
    const hash = await argon.hash('1qaz2wsx');
    const user = await this.user.create({
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
  cleanDb() {
    this.$transaction([
      this.user.deleteMany(),
      this.role.deleteMany(),
      this.environment.deleteMany(),
      this.platform.deleteMany(),
      this.project.deleteMany(),
    ]);
  }
}
