import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateGradeDto } from '../dto/create-grade.dto';
import { Grades } from '../entities/grades.entity';
import { Repository } from 'typeorm';
import { UpdateGradeDto } from '../dto/update-grade.dto';

@Injectable()
export class GradesService {
  constructor(
    @InjectRepository(Grades)
    private gradeRepository: Repository<Grades>,
  ) {}

  async create(createGradeDto: CreateGradeDto) {
    const newGrade = this.gradeRepository.create(createGradeDto);

    const isGrade = await this.gradeRepository.findOne({
      where: {
        studentIdStudent: createGradeDto.studentIdStudent,
        type_grade: createGradeDto.type_grade,
        classIdClass: createGradeDto.classIdClass,
      },
    });

    if (isGrade) {
      throw new NotFoundException(`Esta nota para la materia ya existe`);
    }

    const savedGrade = await this.gradeRepository.save(newGrade);

    return savedGrade;
  }

  async findAll() {
    const list = await this.gradeRepository.find();
    if (!list.length) {
      throw new NotFoundException({ message: 'lista vacia' });
    }
    return list;
  }

  async findAllByStudent(idStudent: number) {
    const list = await this.gradeRepository.find({
      where: { studentIdStudent: idStudent },
    });

    if (!list.length) {
      throw new NotFoundException({ message: 'lista vacia' });
    }
    return list;
  }

  async findOne(id: number) {
    const item = await this.gradeRepository.findOne({
      where: { id_grade: id },
    });
    if (!item) {
      throw new NotFoundException(`This grade #${id} not found`);
    }
    return item;
  }

  async findOneGrade(id: number) {
    const item = await this.gradeRepository.findOne({
      where: { id_grade: id },
    });
    if (!item) {
      throw new NotFoundException(`This grade #${id} not found`);
    }
    return item;
  }

  async update(id: number, updateGradeDto: UpdateGradeDto) {
    const item = await this.gradeRepository.findOne({
      where: { id_grade: id },
    });

    this.gradeRepository.merge(item, updateGradeDto);

    const savedGrade = await this.gradeRepository.save(item);

    return savedGrade;
  }

  async remove(id: number) {
    const item = await this.gradeRepository.findOneBy({ id_grade: id });

    if (!item) {
      throw new Error(`Grade with ID ${id} not found`);
    }

    const removedGrade = await this.gradeRepository.remove(item);

    return removedGrade;
  }
}
