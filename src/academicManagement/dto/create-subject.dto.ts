import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { PrimaryGeneratedColumn } from 'typeorm';

export class CreateSubjectDto {
  @PrimaryGeneratedColumn()
  id_subject: number;

  @IsString()
  @IsNotEmpty()
  subject_name: string;

  @IsOptional()
  @IsNumber()
  status: number;
}
