import { CreateMenuDto, ListMenuDto, UpdateMenuDto } from './dto/menu.dto';
import { MenuService } from './menu.service';
export declare class MenuController {
    private readonly menuService;
    constructor(menuService: MenuService);
    list(query: ListMenuDto): Promise<import("../../responses").PaginatedDto<{
        name: string;
        url: string;
        status: number;
        createdAt: Date;
        updatedAt: Date;
        sort: number;
        menuId: number;
        icon: string;
        parentId: number;
        roles: import("../../entities/role.entity").Role[];
    }>>;
    findOne(id: number): Promise<{
        name: string;
        url: string;
        status: number;
        createdAt: Date;
        updatedAt: Date;
        sort: number;
        menuId: number;
        icon: string;
        parentId: number;
        roles: import("../../entities/role.entity").Role[];
    }>;
    create(dto: CreateMenuDto): Promise<{
        name: string;
        url: string;
        status: number;
        createdAt: Date;
        updatedAt: Date;
        sort: number;
        menuId: number;
        icon: string;
        parentId: number;
        roles: import("../../entities/role.entity").Role[];
    }>;
    update(id: number, dto: UpdateMenuDto): Promise<{
        name: string;
        url: string;
        status: number;
        createdAt: Date;
        updatedAt: Date;
        sort: number;
        menuId: number;
        icon: string;
        parentId: number;
        roles: import("../../entities/role.entity").Role[];
    }>;
    remove(id: number): Promise<null>;
}
