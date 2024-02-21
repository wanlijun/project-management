import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import extractJwtFromCookie from './extractJwtFromCookie';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    config: ConfigService,
    private prisma: PrismaService,
  ) {
    super({
      jwtFromRequest: (req) => extractJwtFromCookie(req),
      secretOrKey: config.get('JWT_SECRET'),
      ignoreExpiration: false,
    });
  }
  async validate(payload: { sub: number; username: string }) {
    console.log(payload, '====>payload');
    const user = await this.prisma.user.findUnique({
      where: {
        id: payload.sub,
      },
    });
    delete user.password;
    return user;
  }
}
