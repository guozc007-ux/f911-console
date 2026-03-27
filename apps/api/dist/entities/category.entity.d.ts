import { ProjectReport } from './project-report.entity';
export declare class Category {
    categoryId: number;
    categoryFid: number;
    categoryName: string;
    categoryPrice: string;
    categoryType: string;
    commissionRate: string;
    categorySort: number;
    categoryRemark: string;
    type: string;
    status: number;
    projectReports: ProjectReport[];
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}
