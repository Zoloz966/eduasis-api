import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

import { CreateStudentDto } from '../dto/create-student.dto';
import { UpdateStudentDto } from '../dto/update-student.dto';
import { Students } from '../entities/students.entity';
import { In, Repository } from 'typeorm';
import { RoleService } from 'src/users/services/role.service';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Students)
    private studentRepository: Repository<Students>,
    private roleService: RoleService,
  ) {}

  async create(createStudentDto: CreateStudentDto) {
    const newStudent = this.studentRepository.create(createStudentDto);
    const hashPassword = await bcrypt.hash(newStudent.password, 10);
    newStudent.password = hashPassword;
    if (createStudentDto.roleIdRole) {
      const role = await this.roleService.findOne(createStudentDto.roleIdRole);
      newStudent.role = role;
    }

    const savedStudent = await this.studentRepository.save(newStudent);

    return savedStudent;
  }

  async findAll() {
    const list = await this.studentRepository.find({
      relations: ['role'],
      where: { status: 1 },
    });
    if (!list.length) {
      throw new NotFoundException({ message: 'lista vacia' });
    }
    return list;
  }

  async findOne(id: number) {
    const item = await this.studentRepository.findOne({
      relations: ['role'],
      where: { id_student: id, status: 1 },
    });
    if (!item) {
      throw new NotFoundException(`This student #${id} not found`);
    }
    return item;
  }

  async findOneStudent(id: number) {
    const item = await this.studentRepository.findOne({
      where: { id_student: id, status: 1 },
    });
    if (!item) {
      throw new NotFoundException(`This student #${id} not found`);
    }
    return item;
  }

  async login(email: string, password: string) {
    const item = await this.studentRepository.findOne({
      relations: ['role'],
      where: { email: email, password: password },
    });
    if (!item) {
      throw new NotFoundException(
        `El usuario con el correo ${email} no se ha encontrado`,
      );
    }

    if (item.role) {
      const access = await this.roleService.findOne(item.role.id_role);
      item.role = access;
    }

    return item;
  }

  async findbyemail(email: string) {
    const item = await this.studentRepository.findOne({
      relations: ['role'],
      where: { email: email, status: 1 },
    });

    if (item) {
      if (item.role) {
        const access = await this.roleService.findOne(item.role.id_role);
        item.role = access;
      }
      return item;
    } else {
      throw new NotFoundException(`El usuario ${email} no se ha encontrado`);
    }
  }

  async update(id: number, updateStudentDto: UpdateStudentDto) {
    const item = await this.studentRepository.findOne({
      where: { id_student: id, status: 1 },
      relations: ['role'],
    });

    if (updateStudentDto.password) {
      const hashPassword = await bcrypt.hash(updateStudentDto.password, 10);
      updateStudentDto.password = hashPassword;
    }

    if (updateStudentDto.roleIdRole) {
      const role = await this.roleService.findOne(updateStudentDto.roleIdRole);
      item.role = role;
    }

    this.studentRepository.merge(item, updateStudentDto);

    const savedStudent = await this.studentRepository.save(item);

    return savedStudent;
  }

  async remove(id: number) {
    const item = await this.studentRepository.findOneBy({ id_student: id });
    const deleteStudent: UpdateStudentDto = {
      status: 0,
    };

    this.studentRepository.merge(item, deleteStudent);

    const savedStudent = await this.studentRepository.save(item);

    return savedStudent;
  }
}
