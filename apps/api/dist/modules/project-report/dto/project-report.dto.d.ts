export declare class ListProjectReportDto {
    page: number;
    pageSize: number;
    userId?: number;
    customerId?: number;
    bossId?: number;
    categoryId?: number;
    status?: number;
    payStatus?: number;
    no?: string;
}
export declare class CreateProjectReportDto {
    no?: string;
    userId: number;
    customerId: number;
    bossId: number;
    categoryId: number;
    quantity: number;
    type?: string;
    remark?: string;
    playerImg?: string[];
    status?: number;
    payStatus?: number;
    startTime?: string;
    endTime?: string;
    feedback?: string;
}
export declare class UpdateProjectReportDto {
    userId?: number;
    customerId?: number;
    bossId?: number;
    categoryId?: number;
    quantity?: number;
    type?: string;
    remark?: string;
    playerImg?: string[];
    startTime?: string;
    endTime?: string;
    feedback?: string;
}
export declare class UpdateProjectReportStatusDto {
    status: number;
}
export declare class UpdateProjectReportPayStatusDto {
    payStatus: number;
}
