import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAdminDto } from './dto/request/register.admin.dto';
import { LoginAdminDto } from './dto/request/login.admin.dto';
import { LoginStudentDto } from './dto/request/login.student.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() registerAdminDto: RegisterAdminDto) {
    const user = await this.authService.register(registerAdminDto);
    return { message: 'Admin başarıyla kaydedildi', user };
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
  async logout(@Request() req) {
    return this.authService.logout(req.user);
  }

}
