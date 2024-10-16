import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Classes } from './classes.entity';

export enum TypeSubject {
  COMUNIDAD_Y_SOCIEDAD = 'Comunidad y Sociedad',
  CIENCIA_TECNOLOGIA_Y_PRODUCCION = 'Ciencia, Tecnología y Producción',
  VIDA_TIERRA_Y_TERRITORIO = 'Vida, Tierra y Territorio',
  COSMOS_Y_PENSAMIENTO = 'Cosmos y Pensamiento',
}

@Entity()
export class Subjects {
  @PrimaryGeneratedColumn()
  id_subject: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  subject_name: string;

  @Column({
    type: 'enum',
    enum: TypeSubject,
    default: TypeSubject.COMUNIDAD_Y_SOCIEDAD,
  })
  type_subject: TypeSubject;

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
