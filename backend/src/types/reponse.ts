
export interface Response<T> {
    success: boolean;
    errorCode?: string;
    data?: T;
}

