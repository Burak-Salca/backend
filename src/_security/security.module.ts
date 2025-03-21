import { Module } from '@nestjs/common';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtAuthGuard } from './guards/jwt.auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { AdminsModule } from '../admins/admins.module';
import { StudentsModule } from '../students/students.module';

@Module({
  imports: [
    AdminsModule,
    StudentsModule,
  ],
  providers: [JwtStrategy, JwtAuthGuard, RolesGuard],
  exports: [JwtStrategy, JwtAuthGuard, RolesGuard],
})
export class SecurityModule {} 