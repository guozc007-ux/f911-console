import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { IsNull, Repository } from 'typeorm'
import { Apply } from '../../entities/apply.entity'
import { Boss } from '../../entities/boss.entity'
import { FundFlow } from '../../entities/fund-flow.entity'
import { ProjectReport } from '../../entities/project-report.entity'
import { RewardPenalty } from '../../entities/reward-penalty.entity'
import { User } from '../../entities/user.entity'

@Injectable()
export class DataPanelService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Boss)
    private readonly bossRepository: Repository<Boss>,
    @InjectRepository(ProjectReport)
    private readonly projectReportRepository: Repository<ProjectReport>,
    @InjectRepository(Apply)
    private readonly applyRepository: Repository<Apply>,
    @InjectRepository(FundFlow)
    private readonly fundFlowRepository: Repository<FundFlow>,
    @InjectRepository(RewardPenalty)
    private readonly rewardPenaltyRepository: Repository<RewardPenalty>,
  ) {}

  async getOverview() {
    const [userTotal, activeUserTotal, bossTotal, activeBossTotal, reportTotal, pendingReportTotal, applyTotal, pendingApplyTotal] =
      await Promise.all([
        this.userRepository.count({ where: { deletedAt: IsNull() } }),
        this.userRepository.count({ where: { deletedAt: IsNull(), status: 1 } }),
        this.bossRepository.count({ where: { deletedAt: IsNull() } }),
        this.bossRepository.count({ where: { deletedAt: IsNull(), status: 1 } }),
        this.projectReportRepository.count({ where: { deletedAt: IsNull() } }),
        this.projectReportRepository.count({ where: { deletedAt: IsNull(), status: 0 } }),
        this.applyRepository.count({ where: { deletedAt: IsNull() } }),
        this.applyRepository.count({ where: { deletedAt: IsNull(), checkStatus: 0 } }),
      ])

    const [reportSum, applySum, fundFlowSum, rewardPenaltySum] = await Promise.all([
      this.sumProjectReportAmount('totalAmount'),
      this.sumApplyAmount(),
      this.sumFundFlowAmount(),
      this.sumRewardPenaltyAmount(),
    ])

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
    }
  }

  async getPlayerOverview() {
    const [playerTotal, activePlayerTotal, totalDeposit, totalDepositPay, totalProjectHypothecate, rewardPenaltyTotal, playerCommissionTotal] =
      await Promise.all([
        this.userRepository.count({ where: { deletedAt: IsNull(), role: 1 } }),
        this.userRepository.count({ where: { deletedAt: IsNull(), role: 1, status: 1 } }),
        this.sumUserAmount('deposit', 1),
        this.sumUserAmount('depositPay', 1),
        this.sumUserNumber('projectHypothecate', 1),
        this.sumRewardPenaltyAmount(),
        this.sumProjectReportAmount('playerCommission'),
      ])

    return {
      playerTotal,
      activePlayerTotal,
      totalDeposit,
      totalDepositPay,
      totalProjectHypothecate,
      totalRewardPenaltyAmount: rewardPenaltyTotal,
      totalPlayerCommission: playerCommissionTotal.playerCommission,
    }
  }

  private async sumApplyAmount(): Promise<string> {
    const result = await this.applyRepository
      .createQueryBuilder('apply')
      .select('COALESCE(SUM(apply.money), 0)', 'total')
      .where('apply.deletedAt IS NULL')
      .getRawOne<{ total: string }>()

    return this.toMoney(Number(result?.total ?? 0))
  }

  private async sumFundFlowAmount(): Promise<string> {
    const result = await this.fundFlowRepository
      .createQueryBuilder('fundFlow')
      .select('COALESCE(SUM(fundFlow.amount), 0)', 'total')
      .where('fundFlow.deletedAt IS NULL')
      .getRawOne<{ total: string }>()

    return this.toMoney(Number(result?.total ?? 0))
  }

  private async sumRewardPenaltyAmount(): Promise<string> {
    const result = await this.rewardPenaltyRepository
      .createQueryBuilder('rewardPenalty')
      .select('COALESCE(SUM(rewardPenalty.amount), 0)', 'total')
      .where('rewardPenalty.deletedAt IS NULL')
      .getRawOne<{ total: string }>()

    return this.toMoney(Number(result?.total ?? 0))
  }

  private async sumProjectReportAmount(field: 'totalAmount' | 'shopMoney' | 'playerCommission' | 'referrerCommission') {
    const columns = ['totalAmount', 'shopMoney', 'playerCommission', 'referrerCommission'] as const
    const totals = await Promise.all(
      columns.map(async (column) => {
        const result = await this.projectReportRepository
          .createQueryBuilder('projectReport')
          .select(`COALESCE(SUM(projectReport.${column}), 0)`, 'total')
          .where('projectReport.deletedAt IS NULL')
          .getRawOne<{ total: string }>()

        return [column, this.toMoney(Number(result?.total ?? 0))] as const
      }),
    )

    return Object.fromEntries(totals) as Record<typeof field | (typeof columns)[number], string>
  }

  private async sumUserAmount(field: 'deposit' | 'depositPay', role: number): Promise<string> {
    const result = await this.userRepository
      .createQueryBuilder('user')
      .select(`COALESCE(SUM(user.${field}), 0)`, 'total')
      .where('user.deletedAt IS NULL')
      .andWhere('user.role = :role', { role })
      .getRawOne<{ total: string }>()

    return this.toMoney(Number(result?.total ?? 0))
  }

  private async sumUserNumber(field: 'projectHypothecate', role: number): Promise<number> {
    const result = await this.userRepository
      .createQueryBuilder('user')
      .select(`COALESCE(SUM(user.${field}), 0)`, 'total')
      .where('user.deletedAt IS NULL')
      .andWhere('user.role = :role', { role })
      .getRawOne<{ total: string }>()

    return Number(result?.total ?? 0)
  }

  private toMoney(value: number): string {
    return value.toFixed(2)
  }
}
