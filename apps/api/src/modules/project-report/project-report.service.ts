import { Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ProjectReport } from '../../entities/project-report.entity'
import { User } from '../../entities/user.entity'
import { Boss } from '../../entities/boss.entity'
import { Category } from '../../entities/category.entity'
import { BossType } from '../../entities/boss-type.entity'
import { PlayerLevel } from '../../entities/player-level.entity'
import { PaginatedDto } from '../../responses'
import { BusinessCode } from '../../responses'
import { BusinessException } from '../../common/filters/business.exception'
import {
  CreateProjectReportDto,
  ListProjectReportDto,
  UpdateProjectReportDto,
  UpdateProjectReportPayStatusDto,
  UpdateProjectReportStatusDto,
} from './dto/project-report.dto'

type SafeProjectReport = Omit<ProjectReport, 'deletedAt'>

@Injectable()
export class ProjectReportService {
  constructor(
    @InjectRepository(ProjectReport)
    private readonly projectReportRepository: Repository<ProjectReport>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Boss)
    private readonly bossRepository: Repository<Boss>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(BossType)
    private readonly bossTypeRepository: Repository<BossType>,
    @InjectRepository(PlayerLevel)
    private readonly playerLevelRepository: Repository<PlayerLevel>,
  ) {}

  async findPaginated(query: ListProjectReportDto): Promise<PaginatedDto<SafeProjectReport>> {
    const qb = this.projectReportRepository
      .createQueryBuilder('projectReport')
      .select(this.getPublicColumns())
      .where('projectReport.deletedAt IS NULL')
      .skip((query.page - 1) * query.pageSize)
      .take(query.pageSize)
      .orderBy('projectReport.createdAt', 'DESC')

    if (query.userId !== undefined) {
      qb.andWhere('projectReport.userId = :userId', { userId: query.userId })
    }

    if (query.customerId !== undefined) {
      qb.andWhere('projectReport.customerId = :customerId', { customerId: query.customerId })
    }

    if (query.bossId !== undefined) {
      qb.andWhere('projectReport.bossId = :bossId', { bossId: query.bossId })
    }

    if (query.categoryId !== undefined) {
      qb.andWhere('projectReport.categoryId = :categoryId', { categoryId: query.categoryId })
    }

    if (query.status !== undefined) {
      qb.andWhere('projectReport.status = :status', { status: query.status })
    }

    if (query.payStatus !== undefined) {
      qb.andWhere('projectReport.payStatus = :payStatus', { payStatus: query.payStatus })
    }

    if (query.no) {
      qb.andWhere('projectReport.no LIKE :no', { no: `%${query.no}%` })
    }

    const [reports, total] = await qb.getManyAndCount()
    return PaginatedDto.of(reports.map((report) => this.toSafeProjectReport(report)), total, query.page, query.pageSize)
  }

  async findById(projectReportId: number): Promise<SafeProjectReport> {
    const report = await this.projectReportRepository.findOne({
      where: { projectReportId },
      select: this.getPublicSelect(),
    })

    if (!report) {
      throw new BusinessException(BusinessCode.REPORT_NOT_FOUND)
    }

    return this.toSafeProjectReport(report)
  }

  async create(dto: CreateProjectReportDto): Promise<SafeProjectReport> {
    const relations = await this.resolveRelations(dto.userId, dto.bossId, dto.categoryId)
    await this.ensureUserExists(dto.customerId)

    const amounts = this.calculateAmounts({
      quantity: dto.quantity,
      categoryPrice: relations.category.categoryPrice,
      commissionRate: relations.category.commissionRate,
      playerLevelPercent: relations.playerLevelPercent,
      bossTypePercent: relations.bossTypePercent,
    })

    const report = this.projectReportRepository.create({
      no: dto.no?.trim() || `PR${Date.now()}`,
      userId: dto.userId,
      customerId: dto.customerId,
      bossId: dto.bossId,
      categoryId: dto.categoryId,
      quantity: this.toMoney(dto.quantity),
      totalAmount: amounts.totalAmount,
      playerCommission: amounts.playerCommission,
      referrerCommission: amounts.referrerCommission,
      shopMoney: amounts.shopMoney,
      type: dto.type?.trim() || 'project',
      remark: dto.remark ?? '',
      playerImg: dto.playerImg ?? [],
      status: dto.status ?? 1,
      payStatus: dto.payStatus ?? 1,
      startTime: dto.startTime ? new Date(dto.startTime) : null,
      endTime: dto.endTime ? new Date(dto.endTime) : null,
      feedback: dto.feedback ?? '',
    })

    const saved = await this.projectReportRepository.save(report)
    return this.toSafeProjectReport(saved)
  }

  async update(projectReportId: number, dto: UpdateProjectReportDto): Promise<SafeProjectReport> {
    const report = await this.projectReportRepository.findOne({ where: { projectReportId } })

    if (!report) {
      throw new BusinessException(BusinessCode.REPORT_NOT_FOUND)
    }

    const nextUserId = dto.userId ?? report.userId
    const nextBossId = dto.bossId ?? report.bossId
    const nextCategoryId = dto.categoryId ?? report.categoryId

    if (dto.customerId !== undefined) {
      await this.ensureUserExists(dto.customerId)
      report.customerId = dto.customerId
    }

    if (dto.userId !== undefined) {
      report.userId = dto.userId
    }

    if (dto.bossId !== undefined) {
      report.bossId = dto.bossId
    }

    if (dto.categoryId !== undefined) {
      report.categoryId = dto.categoryId
    }

    if (dto.type !== undefined) {
      report.type = dto.type
    }

    if (dto.remark !== undefined) {
      report.remark = dto.remark
    }

    if (dto.playerImg !== undefined) {
      report.playerImg = dto.playerImg
    }

    if (dto.startTime !== undefined) {
      report.startTime = dto.startTime ? new Date(dto.startTime) : null
    }

    if (dto.endTime !== undefined) {
      report.endTime = dto.endTime ? new Date(dto.endTime) : null
    }

    if (dto.feedback !== undefined) {
      report.feedback = dto.feedback
    }

    if (dto.userId !== undefined || dto.bossId !== undefined || dto.categoryId !== undefined || dto.quantity !== undefined) {
      const relations = await this.resolveRelations(nextUserId, nextBossId, nextCategoryId)
      const amounts = this.calculateAmounts({
        quantity: dto.quantity ?? Number(report.quantity),
        categoryPrice: relations.category.categoryPrice,
        commissionRate: relations.category.commissionRate,
        playerLevelPercent: relations.playerLevelPercent,
        bossTypePercent: relations.bossTypePercent,
      })

      report.quantity = this.toMoney(dto.quantity ?? Number(report.quantity))
      report.totalAmount = amounts.totalAmount
      report.playerCommission = amounts.playerCommission
      report.referrerCommission = amounts.referrerCommission
      report.shopMoney = amounts.shopMoney
    }

    const updated = await this.projectReportRepository.save(report)
    return this.toSafeProjectReport(updated)
  }

  async updateStatus(projectReportId: number, dto: UpdateProjectReportStatusDto): Promise<SafeProjectReport> {
    const report = await this.projectReportRepository.findOne({ where: { projectReportId } })

    if (!report) {
      throw new BusinessException(BusinessCode.REPORT_NOT_FOUND)
    }

    report.status = dto.status
    const updated = await this.projectReportRepository.save(report)
    return this.toSafeProjectReport(updated)
  }

  async updatePayStatus(projectReportId: number, dto: UpdateProjectReportPayStatusDto): Promise<SafeProjectReport> {
    const report = await this.projectReportRepository.findOne({ where: { projectReportId } })

    if (!report) {
      throw new BusinessException(BusinessCode.REPORT_NOT_FOUND)
    }

    report.payStatus = dto.payStatus
    const updated = await this.projectReportRepository.save(report)
    return this.toSafeProjectReport(updated)
  }

  async remove(projectReportId: number): Promise<void> {
    await this.findById(projectReportId)
    await this.projectReportRepository.softDelete(projectReportId)
  }

  private async resolveRelations(userId: number, bossId: number, categoryId: number) {
    const user = await this.userRepository.findOne({ where: { userId }, select: { userId: true, playerLevelId: true } })
    if (!user) {
      throw new BusinessException(BusinessCode.USER_NOT_FOUND)
    }

    const boss = await this.bossRepository.findOne({ where: { bossId }, select: { bossId: true, bossTypeId: true } })
    if (!boss) {
      throw new BusinessException(BusinessCode.BOSS_NOT_FOUND)
    }

    const category = await this.categoryRepository.findOne({
      where: { categoryId },
      select: { categoryId: true, categoryPrice: true, commissionRate: true },
    })
    if (!category) {
      throw new BusinessException(BusinessCode.CATEGORY_NOT_FOUND)
    }

    const bossType = boss.bossTypeId
      ? await this.bossTypeRepository.findOne({ where: { bossTypeId: boss.bossTypeId }, select: { bossTypeId: true, percent: true } })
      : null

    const playerLevel = user.playerLevelId
      ? await this.playerLevelRepository.findOne({
          where: { playerLevelId: user.playerLevelId },
          select: { playerLevelId: true, percent: true },
        })
      : null

    return {
      category,
      bossTypePercent: Number(bossType?.percent ?? 0),
      playerLevelPercent: Number(playerLevel?.percent ?? 0),
    }
  }

  private async ensureUserExists(userId: number): Promise<void> {
    const user = await this.userRepository.findOne({ where: { userId }, select: { userId: true } })

    if (!user) {
      throw new BusinessException(BusinessCode.USER_NOT_FOUND)
    }
  }

  private calculateAmounts(input: {
    quantity: number
    categoryPrice: string
    commissionRate: string
    playerLevelPercent: number
    bossTypePercent: number
  }) {
    const quantity = input.quantity
    const categoryPrice = Number(input.categoryPrice)
    const commissionRate = Number(input.commissionRate)
    const totalAmount = categoryPrice * quantity
    const playerCommission = totalAmount * (commissionRate / 100) * (1 + input.playerLevelPercent / 100)
    const referrerCommission = totalAmount * (input.bossTypePercent / 100)
    const shopMoney = totalAmount - playerCommission - referrerCommission

    return {
      totalAmount: this.toMoney(totalAmount),
      playerCommission: this.toMoney(playerCommission),
      referrerCommission: this.toMoney(referrerCommission),
      shopMoney: this.toMoney(shopMoney),
    }
  }

  private toMoney(value: number): string {
    return value.toFixed(2)
  }

  private toSafeProjectReport(report: ProjectReport): SafeProjectReport {
    const { deletedAt, ...safe } = report
    return safe
  }

  private getPublicSelect() {
    return {
      projectReportId: true,
      no: true,
      userId: true,
      customerId: true,
      bossId: true,
      categoryId: true,
      quantity: true,
      totalAmount: true,
      playerCommission: true,
      referrerCommission: true,
      shopMoney: true,
      type: true,
      remark: true,
      playerImg: true,
      status: true,
      payStatus: true,
      startTime: true,
      endTime: true,
      feedback: true,
      createdAt: true,
      updatedAt: true,
    }
  }

  private getPublicColumns() {
    return [
      'projectReport.projectReportId',
      'projectReport.no',
      'projectReport.userId',
      'projectReport.customerId',
      'projectReport.bossId',
      'projectReport.categoryId',
      'projectReport.quantity',
      'projectReport.totalAmount',
      'projectReport.playerCommission',
      'projectReport.referrerCommission',
      'projectReport.shopMoney',
      'projectReport.type',
      'projectReport.remark',
      'projectReport.playerImg',
      'projectReport.status',
      'projectReport.payStatus',
      'projectReport.startTime',
      'projectReport.endTime',
      'projectReport.feedback',
      'projectReport.createdAt',
      'projectReport.updatedAt',
    ]
  }
}
