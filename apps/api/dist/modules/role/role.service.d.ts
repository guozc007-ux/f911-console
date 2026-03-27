import { Repository } from 'typeorm';
import { Menu } from '../../entities/menu.entity';
import { Role } from '../../entities/role.entity';
import { PaginatedDto } from '../../responses';
import { AssignMenusToRoleDto, CreateRoleDto, ListRoleDto, UpdateRoleDto } from './dto/role.dto';
type SafeRole = Omit<Role, 'menus' | 'deletedAt'>;
type RoleMenuResult = Omit<SafeRole, 'menus'> & {
    menus: Menu[];
};
export declare class RoleService {
    private readonly roleRepository;
    private readonly menuRepository;
    constructor(roleRepository: Repository<Role>, menuRepository: Repository<Menu>);
    findPaginated(query: ListRoleDto): Promise<PaginatedDto<SafeRole>>;
    findById(roleId: number): Promise<RoleMenuResult>;
    create(dto: CreateRoleDto): Promise<SafeRole>;
    update(roleId: number, dto: UpdateRoleDto): Promise<SafeRole>;
    assignMenus(roleId: number, dto: AssignMenusToRoleDto): Promise<RoleMenuResult>;
    remove(roleId: number): Promise<void>;
    private toSafeRole;
}
export {};
