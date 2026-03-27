import { Repository } from 'typeorm';
import { Category } from '../../entities/category.entity';
import { PaginatedDto } from '../../responses';
import { CreateCategoryDto, ListCategoryDto, UpdateCategoryDto } from './dto/category.dto';
type SafeCategory = Omit<Category, 'deletedAt'>;
export declare class CategoryService {
    private readonly categoryRepository;
    constructor(categoryRepository: Repository<Category>);
    findPaginated(query: ListCategoryDto): Promise<PaginatedDto<SafeCategory>>;
    findById(categoryId: number): Promise<SafeCategory>;
    create(dto: CreateCategoryDto): Promise<SafeCategory>;
    update(categoryId: number, dto: UpdateCategoryDto): Promise<SafeCategory>;
    remove(categoryId: number): Promise<void>;
    private toSafeCategory;
    private getPublicSelect;
    private getPublicColumns;
}
export {};
