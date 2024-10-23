import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateClassDto } from '../dto/create-class.dto';
import { Classes } from '../entities/classes.entity';
import { Repository } from 'typeorm';
import { UpdateClassDto } from '../dto/update-class.dto';
import { Courses } from '../entities/courses.entity';
import { Teachers } from '../entities/teachers.entity';
import { Subjects } from '../entities/subjects.entity';

@Injectable()
export class ClassesService {
  constructor(
    @InjectRepository(Classes)
    private classRepository: Repository<Classes>,

    @InjectRepository(Courses)
    private coursesRepository: Repository<Courses>,

    @InjectRepository(Teachers)
    private teachersRepository: Repository<Teachers>,

    @InjectRepository(Subjects)
    private subjectsRepository: Repository<Subjects>,
  ) {}

  async create(createClassDto: CreateClassDto) {
    const newClasse = this.classRepository.create(createClassDto);

    const savedClasse = await this.classRepository.save(newClasse);

    if (createClassDto.courseIdCourse) {
      const course = await this.coursesRepository.findOne({
        where: { id_course: createClassDto.courseIdCourse },
      });
      newClasse.course = course;
    }

    if (createClassDto.teacherIdTeacher) {
      const teacher = await this.teachersRepository.findOne({
        where: { id_teacher: createClassDto.teacherIdTeacher },
        relations: { course: true },
      });
      newClasse.teacher = teacher;
    }

    if (createClassDto.subjectIdSubject) {
      const subject = await this.subjectsRepository.findOne({
        where: { id_subject: createClassDto.subjectIdSubject },
      });
      newClasse.subject = subject;
    }

    return savedClasse;
  }

  async findAll() {
    const list = await this.classRepository.find({
      where: { status: 1 },
      relations: { course: true, teacher: { course: true }, subject: true },
    });
    if (!list.length) {
      throw new NotFoundException({ message: 'lista vacia' });
    }
    return list;
  }

  async findByCourse(idCourse: number) {
    const list = await this.classRepository.find({
      where: { courseIdCourse: idCourse },
      relations: { subject: true },
    });
    if (!list.length) {
      throw new NotFoundException({ message: 'lista vacia' });
    }
    return list;
  }

  async findOne(id: number) {
    const item = await this.classRepository.findOne({
      where: { id_class: id, status: 1 },
    });
    if (!item) {
      throw new NotFoundException(`This class #${id} not found`);
    }
    return item;
  }

  async update(id: number, updateClasseDto: UpdateClassDto) {
    const item = await this.classRepository.findOne({
      where: { id_class: id, status: 1 },
    });

    if (updateClasseDto.courseIdCourse) {
      const course = await this.coursesRepository.findOne({
        where: { id_course: updateClasseDto.courseIdCourse },
      });
      item.course = course;
    }

    if (updateClasseDto.teacherIdTeacher) {
      const teacher = await this.teachersRepository.findOne({
        where: { id_teacher: updateClasseDto.teacherIdTeacher },
        relations: { course: true },
      });
      item.teacher = teacher;
    }

    if (updateClasseDto.subjectIdSubject) {
      const subject = await this.subjectsRepository.findOne({
        where: { id_subject: updateClasseDto.subjectIdSubject },
      });
      item.subject = subject;
    }

    this.classRepository.merge(item, updateClasseDto);

    const savedClasse = await this.classRepository.save(item);

    return savedClasse;
  }

  async remove(id: number) {
    const item = await this.classRepository.findOneBy({ id_class: id });
    const deleteClasse: UpdateClassDto = {
      status: 0,
    };

    this.classRepository.merge(item, deleteClasse);

    const savedClasse = await this.classRepository.save(item);

    return savedClasse;
  }
}
