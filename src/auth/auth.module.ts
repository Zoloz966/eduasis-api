import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigType } from '@nestjs/config';

import { UsersModule } from 'src/users/users.module';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthController } from './controllers/auth.controller';
import config from './../config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/users/entities/user.entity';
import { UserContextModule } from 'src/userContext/userContext.module';
import { AcademicManagementModule } from 'src/academicManagement/academicManagement.module';
import { Teachers } from 'src/academicManagement/entities/teachers.entity';
import { Students } from 'src/academicManagement/entities/students.entity';
import { StudentStrategy } from './strategies/student.strategy';
import { TeacherStrategy } from './strategies/teacher.strategy';
import { StudentTokenStrategy } from './strategies/studentToken.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users, Teachers, Students]),
    UsersModule,
    UserContextModule,
    PassportModule,
    ConfigModule.forRoot(),
    JwtModule.registerAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        return {
          secret: configService.jwtSecret,
          signOptions: {
            expiresIn: '10d',
          },
        };
      },
    }),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    StudentTokenStrategy,
    StudentStrategy,
    TeacherStrategy,
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
