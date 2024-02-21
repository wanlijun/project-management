/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CompleteProjectDto,
  CreateProjectDto,
  ModifyProjectDto,
  PageDto,
} from './dto';

@Injectable()
export class ProjectService {
  constructor(private prismaService: PrismaService) { }
  async createProject(params: CreateProjectDto) {
    const project = await this.prismaService.project.create({
      data: {
        ...params,
      },
    });
    return project;
  }
  async getProjects(param: PageDto) {
    const { index = 1, size = 10 } = param;
    const skip = (index - 1) * size;
    const data = await this.prismaService.project.findMany({
      skip: skip,
      take: size,
    });
    const count = await this.prismaService.project.count();
    return {
      content: data,
      total: count,
    };
  }

  getProjectById(id: number) {
    return this.prismaService.project.findFirst({
      where: {
        id,
      },
    });
  }

  deleteProjectById(id: number) {
    return this.prismaService.project.delete({
      where: {
        id,
      },
    });
  }
  modifyProject(id: number, params: ModifyProjectDto) {
    return this.prismaService.project.update({
      where: {
        id: id,
      },
      data: {
        ...params,
      },
    });
  }
  completeProject(id: number, params: CompleteProjectDto) {
    const { account = [], frontEndInfo, ...remain } = params;
    console.log(frontEndInfo, '======>');
    const { id: frontId, ...frontInfo } = frontEndInfo;
    return this.prismaService.project.update({
      where: {
        id: id,
      },
      data: {
        ...remain,
        account: {
          upsert: account.map((item) => {
            const { id, ...accountInfo } = item;
            return {
              where: { id: id || -2 },
              update: accountInfo,
              create: accountInfo,
            };
          }),
        },
        frontEndInfo: {
          upsert: {
            where: { id: frontId || -2 },
            update: frontInfo,
            create: frontInfo,
          },
        },
      },
    });
  }
}
