/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Post } from '@nestjs/common';
import { Public } from './decorator';
import { AuthService } from './auth.service';
import { AuthDto, CreateUserDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('logout')
  logout(@Body() params: AuthDto) {
    return this.authService.login(params);
  }
  @Public()
  @Post('login')
  login(@Body() params: AuthDto) {
    return this.authService.login(params);
  }
  @Public()
  @Post('register')
  register(@Body() params: CreateUserDto) {
    console.log(params, '=====');
    return this.authService.register(params);
  }
}
