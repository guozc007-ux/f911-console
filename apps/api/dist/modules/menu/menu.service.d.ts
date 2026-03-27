import { Repository } from 'typeorm';
import { Menu } from '../../entities/menu.entity';
import { PaginatedDto } from '../../responses';
import { CreateMenuDto, ListMenuDto, UpdateMenuDto } from './dto/menu.dto';
type SafeMenu = Omit<Menu, 'deletedAt'>;
export declare class MenuService {
    private readonly menuRepository;
    constructor(menuRepository: Repository<Menu>);
    findPaginated(query: ListMenuDto): Promise<PaginatedDto<SafeMenu>>;
    findById(menuId: number): Promise<SafeMenu>;
    create(dto: CreateMenuDto): Promise<SafeMenu>;
    update(menuId: number, dto: UpdateMenuDto): Promise<SafeMenu>;
    remove(menuId: number): Promise<void>;
    private toSafeMenu;
    private getPublicSelect;
    private getPublicColumns;
}
export {};
