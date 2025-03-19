import {  IsNotEmpty, Length, IsDate, MaxDate, Matches } from 'class-validator';

export class UpdateStudentDTO {
    @IsNotEmpty({ message: 'İsim boş olamaz' })
    @Length(1, 50, { message: 'İsim en fazla 50 karakter olabilir' })
    firstName: string;

    @IsNotEmpty({ message: 'Soyisim boş olamaz' })
    @Length(1, 50, { message: 'Soyisim en fazla 50 karakter olabilir' })
    lastName: string;

    @IsNotEmpty({ message: 'Doğum tarihi boş olamaz' })
    @Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'Geçerli bir tarih formatı girin (YYYY-MM-DD)' })
    birthDate: Date;
}   