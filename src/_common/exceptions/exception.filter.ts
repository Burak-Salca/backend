import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import { Response } from 'express';
import { BaseResponse } from 'src/_base/response/base.response';

@Catch(QueryFailedError, NotFoundException, UnauthorizedException)
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: QueryFailedError | NotFoundException | UnauthorizedException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception instanceof QueryFailedError) {
      response.status(HttpStatus.CONFLICT).json(new BaseResponse(null, 'Böyle bir kayıt zaten var', HttpStatus.CONFLICT));
    } else if (exception instanceof NotFoundException) {
      response.status(HttpStatus.NOT_FOUND).json(new BaseResponse(null, 'Kayıt bulunamadı', HttpStatus.NOT_FOUND));
    } else if (exception instanceof UnauthorizedException) {
      response.status(HttpStatus.UNAUTHORIZED).json(new BaseResponse(null, 'Yetkisiz giriş', HttpStatus.UNAUTHORIZED));
    }
    else {
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(new BaseResponse(null, 'Sunucu hatası.', HttpStatus.INTERNAL_SERVER_ERROR));
    }
  }
}