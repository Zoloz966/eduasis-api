import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Students } from './students.entity';
import { Teachers } from './teachers.entity';
import { Classes } from './classes.entity';

@Entity()
export class Courses {
  @PrimaryGeneratedColumn()
  id_course: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  course_name: string;

  @Column({ type: 'varchar', length: 5, nullable: false })
  parallel: string;

  @Column({ type: 'int', nullable: false })
  age: number;

  @Column({ type: 'int', nullable: false })
  teacher_id: number;

  @OneToMany(() => Students, (student) => student.course)
  students: Students[];

  @OneToMany(() => Classes, (classes) => classes.course)
  classes: Classes[];

  @OneToOne(() => Teachers, (teacher) => teacher.course)
  @JoinColumn({ name: 'teacher_id' })
  teacher: Teachers;
}
