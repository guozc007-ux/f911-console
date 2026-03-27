import { Brackets, Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Apply } from '../../entities/apply.entity'
import { User } from '../../entities/user.entity'
import { PaginatedDto } from '../../responses'
import { BusinessCode } from '../../responses'
import { BusinessException } from '../../common/filters/business.exception'
import {
  CreateApplyDto,
  ListApplyDto,
  UpdateApplyCheckDto,
  UpdateApplyDto,
  UpdateApplyRemitDto,
} from './dto/apply.dto'

type SafeApply = Omit<Apply, 'deletedAt'>

@Injectable()
export class ApplyService {
  constructor(
    @InjectRepository(Apply)
    private readonly applyRepository: Repository<Apply>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findPaginated(query: ListApplyDto): Promise<PaginatedDto<SafeApply>> {
    const qb = this.applyRepository
      .createQueryBuilder('apply')
      .select(this.getPublicColumns())
      .where('apply.deletedAt IS NULL')
      .skip((query.page - 1) * query.pageSize)
      .take(query.pageSize)
      .orderBy('apply.createdAt', 'DESC')

    if (query.userId !== undefined) {
      qb.andWhere('apply.userId = :userId', { userId: query.userId })
    }

    if (query.checkStatus !== undefined) {
      qb.andWhere('apply.checkStatus = :checkStatus', { checkStatus: query.checkStatus })
    }

    if (query.remit !== undefined) {
      qb.andWhere('apply.remit = :remit', { remit: query.remit })
    }

    if (query.status !== undefined) {
      qb.andWhere('apply.status = :status', { status: query.status })
    }

    if (query.keyword) {
      qb.andWhere(
        new Brackets((builder) => {
          builder
            .where('apply.alipayAccount LIKE :keyword', { keyword: `%${query.keyword}%` })
            .orWhere('apply.alipayName LIKE :keyword', { keyword: `%${query.keyword}%` })
        }),
      )
    }

    const [applies, total] = await qb.getManyAndCount()
    return PaginatedDto.of(applies.map((apply) => this.toSafeApply(apply)), total, query.page, query.pageSize)
  }

  async findById(applyId: number): Promise<SafeApply> {
    const apply = await this.applyRepository.findOne({
      where: { applyId },
      select: this.getPublicSelect(),
    })

    if (!apply) {
      throw new BusinessException(BusinessCode.APPLY_NOT_FOUND)
    }

    return this.toSafeApply(apply)
  }

  async create(dto: CreateApplyDto): Promise<SafeApply> {
    await this.ensureUserExists(dto.userId)
    await this.ensureSufficientBalance(dto.userId, dto.money)

    const apply = this.applyRepository.create({
      userId: dto.userId,
      money: this.toMoney(dto.money),
      alipayAccount: dto.alipayAccount,
      alipayName: dto.alipayName,
      checkStatus: 0,
      checkRemark: '',
      checkOperatorId: 0,
      checkTime: null,
      remit: 0,
      remitTime: null,
      remitRemark: '',
      status: dto.status ?? 1,
    })

    const saved = await this.applyRepository.save(apply)
    return this.toSafeApply(saved)
  }

  async update(applyId: number, dto: UpdateApplyDto): Promise<SafeApply> {
    const apply = await this.applyRepository.findOne({ where: { applyId } })

    if (!apply) {
      throw new BusinessException(BusinessCode.APPLY_NOT_FOUND)
    }

    if (dto.userId !== undefined) {
      await this.ensureUserExists(dto.userId)
      apply.userId = dto.userId
    }

    if (dto.money !== undefined) {
      await this.ensureSufficientBalance(apply.userId, dto.money)
      apply.money = this.toMoney(dto.money)
    }

    if (dto.alipayAccount !== undefined) {
      apply.alipayAccount = dto.alipayAccount
    }

    if (dto.alipayName !== undefined) {
      apply.alipayName = dto.alipayName
    }

    if (dto.status !== undefined) {
      apply.status = dto.status
    }

    const updated = await this.applyRepository.save(apply)
    return this.toSafeApply(updated)
  }

  async updateCheckStatus(applyId: number, dto: UpdateApplyCheckDto): Promise<SafeApply> {
    const apply = await this.applyRepository.findOne({ where: { applyId } })

    if (!apply) {
      throw new BusinessException(BusinessCode.APPLY_NOT_FOUND)
    }

    apply.checkStatus = dto.checkStatus
    apply.checkRemark = dto.checkRemark ?? ''
    apply.checkOperatorId = dto.checkOperatorId ?? 0
    apply.checkTime = new Date()

    if (dto.checkStatus === 2) {
      apply.remit = 0
      apply.remitTime = null
      apply.remitRemark = ''
    }

    const updated = await this.applyRepository.save(apply)
    return this.toSafeApply(updated)
  }

  async updateRemitStatus(applyId: number, dto: UpdateApplyRemitDto): Promise<SafeApply> {
    const apply = await this.applyRepository.findOne({ where: { applyId } })

    if (!apply) {
      throw new BusinessException(BusinessCode.APPLY_NOT_FOUND)
    }

    if (apply.checkStatus !== 1) {
      throw new BusinessException(BusinessCode.REPORT_ALREADY_PROCESSED, '提现申请未审核通过')
    }

    apply.remit = dto.remit
    apply.remitRemark = dto.remitRemark ?? ''
    apply.remitTime = dto.remit === 2 ? new Date() : null

    const updated = await this.applyRepository.save(apply)
    return this.toSafeApply(updated)
  }

  async remove(applyId: number): Promise<void> {
    await this.findById(applyId)
    await this.applyRepository.softDelete(applyId)
  }

  private async ensureUserExists(userId: number): Promise<void> {
    const user = await this.userRepository.findOne({ where: { userId }, select: { userId: true, depositPay: true } })

    if (!user) {
      throw new BusinessException(BusinessCode.USER_NOT_FOUND)
    }
  }

  private async ensureSufficientBalance(userId: number, money: number): Promise<void> {
    const user = await this.userRepository.findOne({ where: { userId }, select: { userId: true, depositPay: true } })

    if (!user) {
      throw new BusinessException(BusinessCode.USER_NOT_FOUND)
    }

    if (Number(user.depositPay) < money) {
      throw new BusinessException(BusinessCode.INSUFFICIENT_BALANCE)
    }
  }

  private toSafeApply(apply: Apply): SafeApply {
    const { deletedAt, ...safe } = apply
    return safe
  }

  private toMoney(value: number): string {
    return value.toFixed(2)
  }

  private getPublicSelect() {
    return {
      applyId: true,
      userId: true,
      money: true,
      alipayAccount: true,
      alipayName: true,
      checkStatus: true,
      checkRemark: true,
      checkOperatorId: true,
      checkTime: true,
      remit: true,
      remitTime: true,
      remitRemark: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    }
  }

  private getPublicColumns() {
    return [
      'apply.applyId',
      'apply.userId',
      'apply.money',
      'apply.alipayAccount',
      'apply.alipayName',
      'apply.checkStatus',
      'apply.checkRemark',
      'apply.checkOperatorId',
      'apply.checkTime',
      'apply.remit',
      'apply.remitTime',
      'apply.remitRemark',
      'apply.status',
      'apply.createdAt',
      'apply.updatedAt',
    ]
  }
}
