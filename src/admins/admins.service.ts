import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admins } from './admins.entity';
import { CreateAdminDto } from './dto/request/create.admin.dto';
import { UpdateAdminDto } from './dto/request/update.admin.dto';
import * as bcrypt from 'bcrypt';
import { BaseResponse } from '../_base/response/base.response';


@Injectable()
export class AdminsService {
  constructor(
    @InjectRepository(Admins)
    private adminsRepository: Repository<Admins>,
  ) {}

  async create(createAdminDto: CreateAdminDto): Promise<Admins> {
    const { password, ...rest } = createAdminDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = this.adminsRepository.create({
      ...rest,
      password: hashedPassword,
    });
    return this.adminsRepository.save(admin);
  }

  async findAll(): Promise<Admins[]> {
    return this.adminsRepository.find();
  }

  async findById(id: number): Promise<Admins> {
    const admin = await this.adminsRepository.findOne({ where: { id } });
    if (!admin) {
      throw new NotFoundException(new BaseResponse(null, 'Admin bulunamadı', 404));
    }
    return admin;
  }

  async update(id: number, updateAdminDto: UpdateAdminDto): Promise<Admins> {
    const admin = await this.findById(id);
    
    // Email güncellenmek isteniyorsa ve yeni email başka bir adminde varsa hata ver
    if (updateAdminDto.email && updateAdminDto.email !== admin.email) {
      const existingAdmin = await this.findByEmail(updateAdminDto.email);
      if (existingAdmin && existingAdmin.id !== id) {
        throw new ConflictException(
          new BaseResponse(null, 'Bu email adresi zaten kullanımda', 409)
        );
      }
    }

    // Şifre güncellenmek isteniyorsa hashle
    if (updateAdminDto.password) {
      updateAdminDto.password = await bcrypt.hash(updateAdminDto.password, 10);
    }

    Object.assign(admin, updateAdminDto);
    return this.adminsRepository.save(admin);
  }

  async remove(id: number): Promise<Admins> {
    const admin = await this.findById(id);
    await this.adminsRepository.remove(admin);
    return admin;
  }

  async findByEmail(email: string): Promise<Admins | null> {
    return this.adminsRepository.findOne({ where: { email } });
  }

  
} 