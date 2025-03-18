import { BadGatewayException, Controller, Get, NotAcceptableException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { AppService } from './app.service';
import { BaseResponse } from './_base/response/base.response';
import { ResponseMessages } from './_common/enums/ResponseMessages.enum';
import { NotFoundError } from 'rxjs';
import { NOTFOUND } from 'dns';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(){
    const users = [{id:2,username:'burak'}];
    return new BaseResponse(users, ResponseMessages.SUCCESS, true);
  }
}
