import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';
import { Students } from './students.entity';
import { Courses } from 'src/courses/courses.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Students, Courses])],
  controllers: [StudentsController],
  providers: [StudentsService],
  exports: [StudentsService],
})
export class StudentsModule {}
