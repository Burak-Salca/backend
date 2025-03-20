import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admins } from './admins.entity';
import { CreateAdminDto } from './dto/request/create.admin.dto';
import { UpdateAdminDto } from './dto/request/update.admin.dto';
import * as bcrypt from 'bcrypt';
import { BaseResponse } from '../_base/response/base.response';
import { UserRole } from '../_common/enums/auth.enums';

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
      role: UserRole.ADMIN,
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