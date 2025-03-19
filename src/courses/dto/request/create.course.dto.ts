import { IsString, IsNotEmpty } from 'class-validator';

export class CreateCourseDto {
  @IsString()
  @IsNotEmpty({ message: 'Kurs adı boş olamaz' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'Kurs içeriği boş olamaz' })
  content: string;
} 