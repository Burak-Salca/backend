import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserRole } from '../_common/enums/auth.enums';
import { AdminsService } from '../admins/admins.service';
import { StudentsService } from '../students/students.service';
import { BaseResponse } from '../_base/response/base.response';

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
    });
  }

  async validate(payload: any) {
    console.log('Payload:', payload);
    let userRole: UserRole | null = null;
    try {
      if (payload.type === 'admin') {
        const admin = await this.adminsService.findById(payload.sub);
        console.log('Admin:', admin);
        if (admin) {
          userRole = admin.role;
        } else {
          throw new UnauthorizedException(new BaseResponse(null, 'Admin bulunamadı', 401));
        }
      } else if (payload.type === 'student') {
        const student = await this.studentsService.findById(payload.sub);
        console.log('Student:', student);
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
