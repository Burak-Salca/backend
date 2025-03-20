import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserRole } from '../_common/enums/auth.enums';
import { AdminsService } from '../admins/admins.service';
import { StudentsService } from '../students/students.service';
import { BaseResponse } from '../_base/response/base.response';
import { tokenBlacklist } from './auth.service';
import { Request as ExpressRequest } from 'express';

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

  async validate(req: ExpressRequest, payload: any) {
    const token = req.headers['authorization']?.split(' ')[1];
    
    // Token ve tokenBlacklist durumunu konsola yazdır
    console.log('Payload:', payload);
    console.log('Current Token:', token);
    console.log('Token Blacklist:', Array.from(tokenBlacklist));

    if (token && tokenBlacklist.has(token)) {
      throw new UnauthorizedException(new BaseResponse(null, 'Token geçersiz', 401));
    }
    
    let userRole: UserRole | null = null;
    try {
      if (payload.type === 'admin') {
        const admin = await this.adminsService.findById(payload.sub);
        if (admin) {
          userRole = admin.role;
        } else {
          throw new UnauthorizedException(new BaseResponse(null, 'Admin bulunamadı', 401));
        }
      } else if (payload.type === 'student') {
        const student = await this.studentsService.findById(payload.sub);
        if (student) {
          userRole = student.role;
        } else {
          throw new UnauthorizedException(new BaseResponse(null, 'Öğrenci bulunamadı', 401));
        }
      }
    } catch (error) {
      throw new UnauthorizedException(new BaseResponse(null, 'Kullanıcı bulunamadı veya yetkisiz', 401));
    }

    if (!userRole) {
      throw new UnauthorizedException(new BaseResponse(null, 'Rol atanamadı', 401));
    }
    return { userId: payload.sub, email: payload.email, role: userRole };
  }
}
