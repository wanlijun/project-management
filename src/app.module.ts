import { PlatformModule } from './platform/platform.module';
import { EnvironmentModule } from './environment/environment.module';
import { RoleModule } from './role/role.module';
import { ProjectModule } from './project/project.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/auth.guard';

@Module({
  imports: [
    PlatformModule,
    EnvironmentModule,
    RoleModule,
    ProjectModule,
    UserModule,
    PrismaModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
