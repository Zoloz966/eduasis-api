import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from 'src/users/services/users.service';
import { Users } from 'src/users/entities/user.entity';
import { PayloadToken } from '../models/token.model';
import { UserContextService } from 'src/userContext/service/userContext.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Students } from 'src/academicManagement/entities/students.entity';
import { Repository } from 'typeorm';
import { Teachers } from 'src/academicManagement/entities/teachers.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private userContextService: UserContextService,

    @InjectRepository(Students)
    private studentsRepository: Repository<Students>,

    @InjectRepository(Teachers)
    private teachersRepository: Repository<Teachers>,

    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findbyemail(email);
    if (!user.isEnabled) return null;
    const isMatch = await bcrypt.compare(password, user.password);
    if (user && isMatch) {
      return user;
    }
    return null;
  }

  async getUserLogById(idUser) {
    const user = await this.usersRepository.findOne({
      where: { id_user: idUser },
      relations: { role: { access: true } },
    });
    this.userContextService.setUser(user);
    return user;
  }

  async getStudentById(idUser) {
    const student = await this.studentsRepository.findOne({
      where: { id_student: idUser },
      relations: { role: { access: true } },
    });
    return student;
  }
  
  async getTeachetById(idUser) {
    const teacher = await this.teachersRepository.findOne({
      where: { id_teacher: idUser },
      relations: { role: { access: true } },
    });
    return teacher;
  }

  generateJWT(user: Users) {
    const payload: PayloadToken = { role: user.role, sub: user.id_user };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }

  generateJWTStudent(student: Students) {
    console.log(student);

    const payload: PayloadToken = {
      role: student.role,
      sub: student.id_student,
    };

    console.log('payload', payload);
    return {
      access_token: this.jwtService.sign(payload),
      user: student,
    };
  }

  generateJWTTeacher(teacher: Teachers) {
    const payload: PayloadToken = {
      role: teacher.role,
      sub: teacher.id_teacher,
    };

    console.log(payload);

    return {
      access_token: this.jwtService.sign(payload),
      user: teacher,
    };
  }

  async validateStudent(email: string, password: string) {
    const student = await this.studentsRepository.findOne({
      where: { email, status: 1 },
      relations: { role: { access: true } },
    });
    if (!student) {
      throw new NotFoundException(`El estudiante ${email} no se ha encontrado`);
    }
    if (!student.isEnabled) return null;
    const isMatch = await bcrypt.compare(password, student.password);
    if (student && isMatch) {
      console.log(student);

      return student;
    }
    return null;
  }

  async validateTeacher(email: string, password: string) {
    const teacher = await this.teachersRepository.findOne({
      where: { email, status: 1 },
      relations: { role: { access: true } },
    });
    if (!teacher) {
      throw new NotFoundException(`El profesor ${email} no se ha encontrado`);
    }
    if (!teacher.isEnabled) return null;
    const isMatch = await bcrypt.compare(password, teacher.password);
    if (teacher && isMatch) {
      return teacher;
    }
    return null;
  }

  async validateStudentByToken(token: string) {
    const item = await this.studentsRepository.findOne({
      where: { token: token },
      relations: { role: { access: true } },
    });
    if (!item) {
      throw new NotFoundException(`El token no es válido`);
    }
    if (!item.isEnabled) return null;
    return item;
  }
}
