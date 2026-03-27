import { Boss } from './boss.entity';
import { User } from './user.entity';
export declare class ProjectReport {
    projectReportId: number;
    no: string;
    userId: number;
    customerId: number;
    bossId: number;
    categoryId: number;
    quantity: string;
    totalAmount: string;
    playerCommission: string;
    referrerCommission: string;
    shopMoney: string;
    type: string;
    remark: string;
    playerImg: unknown;
    status: number;
    payStatus: number;
    startTime: Date | null;
    endTime: Date | null;
    feedback: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    user: User;
    customer: User;
    boss: Boss;
}
