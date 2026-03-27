import { Repository } from 'typeorm';
import { Apply } from '../../entities/apply.entity';
import { Boss } from '../../entities/boss.entity';
import { FundFlow } from '../../entities/fund-flow.entity';
import { ProjectReport } from '../../entities/project-report.entity';
import { RewardPenalty } from '../../entities/reward-penalty.entity';
import { User } from '../../entities/user.entity';
export declare class DataPanelService {
    private readonly userRepository;
    private readonly bossRepository;
    private readonly projectReportRepository;
    private readonly applyRepository;
    private readonly fundFlowRepository;
    private readonly rewardPenaltyRepository;
    constructor(userRepository: Repository<User>, bossRepository: Repository<Boss>, projectReportRepository: Repository<ProjectReport>, applyRepository: Repository<Apply>, fundFlowRepository: Repository<FundFlow>, rewardPenaltyRepository: Repository<RewardPenalty>);
    getOverview(): Promise<{
        userTotal: number;
        activeUserTotal: number;
        bossTotal: number;
        activeBossTotal: number;
        reportTotal: number;
        pendingReportTotal: number;
        applyTotal: number;
        pendingApplyTotal: number;
        totalReportAmount: string;
        totalShopMoney: string;
        totalPlayerCommission: string;
        totalReferrerCommission: string;
        totalApplyAmount: string;
        totalFundFlowAmount: string;
        totalRewardPenaltyAmount: string;
    }>;
    getPlayerOverview(): Promise<{
        playerTotal: number;
        activePlayerTotal: number;
        totalDeposit: string;
        totalDepositPay: string;
        totalProjectHypothecate: number;
        totalRewardPenaltyAmount: string;
        totalPlayerCommission: string;
    }>;
    private sumApplyAmount;
    private sumFundFlowAmount;
    private sumRewardPenaltyAmount;
    private sumProjectReportAmount;
    private sumUserAmount;
    private sumUserNumber;
    private toMoney;
}
