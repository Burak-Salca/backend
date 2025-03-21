import { BadGatewayException, Controller, Get, NotAcceptableException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { AppService } from './app.service'; 


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

}
