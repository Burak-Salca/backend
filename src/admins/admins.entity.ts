import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Admins {
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
} 