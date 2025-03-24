import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, Matches } from 'class-validator';

export class UpdateCourseDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  @Matches(/^(?!\s*$).+/, { message: 'Kurs adı boş olamaz' })
  name?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  @Matches(/^(?!\s*$).+/, { message: 'Kurs içeriği boş olamaz' })
  content?: string;
} 