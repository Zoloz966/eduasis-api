import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  NotEquals,
} from 'class-validator';
import { PrimaryGeneratedColumn } from 'typeorm';
import { TypeSubject } from '../entities/subjects.entity';

export class CreateSubjectDto {
  @PrimaryGeneratedColumn()
  id_subject: number;

  @IsString()
  @IsNotEmpty()
  subject_name: string;

  @IsEnum(TypeSubject)
  @NotEquals(TypeSubject[TypeSubject.COMUNIDAD_Y_SOCIEDAD])
  type_subject: TypeSubject;

  @IsOptional()
  @IsNumber()
  status: number;
}
