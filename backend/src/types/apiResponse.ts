export interface ApiResponse<T> {
    success: boolean;
    errorCode?: string;
    errors?: Array<any>;
    data?: T;
}
