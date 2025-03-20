import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCourseDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'Kurs adı boş olamaz' })
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'Kurs içeriği boş olamaz' })
  content: string;
} 