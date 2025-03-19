import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { Courses } from '../courses/courses.entity';

@Entity()
export class Students {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  firstName: string;

  @Column({ length: 50 })
  lastName: string;

  @Column({ length: 100, unique: true })
  email: string;

  @Column({ length: 255 })
  password: string;

  @Column({ type: 'date' })
  birthDate: Date;

  @ManyToMany(() => Courses, course => course.students)
  @JoinTable()
  courses: Courses[];
}