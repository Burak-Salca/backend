import { BaseResponse } from "src/_base/response/base.response";
import { AdminResponse } from "src/_common/response/Admin.response";
import { PersonResponse } from "src/_common/response/Person.response";

class LoginResponse{
    accessToken: string;
    refreshToken: string;
    user: PersonResponse;
}

export class LoginResponseDTO extends BaseResponse<LoginResponse> {
}