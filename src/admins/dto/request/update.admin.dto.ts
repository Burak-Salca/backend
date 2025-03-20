import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, Length, Matches } from 'class-validator';

export class UpdateAdminDto {
    @ApiProperty()
    @IsNotEmpty({ message: 'İsim boş olamaz' })
    @IsString({ message: 'İsim string olmalı' })
    @Length(1, 50, { message: 'İsim en fazla 50 karakter olabilir' })
    firstName: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'Soyisim boş olamaz' })
    @IsString({ message: 'Soyisim string olmalı' })
    @Length(1, 50, { message: 'Soyisim en fazla 50 karakter olabilir' })
    lastName: string;
  
} 