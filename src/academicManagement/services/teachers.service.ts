import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

import { CreateTeacherDto } from '../dto/create-teacher.dto';
import { UpdateTeacherDto } from '../dto/update-teacher.dto';
import { Teachers } from '../entities/teachers.entity';
import { In, Repository } from 'typeorm';
import { RoleService } from 'src/users/services/role.service';

@Injectable()
export class TeachersService {
  constructor(
    @InjectRepository(Teachers)
    private teacherRepository: Repository<Teachers>,
    private roleService: RoleService,
  ) {}

  async create(createTeacherDto: CreateTeacherDto) {
    const newTeacher = this.teacherRepository.create(createTeacherDto);
    const hashPassword = await bcrypt.hash(newTeacher.password, 10);
    newTeacher.password = hashPassword;
    if (createTeacherDto.roleIdRole) {
      const role = await this.roleService.findOne(createTeacherDto.roleIdRole);
      newTeacher.role = role;
    }

    const savedTeacher = await this.teacherRepository.save(newTeacher);

    return savedTeacher;
  }

  async findAll() {
    const list = await this.teacherRepository.find({
      relations: ['role'],
      where: { status: 1 },
    });
    if (!list.length) {
      throw new NotFoundException({ message: 'lista vacia' });
    }
    return list;
  }

  async findOne(id: number) {
    const item = await this.teacherRepository.findOne({
      relations: ['role'],
      where: { id_teacher: id, status: 1 },
    });
    if (!item) {
      throw new NotFoundException(`This teacher #${id} not found`);
    }
    return item;
  }

  async findOneTeacher(id: number) {
    const item = await this.teacherRepository.findOne({
      where: { id_teacher: id, status: 1 },
    });
    if (!item) {
      throw new NotFoundException(`This teacher #${id} not found`);
    }
    return item;
  }

  async login(email: string, password: string) {
    const item = await this.teacherRepository.findOne({
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
    const item = await this.teacherRepository.findOne({
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

  async update(id: number, updateTeacherDto: UpdateTeacherDto) {
    const item = await this.teacherRepository.findOne({
      where: { id_teacher: id, status: 1 },
      relations: ['role'],
    });

    if (updateTeacherDto.password) {
      const hashPassword = await bcrypt.hash(updateTeacherDto.password, 10);
      updateTeacherDto.password = hashPassword;
    }

    if (updateTeacherDto.roleIdRole) {
      const role = await this.roleService.findOne(updateTeacherDto.roleIdRole);
      item.role = role;
    }

    this.teacherRepository.merge(item, updateTeacherDto);

    const savedTeacher = await this.teacherRepository.save(item);

    return savedTeacher;
  }

  async remove(id: number) {
    const item = await this.teacherRepository.findOneBy({ id_teacher: id });
    const deleteTeacher: UpdateTeacherDto = {
      status: 0,
    };

    this.teacherRepository.merge(item, deleteTeacher);

    const savedTeacher = await this.teacherRepository.save(item);

    return savedTeacher;
  }
}
