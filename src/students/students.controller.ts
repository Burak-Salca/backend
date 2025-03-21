import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/request/create.student.dto';
import { UpdateStudentDTO } from './dto/request/update.student.dto';
import { JwtAuthGuard } from '../_security/guards/jwt.auth.guard';
import { RolesGuard } from '../_security/guards/roles.guard';
import { Roles } from '../_security/decorators/roles.decorator';
import { BaseResponse } from '../_base/response/base.response';
import { Request } from 'express';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { UserType } from '../_security/enums/type.enum';

interface RequestWithUser extends Request {
  user: {
    sub: number;
    email: string;
    type: string;
  }
}

@ApiTags('Students')
@ApiBearerAuth('access-token')
@Controller('students')
@UseGuards(JwtAuthGuard, RolesGuard)
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}
  
  @Get('profile')
  @Roles(UserType.STUDENT)
  async getProfile(@Req() req: RequestWithUser) {
    /*console.log('JWT User Info:', {
      id: req.user.sub,
      email: req.user.email,
      type: req.user.type
    });*/

    const student = await this.studentsService.findById(req.user.sub);
    /*console.log('Found Student:', {
      id: student.id,
      email: student.email,
      firstName: student.firstName,
      lastName: student.lastName
    });*/

    return new BaseResponse(student, 'Profil bilgileri getirildi', 200);
  }

  @Patch('profile/update')
  @Roles(UserType.STUDENT)    
  async updateProfile(@Req() req: RequestWithUser, @Body() updateStudentDto: UpdateStudentDTO) {
    /*console.log('Update Profile - User Info:', {
      sub: req.user.sub,
      email: req.user.email,
      type: req.user.type,
    });*/

    const student = await this.studentsService.update(req.user.sub, updateStudentDto);
    return new BaseResponse(student, 'Profil bilgileri güncellendi', 200);
  }

  @Get('profile/myCourses')
  @Roles(UserType.STUDENT)
  async getStudentCourses(@Req() req: RequestWithUser) {
    /*console.log('JWT User Info for Courses:', {
      id: req.user.sub,
      email: req.user.email,
      type: req.user.type
    });*/

    const courses = await this.studentsService.getStudentCourses(req.user.sub);
    /*console.log('Found Courses for Student:', {
      studentId: req.user.sub,
      coursesCount: courses.length,
      courses: courses.map(c => ({ id: c.id, name: c.name }))
    });*/

    return new BaseResponse(courses, 'Kurslarınız başarıyla listelendi', 200);
  }

  @Post('profile/courses/:courseId')
  @Roles(UserType.STUDENT)
  async enrollCourse(@Req() req: RequestWithUser, @Param('courseId') courseId: number) {
    const student = await this.studentsService.addCourse(req.user.sub, courseId);
    return new BaseResponse(student, 'Kursa başarıyla kaydoldunuz', 200);
  }

  @Delete('profile/courses/:courseId')
  @Roles(UserType.STUDENT)
  async unenrollCourse(@Req() req: RequestWithUser, @Param('courseId') courseId: number) {
    const removedCourse = await this.studentsService.removeCourse(req.user.sub, courseId);
    return new BaseResponse(removedCourse, 'Kurs kaydınız başarıyla silindi', 200);
  }

  @Post()
  @Roles(UserType.ADMIN)
  async create(@Body() createStudentDto: CreateStudentDto) {
    const student = await this.studentsService.create(createStudentDto);
    return new BaseResponse(student, 'Öğrenci başarıyla oluşturuldu', 201);
  }

  @Get()
  @Roles(UserType.ADMIN)
  async findAll() {
    const students = await this.studentsService.findAll();
    return new BaseResponse(students, 'Öğrenciler başarıyla listelendi', 200);
  }

  @Patch(':id')
  @Roles(UserType.ADMIN)
  async updateStudent(@Param('id') id: number, @Body() updateStudentDto: UpdateStudentDTO) {
    const student = await this.studentsService.update(id, updateStudentDto);
    return new BaseResponse(student, 'Öğrenci bilgileri güncellendi', 200);
  }

  @Delete(':id')
  @Roles(UserType.ADMIN)
  async remove(@Param('id') id: number) {
    const student = await this.studentsService.remove(id);
    return new BaseResponse(student, 'Öğrenci başarıyla silindi', 200);
  }

  @Post(':studentId/admin/courses/:courseId')
  @Roles(UserType.ADMIN)
  async adminAddCourse(
    @Param('studentId') studentId: number,
    @Param('courseId') courseId: number
  ) {
    const student = await this.studentsService.addCourse(studentId, courseId);
    return new BaseResponse(student, 'Öğrenciye ders başarıyla atandı', 200);
  }

  @Delete(':studentId/admin/courses/:courseId')
  @Roles(UserType.ADMIN)
  async adminRemoveCourse(
    @Param('studentId') studentId: number,
    @Param('courseId') courseId: number
  ) {
    const removedCourse = await this.studentsService.removeCourse(studentId, courseId);
    return new BaseResponse(removedCourse, 'Öğrencinin ders kaydı silindi', 200);
  }

  @Get(':studentId/courses')
  @Roles(UserType.ADMIN)
  async getStudentCoursesById(@Param('studentId') studentId: number) {
    const courses = await this.studentsService.getStudentCourses(studentId);
    return new BaseResponse(courses, `${studentId} ID'li öğrencinin dersleri başarıyla listelendi`, 200);
  }
}
