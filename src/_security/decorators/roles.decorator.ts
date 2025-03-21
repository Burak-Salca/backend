import { SetMetadata } from '@nestjs/common';
import { UserType } from '../enums/type.enum';

export const Roles = (...types: UserType[]) => SetMetadata('types', types); 