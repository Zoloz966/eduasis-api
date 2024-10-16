import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from '../dto/create-task.dto';
import { Tasks } from '../entities/tasks.entity';
import { Repository } from 'typeorm';
import { UpdateTaskDto } from '../dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Tasks)
    private taskRepository: Repository<Tasks>,
  ) {}

  async create(createTaskDto: CreateTaskDto) {
    const newTask = this.taskRepository.create(createTaskDto);

    const savedTask = await this.taskRepository.save(newTask);

    return savedTask;
  }

  async findAll() {
    const list = await this.taskRepository.find({
      where: { status: 1 },
    });
    if (!list.length) {
      throw new NotFoundException({ message: 'lista vacia' });
    }
    return list;
  }

  async findOne(id: number) {
    const item = await this.taskRepository.findOne({
      where: { id_task: id, status: 1 },
    });
    if (!item) {
      throw new NotFoundException(`This task #${id} not found`);
    }
    return item;
  }

  async findOneTask(id: number) {
    const item = await this.taskRepository.findOne({
      where: { id_task: id, status: 1 },
    });
    if (!item) {
      throw new NotFoundException(`This task #${id} not found`);
    }
    return item;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const item = await this.taskRepository.findOne({
      where: { id_task: id, status: 1 },
    });

    this.taskRepository.merge(item, updateTaskDto);

    const savedTask = await this.taskRepository.save(item);

    return savedTask;
  }

  async remove(id: number) {
    const item = await this.taskRepository.findOneBy({ id_task: id });
    const deleteTask: UpdateTaskDto = {
      status: 0,
    };

    this.taskRepository.merge(item, deleteTask);

    const savedTask = await this.taskRepository.save(item);

    return savedTask;
  }
}
