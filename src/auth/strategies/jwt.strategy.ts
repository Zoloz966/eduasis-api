import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';

import { Strategy, ExtractJwt } from 'passport-jwt';
import config from 'src/config';
import { PayloadToken } from '../models/token.model';
import { AuthService } from '../services/auth.service';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @Inject(config.KEY) ConfigService: ConfigType<typeof config>,
    private authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: ConfigService.jwtSecret,
    });
  }
  async validate(payload: PayloadToken) {
    try {
      let user;
      user = await this.authService.getUserLogById(payload.sub);
      if (!user) {
        user = await this.authService.getStudentById(payload.sub);
      }
      if (!user) {
        user = await this.authService.getTeachetById(payload.sub);
      }
      if (!user) {
        throw new UnauthorizedException('Usuario no autorizado');
      }
      return payload;
    } catch (error) {
      console.error(error);
      throw new UnauthorizedException('Usuario no autorizado');
    }
  }
}
