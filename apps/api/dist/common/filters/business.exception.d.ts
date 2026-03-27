import { BusinessCode } from '../../responses';
export declare class BusinessException extends Error {
    readonly code: BusinessCode;
    readonly httpStatus: number;
    constructor(code: BusinessCode, customMessage?: string);
}
