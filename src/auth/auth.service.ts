import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AdminsService } from '../admins/admins.service';
import { RegisterAdminDto } from './dto/request/register.admin.dto';
import * as bcrypt from 'bcrypt';
import { BaseResponse } from '../_base/response/base.response';
import { StudentsService } from 'src/students/students.service';
import { LoginStudentDto } from './dto/request/login.student.dto';
import { LoginAdminDto } from './dto/request/login.admin.dto';


export const tokenBlacklist = new Set<string>();

@Injectable()
export class AuthService {
  constructor(
    private adminsService: AdminsService,
    private studentService: StudentsService,
    private jwtService: JwtService,
  ) {}

  async register(registerAdminDto: RegisterAdminDto) {
    const admin = await this.adminsService.create(registerAdminDto);

    return new BaseResponse({
      id: admin.id,
      firstName: admin.firstName,
      lastName: admin.lastName,
      email: admin.email,
    }, 'Admin başarıyla kaydedildi', 201);
  }
  
  async loginAdmin(loginAdminDto: LoginAdminDto) {
    const { email, password } = loginAdminDto;
    const admin = await this.adminsService.findByEmail(email);

    if (!admin || !(await bcrypt.compare(password, admin.password))) {
      return new BaseResponse(null, 'Geçersiz e-posta veya şifre', 401);
    }

    const payload = { email: admin.email, sub: admin.id, type: 'admin' };
    const accessToken = this.jwtService.sign(payload);

    return new BaseResponse({
      access_token: accessToken,
      admin: {
        id: admin.id,
        firstName: admin.firstName,
        lastName: admin.lastName,
        email: admin.email,
      },
    }, 'Giriş başarılı', 200);
  }

  async loginStudent(loginStudentDto: LoginStudentDto) {
    const { email, password } = loginStudentDto;
    const student = await this.studentService.findByEmail(email);

    if (!student || !(await bcrypt.compare(password, student.password))) {
      return new BaseResponse(null, 'Geçersiz e-posta veya şifre', 401);
    }

    const payload = { email: student.email, sub: student.id, type: 'student' };
    const accessToken = this.jwtService.sign(payload);

    return new BaseResponse({
      access_token: accessToken,
      student: {
        id: student.id,
        firstName: student.firstName,
        lastName: student.lastName,
        email: student.email,
      },
    }, 'Giriş başarılı', 200);
  }

  async logout(token: string) {
    tokenBlacklist.add(token);
    return new BaseResponse(null, 'Başarıyla çıkış yapıldı', 200);
  }

}
