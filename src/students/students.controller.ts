import { Controller, Get, Post, Body, Param, Delete, Put, UsePipes, ValidationPipe, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/request/create.student.dto';
import { BaseResponse } from 'src/_base/response/base.response';
import { UpdateStudentDTO } from './dto/request/update.student.dto';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async create(@Body() createStudentDto: CreateStudentDto) {
    const student = await this.studentsService.create(createStudentDto);
    return new BaseResponse(student, 'Öğrenci başarıyla oluşturuldu', HttpStatus.CREATED);
  }

  @Get()
  async findAll() {
    const students = await this.studentsService.findAll();
    return new BaseResponse(students, 'Öğrenciler başarıyla listelendi', HttpStatus.OK);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const student = await this.studentsService.findOne(+id);
    return new BaseResponse(student, 'Öğrenci başarıyla bulundu', HttpStatus.OK);
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  async update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDTO) {
    const student = await this.studentsService.update(+id, updateStudentDto);
    return new BaseResponse(student, 'Öğrenci başarıyla güncellendi', HttpStatus.OK);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const student = await this.studentsService.remove(+id);
    return new BaseResponse(student, 'Öğrenci başarıyla silindi', HttpStatus.OK);
  }

  @Post(':studentId/courses/:courseId')
  async addCourse(@Param('studentId') studentId: string, @Param('courseId') courseId: string) {
    const student = await this.studentsService.addCourse(+studentId, +courseId);
    return new BaseResponse(student, 'Kursa başarıyla kayıt olundu', HttpStatus.OK);
  }

  @Delete(':studentId/courses/:courseId')
  async removeCourse(@Param('studentId') studentId: string, @Param('courseId') courseId: string) {
    const student = await this.studentsService.removeCourse(+studentId, +courseId);
    return new BaseResponse(student, 'Kurs kaydı başaraılı bir şekilde silindi', HttpStatus.OK);
  }

  @Get(':id/courses')
  async getStudentCourses(@Param('id', ParseIntPipe) id: number) {
    const courses = await this.studentsService.getStudentCourses(id);
    return new BaseResponse(courses, `Id no:${id} olan öğrencinin kayıtlı olduğu dersler başarıyla listelendi`, HttpStatus.OK);
  }
}
