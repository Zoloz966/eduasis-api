import { Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../services/auth.service';
import { Users } from 'src/users/entities/user.entity';
import { Students } from 'src/academicManagement/entities/students.entity';
import { Public } from '../decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  login(@Req() req: any) {
    const user = req.user as Users;
    return this.authService.generateJWT(user);
  }

  @UseGuards(AuthGuard('student'))
  @Post('login/student')
  loginStudent(@Req() req: any) {
    const student = req.user as Students;
    return this.authService.generateJWTStudent(student);
  }

  @UseGuards(AuthGuard('teacher'))
  @Post('login/teacher')
  loginTeacher(@Req() req: any) {
    const teacher = req.user as Students;
    return this.authService.generateJWTStudent(teacher);
  }

  @UseGuards(AuthGuard('studentToken'))
  @Post('login/byToken')
  loginStudentByToken(@Req() req: any) {
    console.log(req.user);
    const student = req.user as Students;
    return this.authService.generateJWTStudent(student);
  }
}
