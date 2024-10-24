import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { AuthService } from '../services/auth.service';
@Injectable()
export class StudentStrategy extends PassportStrategy(Strategy, 'student') {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string) {
    const user = await this.authService.validateStudent(email, password);
    if (!user) {
      throw new UnauthorizedException(
        'Estudiante no autorizado, consulte admnistración',
      );
    }
    return user;
  }
}
