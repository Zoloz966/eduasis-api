import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

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
  student_id: number;

  @Column({ type: 'int', nullable: false })
  class_id: number;

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
}
