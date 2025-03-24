import { Controller, Get, Post, Body, Param, Delete, Put, UsePipes, ValidationPipe, HttpStatus, ParseIntPipe, UseGuards, Patch } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/request/create.course.dto';
import { UpdateCourseDto } from './dto/request/update.course.dto';
import { BaseResponse } from '../_base/response/base.response';
import { Roles } from '../_security/decorators/roles.decorator';
import { RolesGuard } from '../_security/guards/roles.guard';
import { JwtAuthGuard } from '../_security/guards/jwt.auth.guard';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { UserType } from '../_security/enums/type.enum';

@ApiTags('Courses')
@ApiBearerAuth('access-token')
@Controller('courses')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  @Roles(UserType.ADMIN)
  @UsePipes(ValidationPipe)
  @ApiOperation({ summary: 'Yeni Kurs Oluştur', description: 'Admin yeni bir kurs oluşturabilir.' })
  async create(@Body() createCourseDto: CreateCourseDto) {
    const course = await this.coursesService.create(createCourseDto);
    return new BaseResponse(course, 'Kurs başarıyla oluşturuldu', HttpStatus.CREATED);
  }

  @Get()
  @Roles(UserType.ADMIN, UserType.STUDENT)
  @ApiOperation({ summary: 'Tüm Kursları Listele', description: 'Admin veya öğrenci tüm kursları listeleyebilir.' })
  async findAll() {
    const courses = await this.coursesService.findAll();
    return new BaseResponse(courses, 'Kurslar başarıyla listelendi', HttpStatus.OK);
  }

  @Get(':courseId')
  @Roles(UserType.ADMIN)
  @ApiOperation({ summary: 'Kurs Detayı', description: 'Admin bir kursun detayını görüntüleyebilir.' })
  async findOne(@Param('courseId') id: string) {
    const course = await this.coursesService.findOne(+id);
    return new BaseResponse(course, 'Kurs başarıyla bulundu', HttpStatus.OK);
  }

  @Patch(':courseId')
  @Roles(UserType.ADMIN)
  @UsePipes(ValidationPipe)
  @ApiOperation({ summary: 'Kursu Güncelle', description: 'Admin bir kursu güncelleyebilir.' })
  async update(@Param('courseId') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    const course = await this.coursesService.update(+id, updateCourseDto);
    return new BaseResponse(course, 'Kurs başarıyla güncellendi', HttpStatus.OK);
  }

  @Delete(':courseId')
  @Roles(UserType.ADMIN)
  @ApiOperation({ summary: 'Kursu Sil', description: 'Admin bir kursu silebilir.' })
  async remove(@Param('courseId') id: string) {
    const course = await this.coursesService.remove(+id);
    return new BaseResponse(course, 'Kurs başarıyla silindi', HttpStatus.OK);
  }

  @Get(':courseId/students')
  @Roles(UserType.ADMIN)
  @ApiOperation({ summary: 'Kursun Öğrencilerini Listele', description: 'Admin bir kursun öğrencilerini listeleyebilir.' })
  async getCourseStudents(@Param('courseId', ParseIntPipe) id: number) {
    const students = await this.coursesService.getCourseStudents(id);
    return new BaseResponse(students, `Kayıtlı öğrenciler başarıyla listelendi`, HttpStatus.OK);
  }
} 