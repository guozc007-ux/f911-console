import { ProjectReport } from './project-report.entity';
import { FundFlow } from './fund-flow.entity';
export declare class Boss {
    bossId: number;
    nickname: string;
    code: string;
    sex: number;
    phone: string;
    wx: string;
    referrer: number;
    referrerCommission: string;
    bossTypeId: number;
    status: number;
    reports: ProjectReport[];
    fundFlows: FundFlow[];
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}
