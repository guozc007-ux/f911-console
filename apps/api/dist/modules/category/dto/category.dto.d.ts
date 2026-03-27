export declare class ListCategoryDto {
    page: number;
    pageSize: number;
    status?: number;
    categoryName?: string;
}
export declare class CreateCategoryDto {
    categoryFid: number;
    categoryName: string;
    categoryType: string;
    categoryPrice: number;
    commissionRate: number;
    categorySort: number;
    categoryRemark: string;
    status?: number;
}
export declare class UpdateCategoryDto {
    categoryFid?: number;
    categoryName?: string;
    categoryType?: string;
    categoryPrice?: number;
    commissionRate?: number;
    categorySort?: number;
    categoryRemark?: string;
    status?: number;
}
