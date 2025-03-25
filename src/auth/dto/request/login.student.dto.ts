import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsStrongPassword, Length } from 'class-validator';

export class LoginStudentDto {
  @ApiProperty()
  @IsEmail({}, { message: 'Geçerli bir email adresi girin' })
  @Length(1, 100, { message: 'Email en fazla 100 karakter olabilir' })
  email: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Şifre boş olamaz' })
  @IsStrongPassword({}, { message: 'Şifre en az 8 karakter olmalı, bir büyük harf, bir küçük harf, bir rakam ve bir özel karakter içermelidir' })
  @Length(8, 100, { message: 'Şifre en az 8 karakter olmalı, en fazla 100 karakter olabilir' })
  password: string;
}
