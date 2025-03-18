import { IsNotEmpty, IsStrongPassword, MaxLength, MinLength } from "class-validator";
import { DtoPrefix, getValidationMessage, ValidationType } from "src/_common/enums/ValidationMessages.enum";

export class LoginRequestDTO{

    @MaxLength(50,{message: getValidationMessage(DtoPrefix.EMAIL,ValidationType.MAX_LENGTH,50)})
    @MinLength(6,{message: getValidationMessage(DtoPrefix.EMAIL,ValidationType.MIN_LENGTH,6)})
    @IsNotEmpty({message: getValidationMessage(DtoPrefix.EMAIL, ValidationType.NOT_EMPTY)})
    email: string;

    @IsStrongPassword({},{message: getValidationMessage(DtoPrefix.PASSWORD,ValidationType.NOT_STRONG)})
    @MaxLength(50,{message: getValidationMessage(DtoPrefix.EMAIL,ValidationType.MAX_LENGTH,50)})
    @MinLength(6,{message: getValidationMessage(DtoPrefix.EMAIL,ValidationType.MIN_LENGTH,6)})
    @IsNotEmpty({message: getValidationMessage(DtoPrefix.EMAIL, ValidationType.NOT_EMPTY)})
    password: string;
}