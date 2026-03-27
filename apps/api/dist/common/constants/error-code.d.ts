import { BusinessCode } from '../../responses';
export interface ErrorDefinition {
    code: BusinessCode;
    message: string;
    httpStatus: number;
}
export declare const ERROR_CODE_MAP: Record<number, ErrorDefinition>;
