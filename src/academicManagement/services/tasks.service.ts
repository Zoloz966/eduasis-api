import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from '../dto/create-task.dto';
import { Tasks } from '../entities/tasks.entity';
import { Repository } from 'typeorm';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { Classes } from '../entities/classes.entity';
import { Courses } from '../entities/courses.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Tasks)
    private taskRepository: Repository<Tasks>,

    @InjectRepository(Classes)
    private classesRespository: Repository<Classes>,

    @InjectRepository(Courses)
    private coursesRepository: Repository<Courses>,
  ) {}

  async create(createTaskDto: CreateTaskDto) {
    const baseTask = this.taskRepository.create(createTaskDto);

    const classStudent = await this.classesRespository.findOne({
      where: { id_class: createTaskDto.classIdClass },
      relations: { subject: true, teacher: true, course: true },
    });

    if (!classStudent) {
      throw new NotFoundException('Class not found');
    }

    const course = await this.coursesRepository.findOne({
      where: { id_course: classStudent.courseIdCourse },
      relations: { students: true },
    });

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    if (!course.students || !course.students.length) {
      throw new NotFoundException('No students found in the class');
    }

    const taskPromises = course.students.map(async (student) => {
      const newTask = { ...baseTask, studentIdStudent: student.id_student }; // Clonar la tarea con el estudiante asignado
      newTask.class = classStudent;
      return await this.taskRepository.save(newTask);
    });

    const savedTasksArray = await Promise.all(taskPromises);

    return savedTasksArray[0];
  }

  async findAll() {
    const list = await this.taskRepository.find({
      where: { status: 1 },
      relations: { class: { teacher: true, subject: true, course: true } },
    });
    if (!list.length) {
      throw new NotFoundException({ message: 'lista vacia' });
    }
    const uniqueTasks = list.filter(
      (task, index, self) =>
        index === self.findIndex((t) => t.task_tittle === task.task_tittle),
    );

    return uniqueTasks;
  }

  async findAllByStudent(idStudent: number) {
    const list = await this.taskRepository.find({
      where: { status: 1, studentIdStudent: idStudent },
      order: { end_date: 'DESC' },
      relations: { class: { subject: true, course: true, teacher: true } },
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

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const item = await this.taskRepository.findOne({
      where: { id_task: id, status: 1 },
    });

    if (!item) {
      throw new NotFoundException('Task not found');
    }
    if (updateTaskDto.classIdClass) {
      const classe = await this.classesRespository.findOne({
        where: { id_class: updateTaskDto.classIdClass },
        relations: { teacher: true, subject: true, course: true },
      });
      updateTaskDto.class = classe;
    }

    const tasksToUpdate = await this.taskRepository.find({
      where: { task_tittle: item.task_tittle },
    });

    if (!tasksToUpdate || tasksToUpdate.length === 0) {
      throw new NotFoundException('Tasks not found');
    }

    const taskPromises = tasksToUpdate.map(async (task) => {
      this.taskRepository.merge(task, updateTaskDto);
      return await this.taskRepository.save(task); // Corregido: guarda el task, no el item
    });

    const savedTasksArray = await Promise.all(taskPromises);

    return savedTasksArray[0];
  }

  async remove(id: number) {
    const item = await this.taskRepository.findOneBy({ id_task: id });

    if (!item) {
      throw new NotFoundException('Task not found');
    }

    const deleteTask = { status: 0 };

    const tasksToDelete = await this.taskRepository.find({
      where: { task_tittle: item.task_tittle },
    });

    if (!tasksToDelete || tasksToDelete.length === 0) {
      throw new NotFoundException('Tasks not found');
    }

    const taskPromises = tasksToDelete.map(async (task) => {
      this.taskRepository.merge(task, deleteTask);
      return await this.taskRepository.save(task); // Corregido: guarda el task
    });
    const savedTasksArray = await Promise.all(taskPromises);

    return savedTasksArray[0];
  }
}
