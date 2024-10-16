import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCourseDto } from '../dto/create-course.dto';
import { Courses } from '../entities/courses.entity';
import { Repository } from 'typeorm';
import { UpdateCourseDto } from '../dto/update-course.dto';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Courses)
    private courseRepository: Repository<Courses>,
  ) {}

  async create(createCourseDto: CreateCourseDto) {
    const newCourse = this.courseRepository.create(createCourseDto);

    const savedCourse = await this.courseRepository.save(newCourse);

    return savedCourse;
  }

  async findAll() {
    const list = await this.courseRepository.find();
    if (!list.length) {
      throw new NotFoundException({ message: 'lista vacia' });
    }
    return list;
  }

  async findOne(id: number) {
    const item = await this.courseRepository.findOne({
      where: { id_course: id },
    });
    if (!item) {
      throw new NotFoundException(`This course #${id} not found`);
    }
    return item;
  }

  async findOneCourse(id: number) {
    const item = await this.courseRepository.findOne({
      where: { id_course: id },
    });
    if (!item) {
      throw new NotFoundException(`This course #${id} not found`);
    }
    return item;
  }

  async update(id: number, updateCourseDto: UpdateCourseDto) {
    const item = await this.courseRepository.findOne({
      where: { id_course: id },
    });

    this.courseRepository.merge(item, updateCourseDto);

    const savedCourse = await this.courseRepository.save(item);

    return savedCourse;
  }

  async remove(id: number) {
    const item = await this.courseRepository.findOneBy({ id_course: id });

    if (!item) {
      throw new Error(`Course with ID ${id} not found`);
    }

    const removedCourse = await this.courseRepository.remove(item);

    return removedCourse;
  }
}
