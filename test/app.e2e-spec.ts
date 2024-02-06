import { ValidationPipe } from '@nestjs/common';
import { NestApplication } from '@nestjs/core';
import { Test } from '@nestjs/testing';
// import { todo } from 'node:test';
import * as pactum from 'pactum';
import { AppModule } from 'src/app.module';
import { AuthDto } from 'src/auth/dto/auth.dto';
import { AddEnvDto } from 'src/environment/dto';
import { AddPlatformDto } from 'src/platform/dto';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  // CompleteProjectDto,
  CreateProjectDto,
  ModifyProjectDto,
} from 'src/project/dto';

describe('App test', () => {
  let app: NestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleRef.createNestApplication();
    app.setGlobalPrefix('api');
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );
    prisma = app.get(PrismaService);
    await prisma.cleanDb();
    await prisma.initDb();
    pactum.request.setBaseUrl('http://localhost:3333');
    await app.init();
    await app.listen(3333);
  });
  afterAll(() => {
    app.close();
  });
  describe('auth', () => {
    const dto: AuthDto = {
      username: 'lijun.wan',
      password: '1qaz2wsx',
    };
    describe('sign in', () => {
      it('it should be sing in', () => {
        return pactum
          .spec()
          .post('/api/auth/login')
          .withBody(dto)
          .expectStatus(201)
          .stores('userAt', 'access_token');
      });
    });
  });
  describe('user', () => {
    describe('get me', () => {
      it('should get current user', () => {
        return pactum
          .spec()
          .get('/api/user/info')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(200);
      });
    });
    describe('modify user', () => {});
  });
  describe('environment', () => {
    const dto: AddEnvDto = {
      name: '测试',
    };
    it('should add environment ', () => {
      return pactum
        .spec()
        .post('/api/env')
        .withHeaders({
          Authorization: 'Bearer $S{userAt}',
        })
        .withBody(dto)
        .expectStatus(201)
        .stores('environmentId', 'id');
    });
  });
  describe('platform', () => {
    describe('should crate a platform', () => {});
    const dto: AddPlatformDto = {
      name: '前台',
    };
    it('should add platform ', () => {
      return pactum
        .spec()
        .post('/api/platform')
        .withHeaders({
          Authorization: 'Bearer $S{userAt}',
        })
        .withBody(dto)
        .expectStatus(201)
        .stores('platformId', 'id');
    });
  });
  describe('project', () => {
    describe('create project', () => {
      const dto: CreateProjectDto = {
        name: '渝商e服',
        shortName: '市统战',
      };
      it('should create project', () => {
        return pactum
          .spec()
          .post('/api/project')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .withBody(dto)
          .expectStatus(201)
          .expectBodyContains(dto.name)
          .stores('projectId', 'id');
      });
    });
    describe('modify project', () => {
      const dto: ModifyProjectDto = {
        name: '渝商E服',
        shortName: '市统战',
      };
      it('should modify project', () => {
        return pactum
          .spec()
          .put('/api/project/{id}')
          .withPathParams('id', '$S{projectId}')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .withBody(dto)
          .expectStatus(200)
          .expectBodyContains(dto.name);
      });
    });
    describe('complete project info', () => {
      // const dto: CompleteProjectDto = {
      //   name: '渝商E服',
      //   shortName: '市统战',
      //   platform: [
      //     {
      //       name: 'pc',
      //       environments: [
      //         {
      //           name: '测试环境',
      //           account: ['19999999999/111111'],
      //           url: 'http://baidu.com',
      //         },
      //       ],
      //     },
      //   ],
      // };
      // it('complete project info', () => {
      //   return pactum
      //     .spec()
      //     .put('/api/project/complete/{id}')
      //     .withPathParams('id', '$S{projectId}')
      //     .withHeaders({
      //       Authorization: 'Bearer $S{userAt}',
      //     })
      //     .withBody(dto)
      //     .expectStatus(200)
      //     .expectBodyContains(dto.name)
      //     .inspect();
      // });
    });
    describe('get projects ', () => {
      it('should get projects', () => {
        return pactum
          .spec()
          .get('/api/project/page')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(200);
      });
    });
    describe('get project by id', () => {
      it('should get project', () => {
        return pactum
          .spec()
          .get('/api/project/{id}')
          .withPathParams('id', '$S{projectId}')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectBodyContains('$S{projectId}')
          .expectStatus(200);
      });
    });
    describe('complete project info', () => {
      const dto = {
        name: '渝商E服',
        shortName: '市统战',
        brief: '渝商E服的别名是市统战',
        environmentIds: ['$S{environmentId}'],
        platformIds: ['$S{platformId}'],
        account: [
          {
            projectId: '$S{projectId}',
            environmentId: '$S{environmentId}',
            platformId: '$S{platformId}',
            url: 'http://baiduc.com',
            account: ['199999999/11111', '188888888/111111'],
          },
        ],
        frontEndInfo: {
          notes: '前端相关信息',
          gitUrl: [
            {
              name: 'h5',
              url: 'http://baidu.com',
            },
            {
              name: 'pc',
              url: 'http://baidu.com',
            },
          ],
          deploy: [
            {
              environment: '$S{environmentId}',
              data: [
                {
                  name: 'h5',
                  method: '合并到test',
                },
                {
                  name: 'pc',
                  method: '合并到test',
                },
              ],
            },
          ],
        },
      };
      it('update platform info', () => {
        return pactum
          .spec()
          .put('/api/project/complete/{id}')
          .withPathParams('id', '$S{projectId}')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .withBody(dto)
          .expectStatus(200)
          .expectBodyContains(dto.name)
          .inspect();
      });
    });
    // describe('delete project by id', () => {
    //   it('delete project by id', () => {
    //     return pactum
    //       .spec()
    //       .delete('/api/project/{id}')
    //       .withPathParams('id', '$S{projectId}')
    //       .withHeaders({
    //         Authorization: 'Bearer $S{userAt}',
    //       })
    //       .expectStatus(200);
    //   });
    // });
  });
});
