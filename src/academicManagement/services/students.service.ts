import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

import { CreateStudentDto } from '../dto/create-student.dto';
import { UpdateStudentDto } from '../dto/update-student.dto';
import { Students } from '../entities/students.entity';
import { Repository } from 'typeorm';
import { RoleService } from 'src/users/services/role.service';
import { Courses } from '../entities/courses.entity';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Students)
    private studentRepository: Repository<Students>,
    private roleService: RoleService,

    @InjectRepository(Courses)
    private courseRepository: Repository<Courses>,
  ) {}

  async create(createStudentDto: CreateStudentDto) {
    const newStudent = this.studentRepository.create(createStudentDto);
    const initialsLastname = newStudent.lastname.slice(0, 3).toUpperCase();
    const birthDate = new Date(newStudent.birth_date);
    const formattedDate = this.formatDateToString(birthDate);

    newStudent.password = initialsLastname + formattedDate;

    const hashPassword = await bcrypt.hash(newStudent.password, 10);
    newStudent.password = hashPassword;

    const role = await this.roleService.findStudent();
    newStudent.role = role;

    const firstNamePart = newStudent.name.split(' ')[0].toLowerCase();
    const lastNamePart = newStudent.lastname.split(' ')[0].toLowerCase();

    newStudent.email = `${firstNamePart}.${lastNamePart}${newStudent.id}@eduasis.com`;

    if (newStudent.courseIdCourse) {
      const course = await this.courseRepository.findOne({
        where: { id_course: newStudent.courseIdCourse },
      });
      newStudent.course = course;
    }

    const savedStudent = await this.studentRepository.save(newStudent);

    return savedStudent;
  }

  async findAll() {
    const list = await this.studentRepository.find({
      relations: { role: true, course: true },
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

    if (updateStudentDto.courseIdCourse) {
      const course = await this.courseRepository.findOne({
        where: { id_course: updateStudentDto.courseIdCourse },
      });
      item.course = course;
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

  private formatDateToString(date) {
    const day = ('0' + date.getDate()).slice(-2); // Asegura dos dígitos para el día
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Asegura dos dígitos para el mes (getMonth() devuelve un índice de 0 a 11)
    const year = date.getFullYear().toString().slice(-2); // Obtiene los últimos dos dígitos del año

    return day + month + year;
  }
}
