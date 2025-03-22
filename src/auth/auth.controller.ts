import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAdminDto } from './dto/request/login.admin.dto';
import { LoginStudentDto } from './dto/request/login.student.dto';
import { RegisterAdminDto } from './dto/request/register.admin.dto';
import { RegisterStudentDto } from './dto/request/register.student.dto';
import { BaseResponse } from '../_base/response/base.response';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { JwtAuthGuard } from '../_security/guards/jwt.auth.guard';
import { RolesGuard } from '../_security/guards/roles.guard';
import { Roles } from '../_security/decorators/roles.decorator';
import { UserType } from '../_security/enums/type.enum';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('admin/register')
  async registerAdmin(@Body() registerAdminDto: RegisterAdminDto) {
    return this.authService.register(registerAdminDto);
  }

  @Post('student/register')
  async registerStudent(@Body() registerStudentDto: RegisterStudentDto) {
    return this.authService.registerStudent(registerStudentDto);
  }

  @Post('admin/login')
  async loginAdmin(@Body() loginAdminDto: LoginAdminDto) {
    return this.authService.loginAdmin(loginAdminDto);
  }

  @Post('student/login')
  async loginStudent(@Body() loginStudentDto: LoginStudentDto) {
    return this.authService.loginStudent(loginStudentDto);
  }

  @ApiBearerAuth('access-token')
  @Post('logout')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserType.ADMIN, UserType.STUDENT)
  async logout(@Req() req: Request) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return new BaseResponse(null, 'Token bulunamadı', 400);
    }
    return this.authService.logout(token);
  }
}

