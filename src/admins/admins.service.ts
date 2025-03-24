import { Injectable, NotFoundException, ConflictException, ForbiddenException } from '@nestjs/common';
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
    
    // Şifre güncellenmek isteniyorsa hashle
    if (updateAdminDto.password) {
      updateAdminDto.password = await bcrypt.hash(updateAdminDto.password, 10);
    }

    Object.assign(admin, updateAdminDto);
    return this.adminsRepository.save(admin);
  }

  async remove(id: number, loggedInUserId: number): Promise<Admins> {
    //Giriş yapan adminin kendisini silemez
    if (id === loggedInUserId) {
      throw new ForbiddenException(new BaseResponse(null, 'Kendinizi silemezsiniz', 403));
    }

    const admin = await this.findById(id);
    await this.adminsRepository.remove(admin);
    return admin;
  }

  //Login adminde email kontrolü için kullanılmak için oluşturuldu
  async findByEmail(email: string): Promise<Admins | null> {
    return this.adminsRepository.findOne({ where: { email } });
  }

  
} 