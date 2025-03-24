import { Request } from 'express';

export interface RequestUser extends Request {
  user: {
    id: number;
    email: string;
    type: string;
  };
}  