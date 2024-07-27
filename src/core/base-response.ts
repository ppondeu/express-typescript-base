export type BaseResponse<T = unknown> = {
    success?: boolean;
    message?: string;
    data?: T;
}