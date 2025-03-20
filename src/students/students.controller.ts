import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/request/create.student.dto';
import { UpdateStudentDTO } from './dto/request/update.student.dto';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../_common/enums/auth.enums';
import { BaseResponse } from '../_base/response/base.response';
import { Request } from 'express';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

interface RequestWithUser extends Request {
  user: {
    sub: number;
    email: string;
    type: string;
    role: UserRole;
  }
}

@ApiTags('Students')
@ApiBearerAuth('access-token')
@Controller('students')
@UseGuards(JwtAuthGuard, RolesGuard)
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  // Öğrenci endpoint'lerini başa alalım (admin endpoint'lerinden önce)
  
  // Öğrenci: Kendi profilini görüntüleme
  @Get('profile')
  @Roles(UserRole.STUDENT)
  async getProfile(@Req() req: RequestWithUser) {
    console.log('JWT User Info:', {
      id: req.user.sub,
      email: req.user.email,
      type: req.user.type
    });

    const student = await this.studentsService.findById(req.user.sub);
    console.log('Found Student:', {
      id: student.id,
      email: student.email,
      firstName: student.firstName,
      lastName: student.lastName
    });

    return new BaseResponse(student, 'Profil bilgileri getirildi', 200);
  }

  // Öğrenci: Kendi profilini güncelleme
  @Patch('profile/update')
  @Roles(UserRole.STUDENT)
  async updateProfile(@Req() req: RequestWithUser, @Body() updateStudentDto: UpdateStudentDTO) {
    console.log('Update Profile - User Info:', {
      sub: req.user.sub,
      email: req.user.email,
      type: req.user.type,
      role: req.user.role
    });

    const student = await this.studentsService.update(req.user.sub, updateStudentDto);
    return new BaseResponse(student, 'Profil bilgileri güncellendi', 200);
  }

  // Öğrenci: Kendi kurslarını görüntüleme
  @Get('profile/myCourses')
  @Roles(UserRole.STUDENT)
  async getStudentCourses(@Req() req: RequestWithUser) {
    console.log('JWT User Info for Courses:', {
      id: req.user.sub,
      email: req.user.email,
      type: req.user.type
    });

    const courses = await this.studentsService.getStudentCourses(req.user.sub);
    console.log('Found Courses for Student:', {
      studentId: req.user.sub,
      coursesCount: courses.length,
      courses: courses.map(c => ({ id: c.id, name: c.name }))
    });

    return new BaseResponse(courses, 'Kurslarınız başarıyla listelendi', 200);
  }

  // Öğrenci: Kursa kaydolma
  @Post('profile/courses/:courseId')
  @Roles(UserRole.STUDENT)
  async enrollCourse(@Req() req: RequestWithUser, @Param('courseId') courseId: string) {
    const student = await this.studentsService.addCourse(req.user.sub, +courseId);
    return new BaseResponse(student, 'Kursa başarıyla kaydoldunuz', 200);
  }

  // Öğrenci: Kurs kaydını silme
  @Delete('profile/courses/:courseId')
  @Roles(UserRole.STUDENT)
  async unenrollCourse(@Req() req: RequestWithUser, @Param('courseId') courseId: string) {
    const removedCourse = await this.studentsService.removeCourse(req.user.sub, +courseId);
    return new BaseResponse(removedCourse, 'Kurs kaydınız başarıyla silindi', 200);
  }

  // ADMIN YETKİLERİ
  
  // Admin: Öğrenci oluşturma
  @Post()
  @Roles(UserRole.ADMIN)
  async create(@Body() createStudentDto: CreateStudentDto) {
    const student = await this.studentsService.create(createStudentDto);
    return new BaseResponse(student, 'Öğrenci başarıyla oluşturuldu', 201);
  }

  // Admin: Tüm öğrencileri listeleme
  @Get()
  @Roles(UserRole.ADMIN)
  async findAll() {
    const students = await this.studentsService.findAll();
    return new BaseResponse(students, 'Öğrenciler başarıyla listelendi', 200);
  }

  // Admin: Öğrenci bilgilerini güncelleme
  @Patch(':id')
  @Roles(UserRole.ADMIN)
  async updateStudent(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDTO) {
    const student = await this.studentsService.update(+id, updateStudentDto);
    return new BaseResponse(student, 'Öğrenci bilgileri güncellendi', 200);
  }

  // Admin: Öğrenci silme
  @Delete(':id')
  @Roles(UserRole.ADMIN)
  async remove(@Param('id') id: string) {
    const student = await this.studentsService.remove(+id);
    return new BaseResponse(student, 'Öğrenci başarıyla silindi', 200);
  }

  // Admin: Öğrenciye ders atama
  @Post(':studentId/admin/courses/:courseId')
  @Roles(UserRole.ADMIN)
  async adminAddCourse(
    @Param('studentId') studentId: string,
    @Param('courseId') courseId: string
  ) {
    const student = await this.studentsService.addCourse(+studentId, +courseId);
    return new BaseResponse(student, 'Öğrenciye ders başarıyla atandı', 200);
  }

  // Admin: Öğrencinin ders kaydını silme
  @Delete(':studentId/admin/courses/:courseId')
  @Roles(UserRole.ADMIN)
  async adminRemoveCourse(
    @Param('studentId') studentId: string,
    @Param('courseId') courseId: string
  ) {
    const removedCourse = await this.studentsService.removeCourse(+studentId, +courseId);
    return new BaseResponse(removedCourse, 'Öğrencinin ders kaydı silindi', 200);
  }

  // Admin: Belirli bir öğrencinin derslerini listeleme
  @Get(':studentId/courses')
  @Roles(UserRole.ADMIN)
  async getStudentCoursesById(@Param('studentId') studentId: string) {
    const courses = await this.studentsService.getStudentCourses(+studentId);
    return new BaseResponse(courses, `${studentId} ID'li öğrencinin dersleri başarıyla listelendi`, 200);
  }
}
