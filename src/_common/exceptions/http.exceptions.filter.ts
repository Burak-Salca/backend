import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import { BaseResponse } from 'src/_base/response/base.response';
import { ResponseMessages } from '../enums/ResponseMessages.enum';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    var responseMessage: ResponseMessages;
    switch(status) {
        case 401:
            responseMessage = ResponseMessages.UNAUTH;
            break;
        case 403:
            responseMessage = ResponseMessages.FORBIDDEN;
            break;
        case 404:
            responseMessage = ResponseMessages.NOT_FOUND;
            break;
        case 500:
            responseMessage = ResponseMessages.INTERNAL_SERVER_ERROR;
            break;
        default:
            responseMessage = ResponseMessages.BAD_GATEWAY;
            break;
    }
    response
      .status(status)
      .json(new BaseResponse(null, responseMessage, false));
  }
}