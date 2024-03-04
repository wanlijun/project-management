/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Post, Get } from '@nestjs/common';
import { AddEnvDto } from './dto';
import { EnvironmentService } from './environment.service';

@Controller('env')
export class EnvironmentController {
  constructor(private environment: EnvironmentService) {}
  @Post()
  addEnvironment(@Body() params: AddEnvDto) {
    return this.environment.addEnvironment(params);
  }

  @Get()
  getEnv() {
    return this.environment.getEnvironments();
  }
}
