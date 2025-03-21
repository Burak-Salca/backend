import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AdminsService } from '../../admins/admins.service';
import { StudentsService } from '../../students/students.service';
import { BaseResponse } from '../../_base/response/base.response';
import { tokenBlacklist } from '../../auth/auth.service';
import { UserType } from '../enums/type.enum';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly adminsService: AdminsService,
    private readonly studentsService: StudentsService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'yourSecretKey',
      passReqToCallback: true
    });
  }

  async validate(req: any, payload: any) {
    console.log('JWT Strategy - Incoming payload:', payload);

    const token = req.headers.authorization?.split(' ')[1];
    console.log('Current token:', token);

    if (token && tokenBlacklist.has(token)) {
      throw new UnauthorizedException(new BaseResponse(null, 'Token geçersiz', 401));
    }
    
    try {
      if (payload.type === UserType.ADMIN) {
        const admin = await this.adminsService.findById(payload.sub);
        if (!admin) {
          throw new UnauthorizedException(new BaseResponse(null, 'Admin bulunamadı', 401));
        }
      } 
      else if (payload.type === UserType.STUDENT) {
        const student = await this.studentsService.findById(payload.sub);
        if (!student) {
          throw new UnauthorizedException(new BaseResponse(null, 'Öğrenci bulunamadı', 401));
        }
      }
      else {
        throw new UnauthorizedException(new BaseResponse(null, 'Geçersiz kullanıcı tipi', 401));
      }

      return {
        sub: payload.sub,
        email: payload.email,
        type: payload.type
      };
      
    } catch (error) {
      console.error('Validation error:', error);
      throw new UnauthorizedException(new BaseResponse(null, 'Kullanıcı bulunamadı veya yetkisiz', 401));
    }
  }
} 