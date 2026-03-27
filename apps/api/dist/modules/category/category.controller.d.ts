import { CategoryService } from './category.service';
import { CreateCategoryDto, ListCategoryDto, UpdateCategoryDto } from './dto/category.dto';
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    list(query: ListCategoryDto): Promise<import("../../responses").PaginatedDto<{
        type: string;
        status: number;
        createdAt: Date;
        updatedAt: Date;
        categoryId: number;
        categoryFid: number;
        categoryName: string;
        categoryPrice: string;
        categoryType: string;
        commissionRate: string;
        categorySort: number;
        categoryRemark: string;
        projectReports: import("../../entities/project-report.entity").ProjectReport[];
    }>>;
    findOne(id: number): Promise<{
        type: string;
        status: number;
        createdAt: Date;
        updatedAt: Date;
        categoryId: number;
        categoryFid: number;
        categoryName: string;
        categoryPrice: string;
        categoryType: string;
        commissionRate: string;
        categorySort: number;
        categoryRemark: string;
        projectReports: import("../../entities/project-report.entity").ProjectReport[];
    }>;
    create(dto: CreateCategoryDto): Promise<{
        type: string;
        status: number;
        createdAt: Date;
        updatedAt: Date;
        categoryId: number;
        categoryFid: number;
        categoryName: string;
        categoryPrice: string;
        categoryType: string;
        commissionRate: string;
        categorySort: number;
        categoryRemark: string;
        projectReports: import("../../entities/project-report.entity").ProjectReport[];
    }>;
    update(id: number, dto: UpdateCategoryDto): Promise<{
        type: string;
        status: number;
        createdAt: Date;
        updatedAt: Date;
        categoryId: number;
        categoryFid: number;
        categoryName: string;
        categoryPrice: string;
        categoryType: string;
        commissionRate: string;
        categorySort: number;
        categoryRemark: string;
        projectReports: import("../../entities/project-report.entity").ProjectReport[];
    }>;
    remove(id: number): Promise<null>;
}
