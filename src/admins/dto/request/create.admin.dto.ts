import { IsString, IsNotEmpty, IsEmail, IsStrongPassword, Matches, Length } from 'class-validator';

export class CreateAdminDto {
  @IsNotEmpty({ message: 'İsim boş olamaz' })
  @IsString({ message: 'İsim string olmalı' })
  @Length(1, 50, { message: 'İsim en fazla 50 karakter olabilir' })
  firstName: string;

  @IsNotEmpty({ message: 'Soyisim boş olamaz' })
  @IsString({ message: 'Soyisim string olmalı' })
  @Length(1, 50, { message: 'Soyisim en fazla 50 karakter olabilir' })
  lastName: string;

  @IsEmail({}, { message: 'Geçerli bir email adresi girin' })
  @Length(1, 100, { message: 'Email en fazla 100 karakter olabilir' })
  email: string;

  @IsNotEmpty({ message: 'Şifre boş olamaz' })
  @IsStrongPassword({}, { message: 'Şifre en az 8 karakter olmalı, bir büyük harf, bir küçük harf, bir rakam ve bir özel karakter içermelidir' })
  password: string;

  @IsNotEmpty({ message: 'Doğum tarihi boş olamaz' })
  @Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'Geçerli bir tarih formatı girin (YYYY-MM-DD)' })
  birthDate: Date;
} 