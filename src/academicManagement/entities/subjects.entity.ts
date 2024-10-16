import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Classes } from './classes.entity';

@Entity()
export class Subjects {
  @PrimaryGeneratedColumn()
  id_subject: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  subject_name: string;

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

  @OneToMany(() => Classes, (classes) => classes.subject)
  classes: Classes[];
}
