import { Role } from './role.entity';
export declare class Menu {
    menuId: number;
    name: string;
    url: string;
    icon: string;
    sort: number;
    parentId: number;
    status: number;
    roles: Role[];
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}
