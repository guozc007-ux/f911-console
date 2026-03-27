import { Menu } from './menu.entity';
export declare class Role {
    roleId: number;
    name: string;
    del: number;
    remark: string;
    menus: Menu[];
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}
