export declare class ListBossDto {
    page: number;
    pageSize: number;
    sex?: number;
    status?: number;
    bossTypeId?: number;
    referrer?: number;
    keyword?: string;
}
export declare class CreateBossDto {
    nickname: string;
    code: string;
    sex: number;
    phone: string;
    wx: string;
    referrer?: number;
    referrerCommission?: number;
    bossTypeId: number;
    status?: number;
}
export declare class UpdateBossDto {
    nickname?: string;
    code?: string;
    sex?: number;
    phone?: string;
    wx?: string;
    referrer?: number;
    referrerCommission?: number;
    bossTypeId?: number;
    status?: number;
}
