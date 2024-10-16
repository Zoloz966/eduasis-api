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
  student_id: number;

  @IsNumber()
  @IsNotEmpty()
  class_id: number;

  @IsNumber()
  @IsOptional()
  grade: number;

  @IsEnum(TypeGrade)
  @NotEquals(TypeGrade[TypeGrade.PRIMER_TRIMESTRE])
  type_grade: TypeGrade;
}
