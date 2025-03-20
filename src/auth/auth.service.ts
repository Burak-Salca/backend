import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { AdminsService } from '../admins/admins.service';
import { Users } from '../users/users.entity';
import { RegisterAdminDto } from './dto/request/register.admin.dto';
import { UserRole } from '../_common/enums/auth.enums';
import { LoginAdminDto } from './dto/request/login.admin.dto';
import * as bcrypt from 'bcrypt';
import { BaseResponse } from '../_base/response/base.response';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private adminsService: AdminsService,
    private jwtService: JwtService,
  ) {}

  async register(registerAdminDto: RegisterAdminDto) {
    return this.adminsService.create(registerAdminDto);
  }
  
  async login(loginAdminDto: LoginAdminDto) {
    const { email, password } = loginAdminDto;
    const admin = await this.adminsService.findByEmail(email);

    if (!admin || !(await bcrypt.compare(password, admin.password))) {
      return new BaseResponse(null, 'Geçersiz e-posta veya şifre', 401);
    }

    const payload = { email: admin.email, sub: admin.id };
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

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
  
  async logout(user: any): Promise<{ message: string }> {
    // Sunucu tarafında bir işlem yapmak istiyorsanız buraya ekleyin
    // Örneğin, token'ı bir kara listeye ekleyebilirsiniz
    return { message: 'Başarıyla çıkış yapıldı' };
  }
}
