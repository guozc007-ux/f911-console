export declare enum ResponseCode {
    SUCCESS = 200,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    SERVER_ERROR = 500
}
export declare enum BusinessCode {
    SUCCESS = 200,
    PARAM_ERROR = 4001,
    UNAUTHORIZED = 4002,
    TOKEN_EXPIRED = 4003,
    TOKEN_INVALID = 4004,
    FORBIDDEN = 4005,
    CAPTCHA_REQUIRED = 4101,
    CAPTCHA_ERROR = 4102,
    CAPTCHA_EXPIRED = 4103,
    USER_NOT_FOUND = 4201,
    USER_DISABLED = 4202,
    USER_EXISTS = 4203,
    BOSS_NOT_FOUND = 4301,
    ORDER_NOT_FOUND = 4401,
    REPORT_NOT_FOUND = 4501,
    REPORT_ALREADY_PROCESSED = 4502,
    APPLY_NOT_FOUND = 4601,
    INSUFFICIENT_BALANCE = 4602,
    CATEGORY_NOT_FOUND = 4701,
    MENU_NOT_FOUND = 4702,
    ROLE_NOT_FOUND = 4801
}
export declare class ResponseDto<T = unknown> {
    code: number;
    msg: string;
    data: T;
    private constructor();
    static ok<T>(data: T, msg?: string): ResponseDto<T>;
    static fail(code: number, msg: string): ResponseDto<null>;
    static paramError(msg?: string): ResponseDto<null>;
    static unauthorized(msg?: string): ResponseDto<null>;
    static forbidden(msg?: string): ResponseDto<null>;
    static serverError(msg?: string): ResponseDto<null>;
}
export declare class PaginatedDto<T> {
    data: T[];
    total: number;
    page: number;
    pageSize: number;
    pageCount: number;
    private constructor();
    static of<T>(data: T[], total: number, page: number, pageSize: number): PaginatedDto<T>;
}
