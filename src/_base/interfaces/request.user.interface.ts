import { Request } from 'express';
import { UserType } from '../../_security/enums/type.enum';

export interface RequestUser extends Request {
  user: {
    id: number;
    email: string;
    type: UserType;
  };
}  