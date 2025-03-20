import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { UserRole } from '../_common/enums/auth.enums';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.STUDENT,
  })
  role: UserRole;
}

export default Users;
