import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admins } from './admins.entity';
import { CreateAdminDto } from './dto/request/create.admin.dto';
import { UpdateAdminDto } from './dto/request/update.admin.dto';

@Injectable()
  export class AdminsService {  
  constructor(
    @InjectRepository(Admins)
    private adminsRepository: Repository<Admins>,
  ) {}

  async create(createAdminDto: CreateAdminDto): Promise<Admins> {
    const admin = this.adminsRepository.create(createAdminDto);
    return this.adminsRepository.save(admin);
  }

  async findAll(): Promise<Admins[]> {
    return this.adminsRepository.find();
  }

  async findOne(id: number): Promise<Admins> {
    const admin = await this.adminsRepository.findOneBy({ id });
    if (!admin) {
      throw new NotFoundException('Admin bulunamadı');
    }
    return admin;
  }

  async update(id: number, updateAdminDto: UpdateAdminDto): Promise<Admins> {
    const admin = await this.findOne(id);
    Object.assign(admin, updateAdminDto);
    return this.adminsRepository.save(admin);
  }

  async remove(id: number): Promise<Admins> {
    const admin = await this.findOne(id);
    await this.adminsRepository.remove(admin);
    return admin;
  }
} 