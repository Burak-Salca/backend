import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/request/create.student.dto';
import { UpdateStudentDTO } from './dto/request/update.student.dto';
import { JwtAuthGuard } from '../_security/guards/jwt.auth.guard';
import { RolesGuard } from '../_security/guards/roles.guard';
import { Roles } from '../_security/decorators/roles.decorator';
import { BaseResponse } from '../_base/response/base.response';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { UserType } from '../_security/enums/type.enum';
import { StudentCourseRelation } from '../_base/interfaces/student.course.relation.interface';
import { RequestUser } from '../_base/interfaces/request.user.interface';


@ApiTags('Students')
@ApiBearerAuth('access-token')
@Controller('students')
@UseGuards(JwtAuthGuard, RolesGuard)
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}
  
  @Get('profile')
  @Roles(UserType.STUDENT)
  @ApiOperation({ summary: 'Öğrenci Profili', description: 'Öğrenci kendi profil bilgilerini görüntüleyebilir.' })
  async getProfile(@Req() req: RequestUser) {
    const student = await this.studentsService.findById(req.user.id);
    return new BaseResponse(student, 'Profil bilgileri getirildi', 200);
  }

  @Patch('profile/update')
  @Roles(UserType.STUDENT)    
  @ApiOperation({ summary: 'Profil Güncelle', description: 'Öğrenci kendi profil bilgilerini güncelleyebilir.' })
  async updateProfile(@Req() req: RequestUser, @Body() updateStudentDto: UpdateStudentDTO) {
    const student = await this.studentsService.update(req.user.id, updateStudentDto);
    return new BaseResponse(student, 'Profil bilgileri güncellendi', 200);
  }

  @Get('profile/myCourses')
  @Roles(UserType.STUDENT)
  @ApiOperation({ summary: 'Kurslarım', description: 'Öğrenci kendi kayıtlı olduğu kursları listeleyebilir.' })
  async getStudentCourses(@Req() req: RequestUser) {
    const courses = await this.studentsService.getStudentCourses(req.user.id);
    return new BaseResponse(courses, 'Kurslarınız başarıyla listelendi', 200);
  }

  @Post('profile/courses/:courseId')
  @Roles(UserType.STUDENT)
  @ApiOperation({ summary: 'Kursa Kayıt Ol', description: 'Öğrenci bir kursa kayıt olabilir.' })
  async enrollCourse(@Req() req: RequestUser, @Param('courseId') courseId: number) {
    const student = await this.studentsService.addCourse(req.user.id, courseId);
    return new BaseResponse(student, 'Kursa başarıyla kaydoldunuz', 200);
  }

  @Delete('profile/courses/:courseId')
  @Roles(UserType.STUDENT)
  @ApiOperation({ summary: 'Kurs Kaydını Sil', description: 'Öğrenci bir kurstan kaydını silebilir.' })
  async unenrollCourse(@Req() req: RequestUser, @Param('courseId') courseId: number) {
    const removedCourse = await this.studentsService.removeCourse(req.user.id, courseId);
    return new BaseResponse(removedCourse, 'Kurs kaydınız başarıyla silindi', 200);
  }

  @Post()
  @Roles(UserType.ADMIN)
  @ApiOperation({ summary: 'Yeni Öğrenci Oluştur', description: 'Admin yeni bir öğrenci oluşturabilir.' })
  async create(@Body() createStudentDto: CreateStudentDto) {
    const student = await this.studentsService.create(createStudentDto);
    return new BaseResponse(student, 'Öğrenci başarıyla oluşturuldu', 201);
  }

  @Get()
  @Roles(UserType.ADMIN)
  @ApiOperation({ summary: 'Tüm Öğrencileri Listele', description: 'Admin tüm öğrencileri listeleyebilir.' })
  async findAll() {
    const students = await this.studentsService.findAll();
    return new BaseResponse(students, 'Öğrenciler başarıyla listelendi', 200);
  }

  @Get(':studentId')
  @Roles(UserType.ADMIN)
  @ApiOperation({ summary: 'Öğrenci Detayı', description: 'Admin bir öğrencinin detayını görüntüleyebilir.' })
  async findOne(@Param('studentId') studentId: number) {
    const student = await this.studentsService.findById(studentId);
    return new BaseResponse(student, 'Öğrenci başarıyla getirildi', 200);
  }

  @Patch(':studentId')
  @Roles(UserType.ADMIN)
  @ApiOperation({ summary: 'Öğrenci Güncelle', description: 'Admin bir öğrenciyi güncelleyebilir.' })
  async updateStudent(@Param('studentId') studentId: number, @Body() updateStudentDto: UpdateStudentDTO) {
    const student = await this.studentsService.update(studentId, updateStudentDto);
    return new BaseResponse(student, 'Öğrenci bilgileri güncellendi', 200);
  }

  @Delete(':studentId')
  @Roles(UserType.ADMIN)
  @ApiOperation({ summary: 'Öğrenci Sil', description: 'Admin bir öğrenciyi silebilir.' })
  async remove(@Param('studentId') studentId: number) {
    const student = await this.studentsService.remove(studentId);
    return new BaseResponse(student, 'Öğrenci başarıyla silindi', 200);
  }

  @Post(':studentId/admin/courses/:courseId')
  @Roles(UserType.ADMIN)
  @ApiOperation({ summary: 'Öğrenciye Kurs Ekle', description: 'Admin bir öğrenciye kurs ekleyebilir.' })
  async adminAddCourse(@Param('studentId') studentId: number,@Param('courseId') courseId: number) {
    const student = await this.studentsService.addCourse(studentId, courseId);
    return new BaseResponse(student, 'Öğrenciye ders başarıyla atandı', 200);
  }

  @Delete(':studentId/admin/courses/:courseId')
  @Roles(UserType.ADMIN)
  @ApiOperation({ summary: 'Öğrenciden Kurs Sil', description: 'Admin bir öğrencinin kurs kaydını silebilir.' })
  async adminRemoveCourse(@Param('studentId') studentId: number, @Param('courseId') courseId: number) {
    const removedCourse = await this.studentsService.removeCourse(studentId, courseId);
    return new BaseResponse(removedCourse, 'Öğrencinin ders kaydı silindi', 200);
  }

  @Get(':studentId/courses')
  @Roles(UserType.ADMIN)
  @ApiOperation({ summary: 'Öğrencinin Kurslarını Listele', description: 'Admin bir öğrencinin kayıtlı olduğu kursları listeleyebilir.' })
  async getStudentCoursesById(@Param('studentId') studentId: number) {
    const courses = await this.studentsService.getStudentCourses(studentId);
    return new BaseResponse(courses, `${studentId} ID'li öğrencinin dersleri başarıyla listelendi`, 200);
  }

  @Get('admin/student-course-relations')
  @Roles(UserType.ADMIN)
  @ApiOperation({ summary: 'Öğrenci-Kurs İlişkilerini Listele', description: 'Admin tüm öğrenci-kurs ilişkilerini listeleyebilir.' })
  async getAllStudentCourseRelations(): Promise<BaseResponse<StudentCourseRelation[]>> {
    const relations = await this.studentsService.getAllStudentCourseRelations();
    return new BaseResponse(relations, 'Öğrenci-ders eşleşmeleri başarıyla listelendi', 200);
  }
}
