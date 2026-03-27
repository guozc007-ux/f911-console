import { AssignMenusToRoleDto, CreateRoleDto, ListRoleDto, UpdateRoleDto } from './dto/role.dto';
import { RoleService } from './role.service';
export declare class RoleController {
    private readonly roleService;
    constructor(roleService: RoleService);
    list(query: ListRoleDto): Promise<import("../../responses").PaginatedDto<{
        name: string;
        remark: string;
        createdAt: Date;
        updatedAt: Date;
        roleId: number;
        del: number;
    }>>;
    findOne(id: number): Promise<Omit<{
        name: string;
        remark: string;
        createdAt: Date;
        updatedAt: Date;
        roleId: number;
        del: number;
    }, "menus"> & {
        menus: import("../../entities/menu.entity").Menu[];
    }>;
    create(dto: CreateRoleDto): Promise<{
        name: string;
        remark: string;
        createdAt: Date;
        updatedAt: Date;
        roleId: number;
        del: number;
    }>;
    update(id: number, dto: UpdateRoleDto): Promise<{
        name: string;
        remark: string;
        createdAt: Date;
        updatedAt: Date;
        roleId: number;
        del: number;
    }>;
    assignMenus(id: number, dto: AssignMenusToRoleDto): Promise<Omit<{
        name: string;
        remark: string;
        createdAt: Date;
        updatedAt: Date;
        roleId: number;
        del: number;
    }, "menus"> & {
        menus: import("../../entities/menu.entity").Menu[];
    }>;
    remove(id: number): Promise<null>;
}
