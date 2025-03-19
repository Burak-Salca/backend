import { ValidationError } from 'class-validator';
import { BaseResponse } from 'src/_base/response/base.response';
import { BadRequestException, HttpStatus } from '@nestjs/common';

export const exceptionFactory = (errors: ValidationError[]) => {
    const messages = errors.map(error => {
      return {
        field: error.property,
        errors: error.constraints ? Object.values(error.constraints) : [],
      };
    });
    return new BadRequestException(new BaseResponse(messages, 'Validation hatası', HttpStatus.BAD_REQUEST));
  }