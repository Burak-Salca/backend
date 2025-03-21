import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredTypes = this.reflector.getAllAndOverride<string[]>('types', [
      context.getHandler(),
      context.getClass(),
    ]);

    console.log('Required Types:', requiredTypes);
    const { user } = context.switchToHttp().getRequest();
    console.log('User in Guard:', user);

    if (!requiredTypes) {
      return true;
    }

    return requiredTypes.some((type) => user.type === type);
  }
}
