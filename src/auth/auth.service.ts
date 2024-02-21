/*
https://docs.nestjs.com/providers#services
*/

import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2';
import { AuthDto, CreateUserDto } from './dto/auth.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) { }
  async login(params: AuthDto) {
    // find the user
    const user = await this.prisma.user.findUnique({
      where: {
        username: params.username,
      },
    });
    if (!user) {
      throw new ForbiddenException('账号或密码错误');
    }
    // compare password
    const pwMatches = await argon.verify(user.password, params.password);
    if (!pwMatches) {
      throw new ForbiddenException('账号或密码错误');
    }
    return this.signToken(user.id, user.username);
  }
  async register(params: CreateUserDto) {
    const hash = await argon.hash(params.password);
    try {
      const user = await this.prisma.user.create({
        data: {
          username: params.username,
          password: hash,
          roleId: params.roleId,
        },
        select: {
          id: true,
          username: true,
        },
      });
      return user;
    } catch (error) {
      console.log(error);
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('用户名重复');
        }
      } else {
        throw new InternalServerErrorException(error);
      }
    }
  }

  async signToken(userId: number, username: string) {
    const payload = {
      sub: userId,
      username: username,
    };
    const secret = this.config.get('JWT_SECRET');
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '30min',
      secret: secret,
    });
    return {
      token,
      userId: userId,
      username: username,
    };
  }

}
