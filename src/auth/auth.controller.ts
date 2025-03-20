import { Controller, Request, Post, UseGuards, Body, UnauthorizedException, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAdminDto } from './dto/request/register.admin.dto';
import { LoginAdminDto } from './dto/request/login.admin.dto';
import { LoginStudentDto } from './dto/request/login.student.dto';
import { BaseResponse } from '../_base/response/base.response';
import { Request as ExpressRequest } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() registerAdminDto: RegisterAdminDto) {
    return this.authService.register(registerAdminDto);
  }

  @Post('/admin/login')
  async login(@Body() loginAdminDto: LoginAdminDto) {
    return this.authService.loginAdmin(loginAdminDto);
  }

  @Post('/student/login')
  async loginStudent(@Body() loginStudentDto: LoginStudentDto) {
    return this.authService.loginStudent(loginStudentDto);
  } 

  @Post('logout')
  async logout(@Req() req: ExpressRequest) {
    const token = req.headers['authorization']?.split(' ')[1];
    
    // Token ve req nesnesini konsola yazdır
    console.log('Token:', token);
    console.log('Request Headers:', req.headers);

    if (token) {
      await this.authService.logout(token);
      return new BaseResponse(null, 'Başarıyla çıkış yapıldı', 200);
    } else {
      throw new UnauthorizedException(new BaseResponse(null, 'Token bulunamadı', 401));
    }
  }

}
