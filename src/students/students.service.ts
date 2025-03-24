import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Students } from './students.entity';
import { CreateStudentDto } from './dto/request/create.student.dto';
import { UpdateStudentDTO } from './dto/request/update.student.dto';
import { Courses } from '../courses/courses.entity';
import * as bcrypt from 'bcrypt';
import { BaseResponse } from '../_base/response/base.response';
import { StudentCourseRelation } from './interfaces/student-course-relation.interface';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Students)
    private studentsRepository: Repository<Students>,
    @InjectRepository(Courses)
    private coursesRepository: Repository<Courses>,
  ) {}

  // ADMIN İŞLEMLERİ İÇİN SERVİSLER

  async create(createStudentDto: CreateStudentDto): Promise<Students> {
    const { password, ...rest } = createStudentDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    //Paraloyı hashleyip databese yazdırıyoruz
    const student = this.studentsRepository.create({
      ...rest,
      password: hashedPassword,
    });
    return this.studentsRepository.save(student);
  }

  async findAll(): Promise<Students[]> {
    return this.studentsRepository.find({
      select: ['id', 'firstName', 'lastName', 'email', 'courses'] 
    });
  }

  async update(id: number, updateStudentDto: UpdateStudentDTO): Promise<Students> {
    const student = await this.findById(id);
    // Eğer şifre güncellenecekse hashle
    if (updateStudentDto.password) {
      updateStudentDto.password = await bcrypt.hash(updateStudentDto.password, 10);
    }
    Object.assign(student, updateStudentDto);
    return this.studentsRepository.save(student);
  }

  async remove(id: number): Promise<Students> {
    const student = await this.findById(id);
    return this.studentsRepository.remove(student);
  }

  // ÖĞRENCİ İŞLEMLERİ İÇİN SERVİSLER
  async findById(id: number): Promise<Students> {
    const student = await this.studentsRepository.findOne({ 
      where: { id },
      relations: ['courses'], 
      select: { // İstenilen bilgilerin döndürülmesi
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        courses: true
      }
    });
    if (!student) {
      throw new NotFoundException(new BaseResponse(null, 'Öğrenci bulunamadı', 404));
    }
    return student;
  }

  // Login işlemi için email kontrolü için kullanılcak
  async findByEmail(email: string): Promise<Students | null> {
    return this.studentsRepository.findOne({ 
      where: { email },
      select: ['id', 'firstName', 'lastName', 'email', 'password', 'courses'] 
    });
  }

  

  // KURS İŞLEMLERİ İÇİN SERVİSLER
  
  // Öğrenciyi ve kurslarını getiren method
  private async findStudentWithCourses(studentId: number): Promise<Students> {
    const student = await this.studentsRepository.findOne({
      where: { id: studentId },
      relations: ['courses'],
    });
    if (!student) {
      throw new NotFoundException(new BaseResponse(null, 'Öğrenci bulunamadı', 404));
    }
    return student;
  }

  async addCourse(studentId: number, courseId: number): Promise<Students> {
    const student = await this.findStudentWithCourses(studentId);
    const course = await this.coursesRepository.findOneBy({ id: courseId });
    if (!course) {throw new NotFoundException(new BaseResponse(null, 'Kurs bulunamadı', 404));
    }
    // Öğrenci zaten bu kursa kayıtlı mı kontrol et
    if (student.courses.some(c => c.id === Number(courseId))) {
      throw new ConflictException(
        new BaseResponse(null, 'Bu öğrenci zaten bu derse kayıtlı', 409)
      );
    }
    student.courses.push(course);
    return this.studentsRepository.save(student);
  }

  async removeCourse(studentId: number, courseId: number): Promise<Courses> {
    const student = await this.findStudentWithCourses(studentId);
    const removedCourse = student.courses.find(c => c.id === Number(courseId));
    if (!removedCourse) {
      throw new NotFoundException(
        new BaseResponse(null, 'Öğrenci bu kursa kayıtlı değil', 404)
      );
    }
    student.courses = student.courses.filter(course => course.id !== Number(courseId));
    await this.studentsRepository.save(student);
    return removedCourse;
  }

  async getStudentCourses(studentId: number): Promise<Courses[]> {
    const student = await this.findStudentWithCourses(studentId);
    return student.courses;
  }

  async getAllStudentCourseRelations(): Promise<StudentCourseRelation[]> {
    const relations = await this.studentsRepository
      .createQueryBuilder('student')
      .leftJoinAndSelect('student.courses', 'course')
      .select([
        'student.id',
        'student.firstName',
        'student.lastName',
        'course.id',
        'course.name'
      ])
      .getMany();

    const formattedRelations: StudentCourseRelation[] = [];
    
    for (const student of relations) {
      if (student.courses && student.courses.length > 0) {
        for (const course of student.courses) {
          formattedRelations.push({
            studentId: student.id,
            studentName: `${student.firstName} ${student.lastName}`,
            courseId: course.id,
            courseName: course.name
          });
        }
      }
    }

    return formattedRelations;
  }
}
