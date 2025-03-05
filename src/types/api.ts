export type ApiError = {
    msg: string;
    error: true;
};

export type ApiResponse<T> =
    | { data: T; error: null }
    | { data: null; error: ApiError };