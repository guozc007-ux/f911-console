import { Boss } from './boss.entity';
import { User } from './user.entity';
export declare class FundFlow {
    fundFlowId: number;
    bossId: number;
    amount: string;
    give: string;
    balanceBefore: string;
    balanceAfter: string;
    operationType: number;
    type: string;
    businessType: string;
    businessId: number;
    remark: string;
    extraData: unknown;
    customerId: number | null;
    photo: string;
    status: number;
    del: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    boss: Boss;
    customer?: User;
}
