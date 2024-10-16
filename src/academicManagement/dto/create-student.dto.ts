import { Transform } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  NotEquals,
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
  password: string;

  @IsNumber()
  @IsNotEmpty()
  roleIdRole: number;

  @IsString()
  @IsOptional()
  token: string;

  @IsEnum(Gender)
  @NotEquals(Gender[Gender.Masculino])
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
