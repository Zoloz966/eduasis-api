import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Students } from './entities/students.entity';
import { StudentsController } from './students.controller';
import { StudentsService } from './services/students.service';
import { Teachers } from './entities/teachers.entity';
import { TeachersController } from './teacher.controller';
import { TeachersService } from './services/teachers.service';

@Module({
  imports: [TypeOrmModule.forFeature([Students, Teachers])],
  controllers: [StudentsController, TeachersController],
  providers: [StudentsService, TeachersService],
})
export class AcademicManagementModule {}
