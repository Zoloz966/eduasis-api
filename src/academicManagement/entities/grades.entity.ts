import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Students } from './students.entity';
import { Classes } from './classes.entity';

export enum TypeGrade {
  PRIMER_TRIMESTRE = 'Primer Trimestre',
  SEGUNDO_TRIMESTRE = 'Segundo Trimestre',
  TERCER_TRIMESTRE = 'Tercer Trimestre',
}

@Entity()
export class Grades {
  @PrimaryGeneratedColumn()
  id_grade: number;

  @Column({ type: 'int', nullable: false })
  studentIdStudent: number;

  @Column({ type: 'int', nullable: false })
  classIdClass: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  grade: number;

  @Column({
    type: 'enum',
    enum: TypeGrade,
    default: TypeGrade.PRIMER_TRIMESTRE,
  })
  type_grade: TypeGrade;

  @CreateDateColumn({
    type: 'timestamp',
    nullable: false,
  })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    nullable: false,
  })
  updated_at: Date;

  @ManyToOne(() => Students, (student) => student.grades)
  student: Students;

  @ManyToOne(() => Classes, (classes) => classes.grades)
  class: Classes;
}
