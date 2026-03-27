"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataPanelService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const apply_entity_1 = require("../../entities/apply.entity");
const boss_entity_1 = require("../../entities/boss.entity");
const fund_flow_entity_1 = require("../../entities/fund-flow.entity");
const project_report_entity_1 = require("../../entities/project-report.entity");
const reward_penalty_entity_1 = require("../../entities/reward-penalty.entity");
const user_entity_1 = require("../../entities/user.entity");
let DataPanelService = class DataPanelService {
    constructor(userRepository, bossRepository, projectReportRepository, applyRepository, fundFlowRepository, rewardPenaltyRepository) {
        this.userRepository = userRepository;
        this.bossRepository = bossRepository;
        this.projectReportRepository = projectReportRepository;
        this.applyRepository = applyRepository;
        this.fundFlowRepository = fundFlowRepository;
        this.rewardPenaltyRepository = rewardPenaltyRepository;
    }
    async getOverview() {
        const [userTotal, activeUserTotal, bossTotal, activeBossTotal, reportTotal, pendingReportTotal, applyTotal, pendingApplyTotal] = await Promise.all([
            this.userRepository.count({ where: { deletedAt: (0, typeorm_2.IsNull)() } }),
            this.userRepository.count({ where: { deletedAt: (0, typeorm_2.IsNull)(), status: 1 } }),
            this.bossRepository.count({ where: { deletedAt: (0, typeorm_2.IsNull)() } }),
            this.bossRepository.count({ where: { deletedAt: (0, typeorm_2.IsNull)(), status: 1 } }),
            this.projectReportRepository.count({ where: { deletedAt: (0, typeorm_2.IsNull)() } }),
            this.projectReportRepository.count({ where: { deletedAt: (0, typeorm_2.IsNull)(), status: 0 } }),
            this.applyRepository.count({ where: { deletedAt: (0, typeorm_2.IsNull)() } }),
            this.applyRepository.count({ where: { deletedAt: (0, typeorm_2.IsNull)(), checkStatus: 0 } }),
        ]);
        const [reportSum, applySum, fundFlowSum, rewardPenaltySum] = await Promise.all([
            this.sumProjectReportAmount('totalAmount'),
            this.sumApplyAmount(),
            this.sumFundFlowAmount(),
            this.sumRewardPenaltyAmount(),
        ]);
        return {
            userTotal,
            activeUserTotal,
            bossTotal,
            activeBossTotal,
            reportTotal,
            pendingReportTotal,
            applyTotal,
            pendingApplyTotal,
            totalReportAmount: reportSum.totalAmount,
            totalShopMoney: reportSum.shopMoney,
            totalPlayerCommission: reportSum.playerCommission,
            totalReferrerCommission: reportSum.referrerCommission,
            totalApplyAmount: applySum,
            totalFundFlowAmount: fundFlowSum,
            totalRewardPenaltyAmount: rewardPenaltySum,
        };
    }
    async getPlayerOverview() {
        const [playerTotal, activePlayerTotal, totalDeposit, totalDepositPay, totalProjectHypothecate, rewardPenaltyTotal, playerCommissionTotal] = await Promise.all([
            this.userRepository.count({ where: { deletedAt: (0, typeorm_2.IsNull)(), role: 1 } }),
            this.userRepository.count({ where: { deletedAt: (0, typeorm_2.IsNull)(), role: 1, status: 1 } }),
            this.sumUserAmount('deposit', 1),
            this.sumUserAmount('depositPay', 1),
            this.sumUserNumber('projectHypothecate', 1),
            this.sumRewardPenaltyAmount(),
            this.sumProjectReportAmount('playerCommission'),
        ]);
        return {
            playerTotal,
            activePlayerTotal,
            totalDeposit,
            totalDepositPay,
            totalProjectHypothecate,
            totalRewardPenaltyAmount: rewardPenaltyTotal,
            totalPlayerCommission: playerCommissionTotal.playerCommission,
        };
    }
    async sumApplyAmount() {
        const result = await this.applyRepository
            .createQueryBuilder('apply')
            .select('COALESCE(SUM(apply.money), 0)', 'total')
            .where('apply.deletedAt IS NULL')
            .getRawOne();
        return this.toMoney(Number(result?.total ?? 0));
    }
    async sumFundFlowAmount() {
        const result = await this.fundFlowRepository
            .createQueryBuilder('fundFlow')
            .select('COALESCE(SUM(fundFlow.amount), 0)', 'total')
            .where('fundFlow.deletedAt IS NULL')
            .getRawOne();
        return this.toMoney(Number(result?.total ?? 0));
    }
    async sumRewardPenaltyAmount() {
        const result = await this.rewardPenaltyRepository
            .createQueryBuilder('rewardPenalty')
            .select('COALESCE(SUM(rewardPenalty.amount), 0)', 'total')
            .where('rewardPenalty.deletedAt IS NULL')
            .getRawOne();
        return this.toMoney(Number(result?.total ?? 0));
    }
    async sumProjectReportAmount(field) {
        const columns = ['totalAmount', 'shopMoney', 'playerCommission', 'referrerCommission'];
        const totals = await Promise.all(columns.map(async (column) => {
            const result = await this.projectReportRepository
                .createQueryBuilder('projectReport')
                .select(`COALESCE(SUM(projectReport.${column}), 0)`, 'total')
                .where('projectReport.deletedAt IS NULL')
                .getRawOne();
            return [column, this.toMoney(Number(result?.total ?? 0))];
        }));
        return Object.fromEntries(totals);
    }
    async sumUserAmount(field, role) {
        const result = await this.userRepository
            .createQueryBuilder('user')
            .select(`COALESCE(SUM(user.${field}), 0)`, 'total')
            .where('user.deletedAt IS NULL')
            .andWhere('user.role = :role', { role })
            .getRawOne();
        return this.toMoney(Number(result?.total ?? 0));
    }
    async sumUserNumber(field, role) {
        const result = await this.userRepository
            .createQueryBuilder('user')
            .select(`COALESCE(SUM(user.${field}), 0)`, 'total')
            .where('user.deletedAt IS NULL')
            .andWhere('user.role = :role', { role })
            .getRawOne();
        return Number(result?.total ?? 0);
    }
    toMoney(value) {
        return value.toFixed(2);
    }
};
exports.DataPanelService = DataPanelService;
exports.DataPanelService = DataPanelService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(boss_entity_1.Boss)),
    __param(2, (0, typeorm_1.InjectRepository)(project_report_entity_1.ProjectReport)),
    __param(3, (0, typeorm_1.InjectRepository)(apply_entity_1.Apply)),
    __param(4, (0, typeorm_1.InjectRepository)(fund_flow_entity_1.FundFlow)),
    __param(5, (0, typeorm_1.InjectRepository)(reward_penalty_entity_1.RewardPenalty)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], DataPanelService);
