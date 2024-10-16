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

@Module({
  imports: [TypeOrmModule.forFeature([Students, Teachers, Subjects])],
  controllers: [StudentsController, TeachersController, SubjectsController],
  providers: [StudentsService, TeachersService, SubjectsService],
})
export class AcademicManagementModule {}
