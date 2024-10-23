import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  NotEquals,
} from 'class-validator';
import { PrimaryGeneratedColumn } from 'typeorm';
import { TypeGrade } from '../entities/grades.entity';

export class CreateGradeDto {
  @PrimaryGeneratedColumn()
  id_grade: number;

  @IsNumber()
  @IsNotEmpty()
  studentIdStudent: number;

  @IsNumber()
  @IsNotEmpty()
  classIdClass: number;

  @IsNumber()
  @IsOptional()
  grade: number;

  @IsEnum(TypeGrade)
  type_grade: TypeGrade;
}
