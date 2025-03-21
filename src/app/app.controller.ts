import { BadGatewayException, Controller, Get, NotAcceptableException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { AppService } from './app.service';
import { BaseResponse } from '../_base/response/base.response';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

}
