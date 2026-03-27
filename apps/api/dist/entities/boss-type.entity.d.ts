import { Boss } from './boss.entity';
export declare class BossType {
    bossTypeId: number;
    name: string;
    percent: string;
    sort: number;
    status: number;
    bosses: Boss[];
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}
