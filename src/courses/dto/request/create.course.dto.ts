import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class CreateCourseDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'Kurs adı boş olamaz' })
  @Matches(/^(?!\s*$).+/, { message: 'Kurs adı boş olamaz' })
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'Kurs içeriği boş olamaz' })
  @Matches(/^(?!\s*$).+/, { message: 'Kurs içeriği boş olamaz' })
  content: string;
} 