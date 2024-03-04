/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Post, Get } from '@nestjs/common';
import { AddPlatformDto } from './dto';
import { PlatformService } from './platform.service';

@Controller()
export class PlatformController {
  constructor(private platformService: PlatformService) {}
  @Post('/platform')
  addPlatform(@Body() params: AddPlatformDto) {
    return this.platformService.addPlatform(params);
  }
  @Get('/platform')
  getPlatform() {
    return this.platformService.getPlatform();
  }
}
