/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddRole } from './dto';

@Injectable()
export class RoleService {
  constructor(private prismaService: PrismaService) {}
  createRole(params: AddRole) {
    return this.prismaService.role.create({
      data: params,
    });
  }
}
