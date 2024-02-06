import { IsString } from 'class-validator';

export class AddEnvDto {
  @IsString()
  name: string;
}
