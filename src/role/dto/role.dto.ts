import { IsString } from 'class-validator';

export class AddRole {
  @IsString()
  name: string;
}
