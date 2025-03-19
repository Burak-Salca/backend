import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Courses } from './courses.entity';
import { CreateCourseDto } from './dto/request/create.course.dto';
import { UpdateCourseDto } from './dto/request/update.course.dto';
import { Students } from '../students/students.entity';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Courses)
    private coursesRepository: Repository<Courses>,
    @InjectRepository(Students)
    private studentsRepository: Repository<Students>,
  ) {}

  async create(createCourseDto: CreateCourseDto): Promise<Courses> {
    const course = this.coursesRepository.create(createCourseDto);
    return this.coursesRepository.save(course);
  }

  async findAll(): Promise<Courses[]> {
    return this.coursesRepository.find();
  }

  async findOne(id: number): Promise<Courses> {
    const course = await this.coursesRepository.findOneBy({ id });
    if (!course) {
      throw new NotFoundException('Kurs bulunamadı');
    }
    return course;
  }

  async update(id: number, updateCourseDto: UpdateCourseDto): Promise<Courses> {
    const course = await this.findOne(id);
    Object.assign(course, updateCourseDto);
    return this.coursesRepository.save(course);
  }

  async remove(id: number): Promise<Courses> {
    const course = await this.findOne(id);
    await this.coursesRepository.remove(course);
    return course;
  }

  async getCourseStudents(courseId: number): Promise<Students[]> {
    const course = await this.coursesRepository.findOne({
      where: { id: courseId },
      relations: ['students'],
    });

    if (!course) {
      throw new NotFoundException('Ders bulunamadı');
    }

    return course.students;
  }
} 