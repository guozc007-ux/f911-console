import { Brackets, Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Boss } from '../../entities/boss.entity'
import { PaginatedDto } from '../../responses'
import { BusinessCode } from '../../responses'
import { BusinessException } from '../../common/filters/business.exception'
import { CreateBossDto, ListBossDto, UpdateBossDto } from './dto/boss.dto'

type SafeBoss = Omit<Boss, 'deletedAt'>

@Injectable()
export class BossService {
  constructor(
    @InjectRepository(Boss)
    private readonly bossRepository: Repository<Boss>,
  ) {}

  async findPaginated(query: ListBossDto): Promise<PaginatedDto<SafeBoss>> {
    const qb = this.bossRepository
      .createQueryBuilder('boss')
      .select(this.getPublicColumns())
      .where('boss.deletedAt IS NULL')
      .skip((query.page - 1) * query.pageSize)
      .take(query.pageSize)
      .orderBy('boss.createdAt', 'DESC')

    if (query.sex !== undefined) {
      qb.andWhere('boss.sex = :sex', { sex: query.sex })
    }

    if (query.status !== undefined) {
      qb.andWhere('boss.status = :status', { status: query.status })
    }

    if (query.bossTypeId !== undefined) {
      qb.andWhere('boss.bossTypeId = :bossTypeId', { bossTypeId: query.bossTypeId })
    }

    if (query.referrer !== undefined) {
      qb.andWhere('boss.referrer = :referrer', { referrer: query.referrer })
    }

    if (query.keyword) {
      qb.andWhere(
        new Brackets((builder) => {
          builder
            .where('boss.nickname LIKE :keyword', { keyword: `%${query.keyword}%` })
            .orWhere('boss.code LIKE :keyword', { keyword: `%${query.keyword}%` })
            .orWhere('boss.phone LIKE :keyword', { keyword: `%${query.keyword}%` })
            .orWhere('boss.wx LIKE :keyword', { keyword: `%${query.keyword}%` })
        }),
      )
    }

    const [bosses, total] = await qb.getManyAndCount()
    return PaginatedDto.of(bosses as SafeBoss[], total, query.page, query.pageSize)
  }

  async findById(bossId: number): Promise<SafeBoss> {
    const boss = await this.bossRepository.findOne({
      where: { bossId },
      select: this.getPublicSelect(),
    })

    if (!boss) {
      throw new BusinessException(BusinessCode.BOSS_NOT_FOUND)
    }

    return boss as SafeBoss
  }

  async create(dto: CreateBossDto): Promise<SafeBoss> {
    const boss = this.bossRepository.create({
      nickname: dto.nickname,
      code: dto.code,
      sex: dto.sex,
      phone: dto.phone,
      wx: dto.wx,
      referrer: dto.referrer ?? 0,
      referrerCommission: String(dto.referrerCommission ?? 0),
      bossTypeId: dto.bossTypeId,
      status: dto.status ?? 1,
    })

    const saved = await this.bossRepository.save(boss)
    return saved as SafeBoss
  }

  async update(bossId: number, dto: UpdateBossDto): Promise<SafeBoss> {
    const boss = await this.bossRepository.findOne({ where: { bossId } })

    if (!boss) {
      throw new BusinessException(BusinessCode.BOSS_NOT_FOUND)
    }

    if (dto.nickname !== undefined) {
      boss.nickname = dto.nickname
    }

    if (dto.code !== undefined) {
      boss.code = dto.code
    }

    if (dto.sex !== undefined) {
      boss.sex = dto.sex
    }

    if (dto.phone !== undefined) {
      boss.phone = dto.phone
    }

    if (dto.wx !== undefined) {
      boss.wx = dto.wx
    }

    if (dto.referrer !== undefined) {
      boss.referrer = dto.referrer
    }

    if (dto.referrerCommission !== undefined) {
      boss.referrerCommission = String(dto.referrerCommission)
    }

    if (dto.bossTypeId !== undefined) {
      boss.bossTypeId = dto.bossTypeId
    }

    if (dto.status !== undefined) {
      boss.status = dto.status
    }

    const updated = await this.bossRepository.save(boss)
    return updated as SafeBoss
  }

  async remove(bossId: number): Promise<void> {
    await this.findById(bossId)
    await this.bossRepository.softDelete(bossId)
  }

  private getPublicSelect() {
    return {
      bossId: true,
      nickname: true,
      code: true,
      sex: true,
      phone: true,
      wx: true,
      referrer: true,
      referrerCommission: true,
      bossTypeId: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    }
  }

  private getPublicColumns() {
    return [
      'boss.bossId',
      'boss.nickname',
      'boss.code',
      'boss.sex',
      'boss.phone',
      'boss.wx',
      'boss.referrer',
      'boss.referrerCommission',
      'boss.bossTypeId',
      'boss.status',
      'boss.createdAt',
      'boss.updatedAt',
    ]
  }
}
