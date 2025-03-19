export class BaseResponse<T> {
    data : T;
    status: number;
    message: string;
    constructor(data:T, message: string, status: number) {
        this.data = data;
        this.message = message;
        this.status = status;
    }
}