import { DataPanelService } from './data-panel.service';
export declare class DataPanelController {
    private readonly dataPanelService;
    constructor(dataPanelService: DataPanelService);
    overview(): Promise<{
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
    playerOverview(): Promise<{
        playerTotal: number;
        activePlayerTotal: number;
        totalDeposit: string;
        totalDepositPay: string;
        totalProjectHypothecate: number;
        totalRewardPenaltyAmount: string;
        totalPlayerCommission: string;
    }>;
}
