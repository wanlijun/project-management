/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddEnvDto } from './dto';

@Injectable()
export class EnvironmentService {
  constructor(private prismaService: PrismaService) {}
  addEnvironment(params: AddEnvDto) {
    console.log(params, '======>');
    return this.prismaService.environment.create({
      data: params,
    });
  }
  getEnvironments() {
    return this.prismaService.environment.findMany();
  }
}
