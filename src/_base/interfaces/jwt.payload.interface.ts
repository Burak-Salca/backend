import { UserType } from "../../_security/enums/type.enum";

export interface JwtPayload {
  sub: number;
  email: string;
  type: UserType;
} 