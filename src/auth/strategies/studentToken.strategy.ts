import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-custom'; // Cambia a passport-custom

import { AuthService } from '../services/auth.service';

@Injectable()
export class StudentTokenStrategy extends PassportStrategy(
  Strategy,
  'studentToken',
) {
  constructor(private authService: AuthService) {
    super(); 
  }

  async validate(req: any) {
    const token = req.body.token; 
    console.log(token);

    const user = await this.authService.validateStudentByToken(token);
    if (!user) {
      throw new UnauthorizedException(
        'Estudiante no autorizado, consulte administración',
      );
    }
    return user;
  }
}
