import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AdminsModule } from '../admins/admins.module';
import { StudentsModule } from '../students/students.module';
import { SecurityModule } from '../_security/security.module';

@Module({
  imports: [
    PassportModule,
    AdminsModule,
    StudentsModule,
    SecurityModule,
    JwtModule.register({
      secret: 'yourSecretKey',
      signOptions: { expiresIn: '60m' },
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
