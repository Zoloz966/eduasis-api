import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { AuthService } from '../services/auth.service';
@Injectable()
export class TeacherStrategy extends PassportStrategy(Strategy, 'teacher') {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string) {
    const user = await this.authService.validateTeacher(email, password);
    if (!user) {
      throw new UnauthorizedException(
        'Profesor no autorizado, consulte admnistración',
      );
    }
    return user;
  }
}
