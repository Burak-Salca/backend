import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateCourseDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'Kurs adı boş olamaz' })
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'Kurs içeriği boş olamaz' })
  content: string;
} 