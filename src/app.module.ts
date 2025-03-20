import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentsModule } from './students/students.module';
import { CoursesModule } from './courses/courses.module';
import { AdminsModule } from './admins/admins.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

import { Students } from './students/students.entity';
import { Admins } from './admins/admins.entity';
import { Courses } from './courses/courses.entity';
import Users from './users/users.entity';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234',
      database: 'student_management_db',
      entities: [Students, Admins, Courses, Users],
      synchronize: true,
      logging: true,
    }),
    TypeOrmModule.forFeature([Students, Admins, Courses, Users]),
    StudentsModule,
    CoursesModule,
    AdminsModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
