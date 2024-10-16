import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export enum Shift {
  Mañana = 'Mañana',
  Tarde = 'Tarde',
  Nocturno = 'Nocturno',
}

@Entity()
export class Classes {
  @PrimaryGeneratedColumn()
  id_class: number;

  @Column({ type: 'int', nullable: true })
  teacherIdTeacher: number;

  @Column({ type: 'int', nullable: false })
  subjectIdSubject: number;

  @Column({ type: 'int', nullable: false })
  age: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  class_name: string;

  @Column({ type: 'enum', enum: Shift, default: Shift.Mañana })
  shift: Shift;

  @Column({ type: 'tinyint', default: 1, comment: '1: active, 0: delete' })
  status: number;

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
