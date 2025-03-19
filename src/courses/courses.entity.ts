import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, OneToMany } from 'typeorm';
import { Students } from '../students/students.entity';

@Entity()
export class Courses {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, unique: true })
  name: string;

  @Column('text')
  content: string;

  @ManyToMany(() => Students, student => student.courses)
  students: Students[];
}