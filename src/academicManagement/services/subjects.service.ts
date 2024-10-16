import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSubjectDto } from '../dto/create-subject.dto';
import { Subjects } from '../entities/subjects.entity';
import { Repository } from 'typeorm';
import { UpdateSubjectDto } from '../dto/update-subject.dto';

@Injectable()
export class SubjectsService {
  constructor(
    @InjectRepository(Subjects)
    private subjectRepository: Repository<Subjects>,
  ) {}

  async create(createSubjectDto: CreateSubjectDto) {
    const newSubject = this.subjectRepository.create(createSubjectDto);

    const savedSubject = await this.subjectRepository.save(newSubject);

    return savedSubject;
  }

  async findAll() {
    const list = await this.subjectRepository.find({
      where: { status: 1 },
    });
    if (!list.length) {
      throw new NotFoundException({ message: 'lista vacia' });
    }
    return list;
  }

  async findOne(id: number) {
    const item = await this.subjectRepository.findOne({
      where: { id_subject: id, status: 1 },
    });
    if (!item) {
      throw new NotFoundException(`This subject #${id} not found`);
    }
    return item;
  }

  async findOneSubject(id: number) {
    const item = await this.subjectRepository.findOne({
      where: { id_subject: id, status: 1 },
    });
    if (!item) {
      throw new NotFoundException(`This subject #${id} not found`);
    }
    return item;
  }

  async update(id: number, updateSubjectDto: UpdateSubjectDto) {
    const item = await this.subjectRepository.findOne({
      where: { id_subject: id, status: 1 },
    });

    this.subjectRepository.merge(item, updateSubjectDto);

    const savedSubject = await this.subjectRepository.save(item);

    return savedSubject;
  }

  async remove(id: number) {
    const item = await this.subjectRepository.findOneBy({ id_subject: id });
    const deleteSubject: UpdateSubjectDto = {
      status: 0,
    };

    this.subjectRepository.merge(item, deleteSubject);

    const savedSubject = await this.subjectRepository.save(item);

    return savedSubject;
  }
}
