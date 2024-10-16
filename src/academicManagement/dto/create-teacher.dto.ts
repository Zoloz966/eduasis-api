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

export class CreateTeacherDto {
  @PrimaryGeneratedColumn()
  id_teacher: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  lastname: string;

  @IsOptional()
  @IsString()
  id: string;

  @IsOptional()
  @IsString()
  email: string;

  @IsOptional()
  @IsString()
  password: string;

  @IsString()
  @IsOptional()
  token: string;

  @IsString()
  @IsNotEmpty()
  code_country: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsDate()
  @Transform(({ value }) => value && new Date(value))
  birth_date: Date;

  @IsString()
  @IsOptional()
  photo: string;

  @IsEnum(Gender)
  @NotEquals(Gender[Gender.Masculino])
  gender: Gender;

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
