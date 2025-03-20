import { Controller, Get, Post, Body, Param, Delete, Put, UsePipes, ValidationPipe, HttpStatus } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { CreateAdminDto } from './dto/request/create.admin.dto';
import { UpdateAdminDto } from './dto/request/update.admin.dto';
import { BaseResponse } from '../_base/response/base.response';

@Controller('admins')
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  /*@Post()
  @UsePipes(ValidationPipe)
  async create(@Body() createAdminDto: CreateAdminDto) {
    const admin = await this.adminsService.create(createAdminDto);
    return new BaseResponse(admin, 'Admin başarıyla oluşturuldu', HttpStatus.CREATED);
  }*/

  @Get()
  async findAll() {
    const admins = await this.adminsService.findAll();
    return new BaseResponse(admins, 'Adminler başarıyla listelendi', HttpStatus.OK);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const admin = await this.adminsService.findOne(+id);
    return new BaseResponse(admin, 'Admin başarıyla bulundu', HttpStatus.OK);
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  async update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    const admin = await this.adminsService.update(+id, updateAdminDto);
    return new BaseResponse(admin, 'Admin başarıyla güncellendi', HttpStatus.OK);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const admin = await this.adminsService.remove(+id);
    return new BaseResponse(admin, 'Admin başarıyla silindi', HttpStatus.OK);
  }
} 