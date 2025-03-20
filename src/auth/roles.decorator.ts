import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../_common/enums/auth.enums';

export const Roles = (...roles: UserRole[]) => SetMetadata('roles', roles);
