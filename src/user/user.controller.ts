/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';

@Controller('user')
export class UserController {
  @Get('info')
  getUser(@GetUser() user: User) {
    return user;
  }
}
