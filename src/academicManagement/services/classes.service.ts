import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateClassDto } from '../dto/create-class.dto';
import { Classes } from '../entities/classes.entity';
import { Repository } from 'typeorm';
import { UpdateClassDto } from '../dto/update-class.dto';

@Injectable()
export class ClassesService {
  constructor(
    @InjectRepository(Classes)
    private classRepository: Repository<Classes>,
  ) {}

  async create(createClassDto: CreateClassDto) {
    const newClasse = this.classRepository.create(createClassDto);

    const savedClasse = await this.classRepository.save(newClasse);

    return savedClasse;
  }

  async findAll() {
    const list = await this.classRepository.find({
      where: { status: 1 },
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

  async findOneClasse(id: number) {
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
