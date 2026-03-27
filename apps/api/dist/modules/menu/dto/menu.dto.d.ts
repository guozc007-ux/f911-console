export declare class ListMenuDto {
    page: number;
    pageSize: number;
    keyword?: string;
}
export declare class CreateMenuDto {
    name: string;
    url: string;
    icon: string;
    sort: number;
    parentId: number;
}
export declare class UpdateMenuDto {
    name?: string;
    url?: string;
    icon?: string;
    sort?: number;
    parentId?: number;
    status?: number;
}
