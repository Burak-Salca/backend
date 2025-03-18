import { IsNotEmpty, IsNumber, MaxLength } from "class-validator";
import { DtoPrefix, getValidationMessage, ValidationType } from "src/_common/enums/ValidationMessages.enum";

export class CreateStudentRequestDTO {
    
    @MaxLength(20, {message: getValidationMessage(DtoPrefix.LASTNAME, ValidationType.MAX_LENGTH, 20)})
    @IsNotEmpty({message: getValidationMessage(DtoPrefix.NAME, ValidationType.NOT_EMPTY)})
    name : string;

    
    @MaxLength(20, {message: getValidationMessage(DtoPrefix.LASTNAME, ValidationType.MAX_LENGTH, 20)})
    @IsNotEmpty({message: getValidationMessage(DtoPrefix.LASTNAME, ValidationType.NOT_EMPTY)})
    lastname : string;

    
    @IsNumber({},{message: getValidationMessage(DtoPrefix.IDENTITY_NUMBER, ValidationType.MUST_BE_NUMBER)})
    @IsNotEmpty({message: getValidationMessage(DtoPrefix.IDENTITY_NUMBER, ValidationType.NOT_EMPTY)})
    id : number;

}