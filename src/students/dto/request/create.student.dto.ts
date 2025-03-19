import { IsEmail, IsNotEmpty, Length, Matches } from 'class-validator';

export class CreateStudentDto {
  @IsNotEmpty({ message: 'İsim boş olamaz' })
  @Length(1, 50, { message: 'İsim en fazla 50 karakter olabilir' })
  firstName: string;

  @IsNotEmpty({ message: 'Soyisim boş olamaz' })
  @Length(1, 50, { message: 'Soyisim en fazla 50 karakter olabilir' })
  lastName: string;

  @IsEmail({}, { message: 'Geçerli bir email adresi girin' })
  @Length(1, 100, { message: 'Email en fazla 100 karakter olabilir' })
  email: string;

  @IsNotEmpty({ message: 'Şifre boş olamaz' })
  @Length(1, 255, { message: 'Şifre en fazla 255 karakter olabilir' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&-])[A-Za-z\d@$!%*?&-]{8,}$/, {
    message: 'Şifre en az 8 karakter olmalı, bir büyük harf, bir küçük harf, bir rakam ve bir özel karakter içermelidir',
  })
  password: string;
}