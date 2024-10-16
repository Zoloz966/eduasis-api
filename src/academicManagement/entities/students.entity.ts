import { Exclude } from 'class-transformer';
import { Role } from 'src/users/entities/role.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Classes } from './classes.entity';
import { Grades } from './grades.entity';
import { Tasks } from './tasks.entity';

export enum Gender {
  Masculino = 'Masculino',
  Femenino = 'Femenino',
}

@Entity()
export class Students {
  @PrimaryGeneratedColumn()
  id_student: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  lastname: string;

  @Column({ type: 'varchar', length: 20, default: '-' })
  id: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  email: string;

  @Exclude()
  @Column({ type: 'varchar', length: 100 })
  password: string;

  @Column({ type: 'int', nullable: false, default: 1 })
  roleIdRole: number;

  @Column({ type: 'varchar', length: 200, default: 'xxx' })
  token: string;

  @Column({ type: 'enum', enum: Gender, default: Gender.Masculino })
  gender: Gender;

  @Column({ type: 'varchar', length: 30, default: '+591' })
  code_country: string;

  @Column({ type: 'varchar', length: 36, nullable: false })
  tutor_phone: string;

  @Column({ type: 'timestamp', nullable: false })
  birth_date: Date;

  @Column({ nullable: true, type: 'varchar', length: 100, default: '' })
  photo: string;

  @Column({ type: 'tinyint', default: 1, comment: '1: enabled, 0: disabled' })
  isEnabled: number;

  @Column({ type: 'text' })
  info: string;

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

  @ManyToMany(() => Classes, (classes) => classes.students)
  @JoinTable()
  classes: Classes[];

  @ManyToOne(() => Role)
  role: Role;

  @OneToMany(() => Grades, (grade) => grade.student)
  grades: Grades[];

  @OneToMany(() => Tasks, (task) => task.student)
  tasks: Tasks[];
}
