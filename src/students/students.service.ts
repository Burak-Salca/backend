import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Students } from './students.entity';
import { CreateStudentDto } from './dto/request/create.student.dto';
import { UpdateStudentDTO } from './dto/request/update.student.dto';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Students)
    private studentsRepository: Repository<Students>,
  ) {}

  async create(createStudentDto: CreateStudentDto): Promise<Students> {
    const student = this.studentsRepository.create(createStudentDto);
    return this.studentsRepository.save(student);
  }

  async findAll(): Promise<Students[]> {
    return this.studentsRepository.find();
  }

  async findOne(id: number): Promise<Students> {
    const student = await this.studentsRepository.findOneBy({ id });
    if (!student) {
      throw new NotFoundException('Öğrenci bulunamadı');
    }
    return student;
  }

  async update(id: number, updateStudentDto: UpdateStudentDTO): Promise<Students> {
    const student = await this.studentsRepository.findOneBy({ id });
    if (!student) {
      throw new NotFoundException('Öğrenci bulunamadı');
    }

    // Sadece firstName ve lastName alanlarını güncelle
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
}
