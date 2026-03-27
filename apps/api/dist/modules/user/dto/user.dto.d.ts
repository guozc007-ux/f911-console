export declare class ListUserDto {
    page: number;
    pageSize: number;
    role?: number;
    status?: number;
    keyword?: string;
}
export declare class CreateUserDto {
    account: string;
    password: string;
    nickname: string;
    code: string;
    sex: number;
    phone: string;
    role: number;
    playerLevelId: number;
    avatar?: string;
    zfb?: string;
    name?: string;
    status?: number;
    remark?: string;
}
export declare class UpdateUserDto {
    account?: string;
    nickname?: string;
    code?: string;
    sex?: number;
    phone?: string;
    role?: number;
    playerLevelId?: number;
    status?: number;
    remark?: string;
    avatar?: string;
    zfb?: string;
    name?: string;
}
export declare class UpdateUserStatusDto {
    status: number;
}
