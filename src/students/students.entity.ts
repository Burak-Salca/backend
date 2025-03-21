import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToMany } from 'typeorm';
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

  @ManyToMany(() => Courses, course => course.students)
  @JoinTable({name: 'students_courses'})
  courses: Courses[];
} 
