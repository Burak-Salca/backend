import { Module } from '@nestjs/common';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { Courses } from './courses.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Students } from 'src/students/students.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Courses, Students])],
  controllers: [CoursesController],
  providers: [CoursesService]
})
export class CoursesModule {} 