import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  NotEquals,
} from 'class-validator';
import { PrimaryGeneratedColumn } from 'typeorm';
import { Shift } from '../entities/classes.entity';

export class CreateClassDto {
  @PrimaryGeneratedColumn()
  id_class: number;

  @IsNumber()
  @IsOptional()
  teacherIdTeacher: number;

  @IsNumber()
  @IsNotEmpty()
  subjectIdSubject: number;

  @IsNumber()
  @IsNotEmpty()
  age: number;

  @IsString()
  @IsNotEmpty()
  class_name: string;

  @IsEnum(Shift)
  @NotEquals(Shift[Shift.Mañana])
  shift: Shift;

  @IsNumber()
  @IsOptional()
  status: number;
}