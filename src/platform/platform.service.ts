/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddPlatformDto } from './dto';

@Injectable()
export class PlatformService {
  constructor(private prismaService: PrismaService) {}
  addPlatform(params: AddPlatformDto) {
    return this.prismaService.platform.create({
      data: params,
    });
  }
  getPlatform() {
    return this.prismaService.platform.findMany();
  }
}
