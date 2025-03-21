import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentsModule } from './students/students.module';
import { CoursesModule } from './courses/courses.module';
import { AdminsModule } from './admins/admins.module';
import { AuthModule } from './auth/auth.module';
import { SecurityModule } from './_security/security.module';

import { Students } from './students/students.entity';
import { Admins } from './admins/admins.entity';
import { Courses } from './courses/courses.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const host = configService.get('DB_HOST');
        const port = configService.get('DB_PORT');
        const username = configService.get('DB_USERNAME');
        const password = configService.get('DB_PASSWORD');
        const database = configService.get('DB_NAME');

        if (!host || !port || !username || !password || !database) {
          throw new Error('Database configuration is missing');
        }

        return {
          type: 'postgres',
          host,
          port: parseInt(port, 10),
          username,
          password,
          database,
          entities: [Students, Admins, Courses],
          synchronize: true,
          logging: true,
        };
      },
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([Students, Admins, Courses]),
    StudentsModule,
    CoursesModule,
    AdminsModule,
    AuthModule,
    SecurityModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
