import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AdminsService } from '../admins/admins.service';
import { RegisterAdminDto } from './dto/request/register.admin.dto';
import * as bcrypt from 'bcrypt';
import { BaseResponse } from '../_base/response/base.response';
import { StudentsService } from '../students/students.service';
import { LoginStudentDto } from './dto/request/login.student.dto';
import { LoginAdminDto } from './dto/request/login.admin.dto';
import { UserType } from '../_security/enums/type.enum';
import { RegisterStudentDto } from './dto/request/register.student.dto';

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
    return new BaseResponse(admin, 'Admin başarıyla kaydedildi', 201);
  }
  
  async loginAdmin(loginAdminDto: LoginAdminDto) {
    const admin = await this.adminsService.findByEmail(loginAdminDto.email);
    if (!admin) {
      throw new UnauthorizedException(new BaseResponse(null, 'Kullanıcı adı veya şifre hatalı', 401));
    }

    const isPasswordValid = await bcrypt.compare(loginAdminDto.password, admin.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException(new BaseResponse(null, 'Kullanıcı adı veya şifre hatalı', 401));
    }

    const payload = {
      email: admin.email,
      sub: admin.id,
      type: UserType.ADMIN
    };

    const token = this.jwtService.sign(payload);

    return {
      access_token: token,
      user: {
        id: admin.id,
        email: admin.email,
        firstName: admin.firstName,
        lastName: admin.lastName,
        type: UserType.ADMIN
      }
    };
  }

  async loginStudent(loginStudentDto: LoginStudentDto) {
    const student = await this.studentService.findByEmail(loginStudentDto.email);
    if (!student) {
      throw new UnauthorizedException(new BaseResponse(null, 'Kullanıcı adı veya şifre hatalı', 401));
    }

    const isPasswordValid = await bcrypt.compare(loginStudentDto.password, student.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException(new BaseResponse(null, 'Kullanıcı adı veya şifre hatalı', 401));
    }

    const payload = {
      email: student.email,
      sub: student.id,
      type: UserType.STUDENT
    };

    const token = this.jwtService.sign(payload);

    return {
      access_token: token,
      user: {
        id: student.id,
        email: student.email,
        firstName: student.firstName,
        lastName: student.lastName,
        type: UserType.STUDENT
      }
    };
  }

  async logout(token: string) {
    tokenBlacklist.add(token);
    return new BaseResponse(null, 'Başarıyla çıkış yapıldı', 200);
  }

  async registerStudent(registerStudentDto: RegisterStudentDto) {
    const student = await this.studentService.create(registerStudentDto);
    return new BaseResponse(student, 'Öğrenci başarıyla kaydedildi', 201);
  }

}
