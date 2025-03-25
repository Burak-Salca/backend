import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { AdminsService } from '../../admins/admins.service';
import { StudentsService } from '../../students/students.service';
import { BaseResponse } from '../../_base/response/base.response';
import { tokenBlacklist } from '../../auth/auth.service';
import { UserType } from '../enums/type.enum';
import { Request } from 'express';
import { JwtPayload } from '../../_base/interfaces/jwt.payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly adminsService: AdminsService,
    private readonly studentsService: StudentsService,
    private readonly configService: ConfigService,
  ) {
    const jwtSecret = configService.get<string>('JWT_SECRET');
    if (!jwtSecret) {
      throw new Error('JWT_SECRET is not defined in environment variables');
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtSecret,
      passReqToCallback: true,
    } as any);
  }

  async validate(req: Request, payload: JwtPayload) {
    const token = req.headers.authorization?.split(' ')[1];
    
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

      const user = {
        id: payload.sub,
        email: payload.email,
        type: payload.type
      };
      return user;
      
    } catch (error) {
      throw new UnauthorizedException(new BaseResponse(null, 'Kullanıcı bulunamadı veya yetkisiz', 401));
    }
  }
} 