import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, Length, IsStrongPassword, IsEmail, Matches } from 'class-validator';

export class UpdateStudentDTO {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString({ message: 'İsim string olmalı' })
  @Length(1, 50, { message: 'İsim en fazla 50 karakter olabilir' })
  @Matches(/^(?!\s*$).+/, { message: 'İsim boş olamaz' })
  firstName?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString({ message: 'Soyisim string olmalı' })
  @Length(1, 50, { message: 'Soyisim en fazla 50 karakter olabilir' })
  @Matches(/^(?!\s*$).+/, { message: 'Soyisim boş olamaz' })
  lastName?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsEmail({}, { message: 'Geçerli bir email adresi girin' })
  @Length(1, 100, { message: 'Email en fazla 100 karakter olabilir' })
  email?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsStrongPassword({}, { message: 'Şifre en az 8 karakter olmalı, bir büyük harf, bir küçük harf, bir rakam ve bir özel karakter içermelidir' })
  password?: string;
}
  

 