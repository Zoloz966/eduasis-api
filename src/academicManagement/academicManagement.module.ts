import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Students } from './entities/students.entity';
import { StudentsController } from './students.controller';
import { StudentsService } from './services/students.service';
import { Teachers } from './entities/teachers.entity';
import { TeachersController } from './teachers.controller';
import { TeachersService } from './services/teachers.service';
import { Subjects } from './entities/subjects.entity';
import { SubjectsController } from './subjects.controller';
import { SubjectsService } from './services/subjects.service';
import { Classes } from './entities/classes.entity';
import { ClassesController } from './classes.controller';
import { ClassesService } from './services/classes.service';
import { Tasks } from './entities/tasks.entity';
import { TasksController } from './tasks.controller';
import { TasksService } from './services/tasks.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Students, Teachers, Subjects, Classes, Tasks]),
  ],
  controllers: [
    StudentsController,
    TeachersController,
    SubjectsController,
    ClassesController,
    TasksController,
  ],
  providers: [
    StudentsService,
    TeachersService,
    SubjectsService,
    ClassesService,
    TasksService,
  ],
})
export class AcademicManagementModule {}
