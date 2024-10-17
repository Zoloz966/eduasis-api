import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Teachers } from './teachers.entity';
import { Subjects } from './subjects.entity';
import { Students } from './students.entity';
import { Grades } from './grades.entity';
import { Tasks } from './tasks.entity';
import { Courses } from './courses.entity';

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
  courseIdCourse: number;

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

  @ManyToMany(() => Students, (student) => student.classes)
  students: Students[];

  @ManyToOne(() => Teachers, (teacher) => teacher.classes)
  teacher: Teachers;

  @ManyToOne(() => Subjects, (subject) => subject.classes)
  subject: Subjects;

  @ManyToOne(() => Courses, (course) => course.classes)
  course: Courses;

  @OneToMany(() => Grades, (grade) => grade.class)
  grades: Grades[];

  @OneToMany(() => Tasks, (task) => task.class)
  tasks: Tasks[];
}
