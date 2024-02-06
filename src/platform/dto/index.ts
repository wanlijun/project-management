import { IsString } from 'class-validator';

export class AddPlatformDto {
  @IsString()
  name: string;
}
