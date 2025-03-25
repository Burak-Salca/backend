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

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    
    if (!requiredTypes) {
      return true;
    }

    if (!user || !user.type) {
      throw new UnauthorizedException(
        new BaseResponse(
          null,
          'Kullanıcı bilgisi bulunamadı',
          401
        )
      );
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