import { Controller, Get, Post, Body, Param, Delete, Put, UsePipes, ValidationPipe, HttpStatus } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/request/create.course.dto';
import { UpdateCourseDto } from './dto/request/update.course.dto';
import { BaseResponse } from '../_base/response/base.response';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async create(@Body() createCourseDto: CreateCourseDto) {
    const course = await this.coursesService.create(createCourseDto);
    return new BaseResponse(course, 'Kurs başarıyla oluşturuldu', HttpStatus.CREATED);
  }

  @Get()
  async findAll() {
    const courses = await this.coursesService.findAll();
    return new BaseResponse(courses, 'Kurslar başarıyla listelendi', HttpStatus.OK);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const course = await this.coursesService.findOne(+id);
    return new BaseResponse(course, 'Kurs başarıyla bulundu', HttpStatus.OK);
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  async update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    const course = await this.coursesService.update(+id, updateCourseDto);
    return new BaseResponse(course, 'Kurs başarıyla güncellendi', HttpStatus.OK);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const course = await this.coursesService.remove(+id);
    return new BaseResponse(course, 'Kurs başarıyla silindi', HttpStatus.OK);
  }
} 