import {
  IsNumber,
  IsOptional,
  IsArray,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';

export class CreateProjectDto {
  @IsString()
  name: string;
  @IsString()
  @IsOptional()
  shortName?: string;
  @IsString()
  @IsOptional()
  brief?: string;
}

export class Environment {
  @IsNumber()
  @IsOptional()
  id?: number;
  @IsString()
  name: string;

  @IsNumber()
  @IsOptional()
  projectId?: number;
}
export class Platform {
  @IsNumber()
  @IsOptional()
  id?: number;

  @IsString()
  name: string;

  @IsNumber()
  @IsOptional()
  projectId?: number;
}
export class ModifyProjectDto {
  @IsString()
  @IsOptional()
  name?: string;
  @IsString()
  @IsOptional()
  shortName?: string;
  @IsString()
  @IsOptional()
  brief?: string;
}

export class Account {
  @IsOptional()
  @IsNumber()
  id?: number;

  @IsOptional()
  @IsNumber()
  projectId: number;

  @IsNumber()
  environmentId: number;

  @IsNumber()
  platformId: number;

  @IsString()
  url: string;

  @IsArray()
  account: string[];
}
class GitUrl {
  @IsString()
  name: string;
  @IsString()
  url: string;
}
class DeployData {
  @IsString()
  name: string;
  @IsString()
  method: string;
}
class Deploy {
  @IsNumber()
  environment: number;

  @ValidateNested({ each: true })
  @Type(() => DeployData)
  data: DeployData[];
}
export class FrontEndInfo {
  @IsNumber()
  @IsOptional()
  id?: number;

  @IsString()
  @IsOptional()
  gitGroupUrl?: string;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => GitUrl)
  gitUrl?: Prisma.JsonArray;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => Deploy)
  deploy?: Prisma.JsonArray;

  @IsString()
  @IsOptional()
  notes?: string;
}

export class CompleteProjectDto extends ModifyProjectDto {
  @IsArray()
  @IsOptional()
  environmentIds?: number[];

  @IsArray()
  @IsOptional()
  platformIds?: number[];

  @ValidateNested({ each: true })
  @Type(() => Account)
  account: Account[];

  @ValidateNested()
  @Type(() => FrontEndInfo)
  frontEndInfo?: FrontEndInfo;
}
export class PageDto {
  @IsOptional()
  @IsNumber()
  index?: number;

  @IsOptional()
  @IsNumber()
  size?: number;
}
