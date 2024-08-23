import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromHeader('Authorization'),
      ignoreExpiration: false,
      secretOrKey:
        'c9316984e771f607fe2b10442f2f5d4c66183445c362dd1c28b939817a57ad58',
    });
  }

  async validate(payload: any) {
    console.log('payload', payload);
    return { userId: payload.sub, username: payload.username };
  }
}
