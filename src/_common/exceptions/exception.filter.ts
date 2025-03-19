import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus, NotFoundException } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import { Response } from 'express';
import { BaseResponse } from 'src/_base/response/base.response';

@Catch(QueryFailedError, NotFoundException)
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: QueryFailedError | NotFoundException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception instanceof QueryFailedError) {
      if (exception.message.includes('duplicate key value violates unique constraint')) {
        response.status(HttpStatus.CONFLICT).json(new BaseResponse(null, 'Bu email adresi zaten kayıtlı.', HttpStatus.CONFLICT));
      } else {
        response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(new BaseResponse(null, 'Sunucu hatası.', HttpStatus.INTERNAL_SERVER_ERROR));
      }
    } else if (exception instanceof NotFoundException) {
      response.status(HttpStatus.NOT_FOUND).json(new BaseResponse(null, exception.message, HttpStatus.NOT_FOUND));
    }
  }
}