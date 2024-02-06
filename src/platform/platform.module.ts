import { PlatformController } from './platform.controller';
import { PlatformService } from './platform.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [PlatformController],
  providers: [PlatformService],
})
export class PlatformModule {}
