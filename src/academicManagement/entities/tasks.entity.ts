import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Tasks {
  @PrimaryGeneratedColumn()
  id_task: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  task_tittle: string;

  @Column({ type: 'text' })
  description: string;

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
}
