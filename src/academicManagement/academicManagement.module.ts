import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Students } from './entities/students.entity';
import { StudentsController } from './students.controller';
import { StudentsService } from './services/students.service';

@Module({
  imports: [TypeOrmModule.forFeature([Students])],
  controllers: [StudentsController],
  providers: [StudentsService],
})
export class AcademicManagementModule {}
