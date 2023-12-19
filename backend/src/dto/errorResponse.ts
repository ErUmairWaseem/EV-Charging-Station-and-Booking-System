export class ErrorResponse {
    errorCode: string;

    constructor(errorCode: string) {
        this.errorCode = errorCode;
    }
}