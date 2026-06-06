export interface AuthRespons  {
    sucess: boolean,
    data?: object | string,
    error?: string | responsError
}

export interface responsError {
    code: string
    message: string
}