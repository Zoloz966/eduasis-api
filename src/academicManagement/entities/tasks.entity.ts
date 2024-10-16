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

@Entity()
export class Tasks {
  @PrimaryGeneratedColumn()
  id_task: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  task_tittle: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'int', nullable: false })
  classIdClass: number;

  @Column({ type: 'int', nullable: false })
  studentIdStudent: number;

  @Column({ type: 'timestamp', nullable: false })
  end_date: Date;

  @Column({
    type: 'tinyint',
    default: 0,
    comment: '1: complete, 0: incomplete',
  })
  isCompleted: number;

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

  @ManyToOne(() => Students, (student) => student.tasks)
  student: Students;

  @ManyToOne(() => Classes, (classes) => classes.tasks)
  class: Classes;
}
