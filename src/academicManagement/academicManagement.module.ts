import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Students } from './entities/students.entity';
import { StudentsController } from './students.controller';
import { StudentsService } from './services/students.service';
import { Teachers } from './entities/teachers.entity';
import { TeachersController } from './teacher.controller';
import { TeachersService } from './services/teachers.service';
import { Subjects } from './entities/subjects.entity';
import { SubjectsController } from './subject.controller';
import { SubjectsService } from './services/subjects.service';
import { Classes } from './entities/classes.entity';
import { ClassesController } from './classes.controller';
import { ClassesService } from './services/classes.service';

@Module({
  imports: [TypeOrmModule.forFeature([Students, Teachers, Subjects, Classes])],
  controllers: [
    StudentsController,
    TeachersController,
    SubjectsController,
    ClassesController,
  ],
  providers: [
    StudentsService,
    TeachersService,
    SubjectsService,
    ClassesService,
  ],
})
export class AcademicManagementModule {}
