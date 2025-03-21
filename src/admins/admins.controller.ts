import { Controller, Get, Post, Body, Param, Delete, Put, UsePipes, ValidationPipe, HttpStatus, UseGuards } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { CreateAdminDto } from './dto/request/create.admin.dto';
import { UpdateAdminDto } from './dto/request/update.admin.dto';
import { BaseResponse } from '../_base/response/base.response';
import { RolesGuard } from '../_security/guards/roles.guard';
import { JwtAuthGuard } from '../_security/guards/jwt.auth.guard';
import { Roles } from '../_security/decorators/roles.decorator';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { UserType } from '../_security/enums/type.enum';

@ApiTags('Admins')
@ApiBearerAuth('access-token')
@Controller('admins')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @Post()
  @Roles(UserType.ADMIN)
  @UsePipes(ValidationPipe)
  async create(@Body() createAdminDto: CreateAdminDto) {
    const admin = await this.adminsService.create(createAdminDto);
    return new BaseResponse(admin, 'Admin başarıyla oluşturuldu', HttpStatus.CREATED);
  }

  @Get()
  @Roles(UserType.ADMIN)
  async findAll() {
    const admins = await this.adminsService.findAll();
    return new BaseResponse(admins, 'Adminler başarıyla listelendi', HttpStatus.OK);
  }

  @Get(':id')
  @Roles(UserType.ADMIN)
  async findOne(@Param('id') id: string) {
    const admin = await this.adminsService.findById(+id);
    return new BaseResponse(admin, 'Admin başarıyla bulundu', HttpStatus.OK);
  }

  @Put(':id')
  @Roles(UserType.ADMIN)
  @UsePipes(ValidationPipe)
  async update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    const admin = await this.adminsService.update(+id, updateAdminDto);
    return new BaseResponse(admin, 'Admin başarıyla güncellendi', HttpStatus.OK);
  }

  @Delete(':id')
  @Roles(UserType.ADMIN)
  async remove(@Param('id') id: string) {
    const admin = await this.adminsService.remove(+id);
    return new BaseResponse(admin, 'Admin başarıyla silindi', HttpStatus.OK);
  }
} 