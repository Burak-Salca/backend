import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Students } from './students.entity';
import { CreateStudentDto } from './dto/request/create.student.dto';
import { UpdateStudentDTO } from './dto/request/update.student.dto';
import { Courses } from '../courses/courses.entity';
import * as bcrypt from 'bcrypt';
import { BaseResponse } from '../_base/response/base.response';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Students)
    private studentsRepository: Repository<Students>,
    @InjectRepository(Courses)
    private coursesRepository: Repository<Courses>,
  ) {}

  async create(createStudentDto: CreateStudentDto): Promise<Students> {
    const { password, ...rest } = createStudentDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    const student = this.studentsRepository.create({
      ...rest,
      password: hashedPassword,
    });
    return this.studentsRepository.save(student);
  }

  async findAll(): Promise<Students[]> {
    return this.studentsRepository.find();
  }

  async update(id: number, updateStudentDto: UpdateStudentDTO): Promise<Students> {
    const student = await this.studentsRepository.findOneBy({ id });
    if (!student) {
      throw new NotFoundException('Öğrenci bulunamadı');
    }

    student.firstName = updateStudentDto.firstName;
    student.lastName = updateStudentDto.lastName;

    return this.studentsRepository.save(student);
  }

  async remove(id: number): Promise<Students> {
    const student = await this.studentsRepository.findOneBy({ id });
    if (!student) {
      throw new NotFoundException('Öğrenci bulunamadı');
    }
    await this.studentsRepository.remove(student);
    return student;
  }

  async findById(id: number): Promise<Students> {
    const student = await this.studentsRepository.findOne({ where: { id } });
    if (!student) {
      throw new NotFoundException(new BaseResponse(null, 'Öğrenci bulunamadı', 404));
    }
    return student;
  }

  async addCourse(studentId: number, courseId: number): Promise<Students> {
    const student = await this.studentsRepository.findOne({
      where: { id: studentId },
      relations: ['courses'],
    });
    const course = await this.coursesRepository.findOneBy({ id: courseId });

    if (!student || !course) {
      throw new NotFoundException('Öğrenci veya kurs bulunamadı');
    }

    if (student.courses.some(c => c.id === courseId)) {
      throw new ConflictException('Bu öğrenci zaten bu derse kayıtlı');
    }

    student.courses.push(course);
    return this.studentsRepository.save(student);
  }

  async removeCourse(studentId: number, courseId: number): Promise<Students> {
    const student = await this.studentsRepository.findOne({
      where: { id: studentId },
      relations: ['courses'],
    });
    const course = await this.coursesRepository.findOneBy({ id: courseId });
    
    if (!student || !course) {
      throw new NotFoundException('Öğrenci veya kurs bulunamadı');
    }

    student.courses = student.courses.filter(course => course.id !== courseId);
    return this.studentsRepository.save(student);
  }

  async getStudentCourses(studentId: number): Promise<Courses[]> {
    const student = await this.studentsRepository.findOne({
      where: { id: studentId },
      relations: ['courses'],
    });

    if (!student) {
      throw new NotFoundException('Öğrenci bulunamadı');
    }

    return student.courses;
  }

  async findByEmail(email: string): Promise<Students | null> {
    return this.studentsRepository.findOne({ where: { email } });
  }

  
}
