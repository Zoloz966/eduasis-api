import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { PrimaryGeneratedColumn } from 'typeorm';
import { Classes } from '../entities/classes.entity';

export class CreateTaskDto {
  @PrimaryGeneratedColumn()
  id_task: number;

  @IsString()
  @IsNotEmpty()
  task_tittle: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  classIdClass: number;

  @IsDate()
  @Transform(({ value }) => value && new Date(value))
  end_date: Date;

  @IsNumber()
  @IsOptional()
  isCompleted: number;

  @IsNumber()
  @IsOptional()
  status: number;

  @IsOptional()
  class?: Classes
}

export class CreateTaskGroupDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateTaskDto)
  @IsNotEmpty()
  values: CreateTaskDto[];
}
