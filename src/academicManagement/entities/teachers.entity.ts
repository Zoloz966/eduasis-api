import { Exclude } from 'class-transformer';
import { Role } from 'src/users/entities/role.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Gender } from './students.entity';

@Entity()
export class Teachers {
  @PrimaryGeneratedColumn()
  id_teacher: number;

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
  phone: string;

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

  @ManyToOne(() => Role)
  role: Role;
}
