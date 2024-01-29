import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AuthDto {
  @IsString()
  @IsNotEmpty()
  username: string;
  @IsString()
  @IsNotEmpty()
  password: string;
}
export class CreateUserDto extends AuthDto {
  @IsNumber()
  roleId: number;
}
