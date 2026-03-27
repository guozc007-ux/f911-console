export declare class ListApplyDto {
    page: number;
    pageSize: number;
    userId?: number;
    checkStatus?: number;
    remit?: number;
    status?: number;
    keyword?: string;
}
export declare class CreateApplyDto {
    userId: number;
    money: number;
    alipayAccount: string;
    alipayName: string;
    status?: number;
}
export declare class UpdateApplyDto {
    userId?: number;
    money?: number;
    alipayAccount?: string;
    alipayName?: string;
    status?: number;
}
export declare class UpdateApplyCheckDto {
    checkStatus: number;
    checkRemark?: string;
    checkOperatorId?: number;
}
export declare class UpdateApplyRemitDto {
    remit: number;
    remitRemark?: string;
}
