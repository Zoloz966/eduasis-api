import { Transform } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { PrimaryGeneratedColumn } from 'typeorm';
import { Gender } from '../entities/students.entity';

export class CreateStudentDto {
  @PrimaryGeneratedColumn()
  id_student: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  lastname: string;

  @IsOptional()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsOptional()
  password: string;

  @IsNumber()
  @IsNotEmpty()
  courseIdCourse: number;

  @IsString()
  @IsOptional()
  token: string;

  @IsEnum(Gender, {
    message:
      'El género debe ser uno de los siguientes: Masculino, Femenino, Otro',
  })
  gender: Gender;

  @IsString()
  @IsNotEmpty()
  code_country: string;

  @IsString()
  @IsNotEmpty()
  tutor_phone: string;

  @IsDate()
  @Transform(({ value }) => value && new Date(value))
  birth_date: Date;

  @IsString()
  @IsOptional()
  photo: string;

  @IsString()
  @IsOptional()
  qr_image: string;

  @IsNumber()
  @IsOptional()
  isEnabled: number;

  @IsString()
  @IsOptional()
  info: string;

  @IsNumber()
  @IsOptional()
  status: number;
}
