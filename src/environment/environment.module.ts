import { EnvironmentService } from './environment.service';
import { EnvironmentController } from './environment.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [EnvironmentController],
  providers: [EnvironmentService],
})
export class EnvironmentModule {}
