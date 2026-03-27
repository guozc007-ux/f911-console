export declare class ListRoleDto {
    page: number;
    pageSize: number;
    keyword?: string;
}
export declare class CreateRoleDto {
    name: string;
    remark?: string;
}
export declare class UpdateRoleDto {
    name?: string;
    remark?: string;
    del?: number;
}
export declare class AssignMenusToRoleDto {
    menuIds: number[];
}
