export interface Response<T = void> {
    success: boolean;
    message: string;
    code?: string | number;
    data?: T;
}