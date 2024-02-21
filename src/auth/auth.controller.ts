/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Delete, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { Public } from './decorator';
import { AuthService } from './auth.service';
import { AuthDto, CreateUserDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }
  @Delete('logout')
  logout(@Res() res: Response) {
    res.clearCookie('token');
    res.cookie('token', '', {
      expires: new Date(0),
    });
    res.send('success');
  }
  @Public()
  @Post('login')
  async login(@Body() params: AuthDto, @Res() res: Response) {
    const { token, userId, username } = await this.authService.login(params);
    res.cookie('token', token, {
      expires: new Date(Date.now() + 60 * 60 * 1000),
    });
    res.send({
      userId,
      username,
    });
  }
  @Public()
  @Post('register')
  register(@Body() params: CreateUserDto) {
    console.log(params, '=====');
    return this.authService.register(params);
  }
}
