import { Transform } from 'class-transformer';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { PrimaryGeneratedColumn } from 'typeorm';

export class CreateTaskDto {
  @PrimaryGeneratedColumn()
  id_task: number;

  @IsString()
  @IsNotEmpty()
  task_tittle: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsDate()
  @Transform(({ value }) => value && new Date(value))
  end_date: Date;

  @IsNumber()
  @IsOptional()
  isCompleted: number;

  @IsNumber()
  @IsOptional()
  status: number;
}
