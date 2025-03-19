/*import { Body, Controller, Post, Res } from '@nestjs/common';
import { LoginRequestDTO } from './dto/request/LoginRequest.dto';
import { Response } from 'express';
import { LoginResponseDTO } from './dto/response/LoginResponse.dto';
import { BaseResponse } from 'src/_base/response/base.response';
import { ResponseMessages } from 'src/_common/enums/ResponseMessages.enum';

@Controller('auth')
export class AuthController {

    @Post('login')
    login(@Body() body: LoginRequestDTO, @Res() res:Response<LoginResponseDTO>):void{
        const data = {accessToken: '', refreshToken: '',user:{lastname:'',name:'djsf'}};
        res.json(new BaseResponse(data,ResponseMessages.SUCCESS,200));
    }

    @Post('register')
    register(){}

    @Post('logout')
    logout(){}

    @Post('refresh-token')
    refreshToken(){}

}
*/