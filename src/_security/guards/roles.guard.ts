import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserType } from '../enums/type.enum';
import { BaseResponse } from '../../_base/response/base.response';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredTypes = this.reflector.getAllAndOverride<UserType[]>('types', [
      context.getHandler(),
      context.getClass(),
    ]);

    console.log('Required Types:', requiredTypes);
    const { user } = context.switchToHttp().getRequest();
    console.log('User in Guard:', user);

    if (!requiredTypes) {
      return true;
    }

    const hasPermission = requiredTypes.some((type) => user.type === type);
    
    if (!hasPermission) {
      throw new UnauthorizedException(
        new BaseResponse(
          null,
          'Bu işlem için yetkiniz bulunmamaktadır',
          403
        )
      );
    }

    return true;
  }
} 