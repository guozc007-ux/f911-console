export declare class ListOrderDto {
    page: number;
    pageSize: number;
    bossId?: number;
    customerId?: number;
    status?: number;
    no?: string;
    del?: number;
}
export declare class CreateOrderDto {
    no?: string;
    bossId: number;
    bossGameNickname: string;
    customerId: number;
    categoryIds: number[];
    userIds: number[];
    count: number;
    remark?: string;
}
export declare class UpdateOrderDto {
    bossGameNickname?: string;
    customerId?: number;
    categoryIds?: number[];
    userIds?: number[];
    count?: number;
    feedback?: string;
    remark?: string;
    del?: number;
}
export declare class UpdateOrderStatusDto {
    status: number;
}
export declare class AssignOrderCustomerDto {
    customerId: number;
}
