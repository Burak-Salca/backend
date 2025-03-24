import { Controller, Get, Post, Body, Param, Delete, Put, Patch, UsePipes, ValidationPipe, HttpStatus, UseGuards, Req } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { CreateAdminDto } from './dto/request/create.admin.dto';
import { UpdateAdminDto } from './dto/request/update.admin.dto';
import { BaseResponse } from '../_base/response/base.response';
import { RolesGuard } from '../_security/guards/roles.guard';
import { JwtAuthGuard } from '../_security/guards/jwt.auth.guard';
import { Roles } from '../_security/decorators/roles.decorator';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { UserType } from '../_security/enums/type.enum';
import { RequestUser } from '../_base/interfaces/request.user.interface';

@ApiTags('Admins')
@ApiBearerAuth('access-token')
@Controller('admins')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @Post()
  @Roles(UserType.ADMIN)
  @UsePipes(ValidationPipe)
  @ApiOperation({ summary: 'Yeni Yönetici Oluştur', description: 'Admin yeni bir yönetici oluşturabilir.' })
  async create(@Body() createAdminDto: CreateAdminDto) {
    const admin = await this.adminsService.create(createAdminDto);
    return new BaseResponse(admin, 'Admin başarıyla oluşturuldu', HttpStatus.CREATED);
  }

  @Get()
  @Roles(UserType.ADMIN)
  @ApiOperation({ summary: 'Tüm Yöneticileri Listele', description: 'Admin tüm yöneticileri listeleyebilir.' })
  async findAll() {
    const admins = await this.adminsService.findAll();
    return new BaseResponse(admins, 'Adminler başarıyla listelendi', HttpStatus.OK);
  }

  @Get(':adminId')
  @Roles(UserType.ADMIN)
  @ApiOperation({ summary: 'Yönetici Detayı', description: 'Admin bir yöneticinin detayını görüntüleyebilir.' })
  async findOne(@Param('adminId') adminId: string) {
    const admin = await this.adminsService.findById(+adminId);
    return new BaseResponse(admin, 'Admin başarıyla bulundu', HttpStatus.OK);
  }

  @Patch(':adminId')
  @Roles(UserType.ADMIN)
  @UsePipes(ValidationPipe)
  @ApiOperation({ summary: 'Yönetici Güncelle', description: 'Admin bir yöneticiyi güncelleyebilir.' })
  async update(@Param('adminId') adminId: string, @Body() updateAdminDto: UpdateAdminDto) {
    const admin = await this.adminsService.update(+adminId, updateAdminDto);
    return new BaseResponse(admin, 'Admin başarıyla güncellendi', HttpStatus.OK);
  }

  @Delete(':adminId')
  @Roles(UserType.ADMIN)
  @ApiOperation({ summary: 'Yönetici Sil', description: 'Admin başka bir yöneticiyi silebilir fakat kendisini silemez.' })
  async remove(@Param('adminId') adminId: string, @Req() req: RequestUser) {
    const admin = await this.adminsService.remove(+adminId, req.user.id);
    return new BaseResponse(admin, 'Admin başarıyla silindi', HttpStatus.OK);
  }
} 