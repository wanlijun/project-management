/*
https://docs.nestjs.com/controllers#controllers
*/

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  CompleteProjectDto,
  CreateProjectDto,
  ModifyProjectDto,
  PageDto,
} from './dto';
import { ProjectService } from './project.service';

@Controller('project')
export class ProjectController {
  constructor(private projectService: ProjectService) {}
  @Post()
  createProject(@Body() params: CreateProjectDto) {
    return this.projectService.createProject(params);
  }

  @Put(':id')
  modifyProject(
    @Param('id', ParseIntPipe) id: number,
    @Body() params: ModifyProjectDto,
  ) {
    return this.projectService.modifyProject(id, params);
  }

  @Put('/complete/:id')
  completeProject(
    @Param('id', ParseIntPipe) id: number,
    @Body() params: CompleteProjectDto,
  ) {
    return this.projectService.completeProject(id, params);
  }

  @Get('page')
  getProjects(@Query() param: PageDto) {
    return this.projectService.getProjects(param);
  }

  @Get(':id')
  getProjectById(@Param('id', ParseIntPipe) id: number) {
    return this.projectService.getProjectById(id);
  }

  @Delete(':id')
  deleteProjectById(@Param('id', ParseIntPipe) id: number) {
    return this.projectService.deleteProjectById(id);
  }
}
