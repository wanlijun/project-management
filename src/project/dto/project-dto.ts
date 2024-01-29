import { Type } from 'class-transformer';
import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

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
export class FrontEndInfo {
  @IsString()
  @IsOptional()
  gitUrl?: string;
  @IsString()
  @IsOptional()
  deploy?: string;
  @IsString()
  @IsOptional()
  notes?: string;
}
export class Environment {
  @IsNumber()
  @IsOptional()
  id?: number;
  @IsString()
  name: string;
  @IsArray()
  account: string[];
  @IsString()
  url: string;
}
export type EnvironmentWithProjectId = Environment & { platformId: number };
export class Platform {
  @IsNumber()
  @IsOptional()
  id?: number;

  @IsString()
  name: string;

  @ValidateNested()
  @IsOptional()
  frontEndInfo?: FrontEndInfo;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Environment)
  @IsOptional()
  environments?: Environment[];
}
export type CreatePlatform = Omit<Platform, 'id'>;
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
export class CompleteProjectDto extends ModifyProjectDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Platform)
  @IsOptional()
  platform?: Platform[];
}
export class PageDto {
  @IsOptional()
  @IsNumber()
  index: number;

  @IsOptional()
  @IsNumber()
  size: number;
}
