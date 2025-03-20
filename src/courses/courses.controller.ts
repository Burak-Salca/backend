import { Controller, Get, Post, Body, Param, Delete, Put, UsePipes, ValidationPipe, HttpStatus, ParseIntPipe, UseGuards } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/request/create.course.dto';
import { UpdateCourseDto } from './dto/request/update.course.dto';
import { BaseResponse } from '../_base/response/base.response';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';
import { UserRole } from '../_common/enums/auth.enums';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Courses')
@ApiBearerAuth('access-token')
@Controller('courses')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  @Roles(UserRole.ADMIN)
  @UsePipes(ValidationPipe)
  async create(@Body() createCourseDto: CreateCourseDto) {
    const course = await this.coursesService.create(createCourseDto);
    return new BaseResponse(course, 'Kurs başarıyla oluşturuldu', HttpStatus.CREATED);
  }

  @Get()
  @Roles(UserRole.ADMIN, UserRole.STUDENT)
  async findAll() {
    const courses = await this.coursesService.findAll();
    return new BaseResponse(courses, 'Kurslar başarıyla listelendi', HttpStatus.OK);
  }

  @Get(':id')
  @Roles(UserRole.ADMIN)
  async findOne(@Param('id') id: string) {
    const course = await this.coursesService.findOne(+id);
    return new BaseResponse(course, 'Kurs başarıyla bulundu', HttpStatus.OK);
  }

  @Put(':id')
  @Roles(UserRole.ADMIN)
  @UsePipes(ValidationPipe)
  async update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    const course = await this.coursesService.update(+id, updateCourseDto);
    return new BaseResponse(course, 'Kurs başarıyla güncellendi', HttpStatus.OK);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  async remove(@Param('id') id: string) {
    const course = await this.coursesService.remove(+id);
    return new BaseResponse(course, 'Kurs başarıyla silindi', HttpStatus.OK);
  }

  @Get(':id/students')
  @Roles(UserRole.ADMIN)
  async getCourseStudents(@Param('id', ParseIntPipe) id: number) {
    const students = await this.coursesService.getCourseStudents(id);
    return new BaseResponse(students, `${id} id nolu derse kayıtlı öğrenciler başarıyla listelendi`, HttpStatus.OK);
  }
} 