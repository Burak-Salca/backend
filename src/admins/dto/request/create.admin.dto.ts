import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail, IsStrongPassword, Matches, Length } from 'class-validator';

export class CreateAdminDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'İsim boş olamaz' })
  @IsString({ message: 'İsim string olmalı' })
  @Matches(/^(?!\s*$).+/, { message: 'İsim boş olamaz' })
  @Length(1, 50, { message: 'İsim en fazla 50 karakter olabilir' })
  firstName: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Soyisim boş olamaz' })
  @IsString({ message: 'Soyisim string olmalı' })
  @Matches(/^(?!\s*$).+/, { message: 'Soyisim boş olamaz' })
  @Length(1, 50, { message: 'Soyisim en fazla 50 karakter olabilir' })
  lastName: string;

  @ApiProperty()
  @IsEmail({}, { message: 'Geçerli bir email adresi girin' })
  @Length(1, 100, { message: 'Email en fazla 100 karakter olabilir' })
  email: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Şifre boş olamaz' })
  @IsStrongPassword({}, { message: 'Şifre en az 8 karakter olmalı, bir büyük harf, bir küçük harf, bir rakam ve bir özel karakter içermelidir' })
  password: string;
} 