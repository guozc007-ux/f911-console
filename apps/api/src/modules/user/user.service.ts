import { Brackets, Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { hash } from 'bcryptjs'
import { User } from '../../entities/user.entity'
import { PaginatedDto } from '../../responses'
import { BusinessCode } from '../../responses'
import { BusinessException } from '../../common/filters/business.exception'
import {
  CreateUserDto,
  ListUserDto,
  UpdateUserDto,
  UpdateUserStatusDto,
} from './dto/user.dto'

type SafeUser = Omit<User, 'password'>

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findPaginated(query: ListUserDto): Promise<PaginatedDto<SafeUser>> {
    const qb = this.userRepository
      .createQueryBuilder('user')
      .select(this.getPublicColumns())
      .where('user.deletedAt IS NULL')
      .skip((query.page - 1) * query.pageSize)
      .take(query.pageSize)
      .orderBy('user.createdAt', 'DESC')

    if (query.role !== undefined) {
      qb.andWhere('user.role = :role', { role: query.role })
    }

    if (query.status !== undefined) {
      qb.andWhere('user.status = :status', { status: query.status })
    }

    if (query.keyword) {
      qb.andWhere(
        new Brackets((builder) => {
          builder
            .where('user.account LIKE :keyword', { keyword: `%${query.keyword}%` })
            .orWhere('user.nickname LIKE :keyword', { keyword: `%${query.keyword}%` })
            .orWhere('user.phone LIKE :keyword', { keyword: `%${query.keyword}%` })
            .orWhere('user.code LIKE :keyword', { keyword: `%${query.keyword}%` })
        }),
      )
    }

    const [users, total] = await qb.getManyAndCount()

    return PaginatedDto.of(users as SafeUser[], total, query.page, query.pageSize)
  }

  async findById(userId: number): Promise<SafeUser> {
    const user = await this.userRepository.findOne({
      where: { userId },
      select: this.getPublicSelect(),
    })

    if (!user) {
      throw new BusinessException(BusinessCode.USER_NOT_FOUND)
    }

    return user as unknown as SafeUser
  }

  async create(dto: CreateUserDto): Promise<SafeUser> {
    await this.assertUniqueFields(dto.account, dto.code, dto.phone)

    const hashedPassword = await hash(dto.password, 10)

    const user = this.userRepository.create({
      account: dto.account,
      password: hashedPassword,
      nickname: dto.nickname,
      code: dto.code,
      sex: dto.sex,
      phone: dto.phone,
      role: dto.role,
      playerLevelId: dto.playerLevelId,
      avatar: dto.avatar ?? '',
      zfb: dto.zfb ?? '',
      name: dto.name ?? '',
      status: dto.status ?? 1,
      remark: dto.remark ?? '',
    })

    const saved = await this.userRepository.save(user)

    return this.toSafeUser(saved)
  }

  async update(userId: number, dto: UpdateUserDto): Promise<SafeUser> {
    const user = await this.userRepository.findOne({ where: { userId } })

    if (!user) {
      throw new BusinessException(BusinessCode.USER_NOT_FOUND)
    }

    if (dto.account !== undefined && dto.account !== user.account) {
      await this.assertUniqueFields(dto.account, undefined, undefined, userId)
      user.account = dto.account
    }

    if (dto.code !== undefined && dto.code !== user.code) {
      await this.assertUniqueFields(undefined, dto.code, undefined, userId)
      user.code = dto.code
    }

    if (dto.phone !== undefined && dto.phone !== user.phone) {
      await this.assertUniqueFields(undefined, undefined, dto.phone, userId)
      user.phone = dto.phone
    }

    if (dto.nickname !== undefined) {
      user.nickname = dto.nickname
    }

    if (dto.sex !== undefined) {
      user.sex = dto.sex
    }

    if (dto.role !== undefined) {
      user.role = dto.role
    }

    if (dto.playerLevelId !== undefined) {
      user.playerLevelId = dto.playerLevelId
    }

    if (dto.avatar !== undefined) {
      user.avatar = dto.avatar
    }

    if (dto.zfb !== undefined) {
      user.zfb = dto.zfb
    }

    if (dto.name !== undefined) {
      user.name = dto.name
    }

    if (dto.status !== undefined) {
      user.status = dto.status
    }

    if (dto.remark !== undefined) {
      user.remark = dto.remark
    }

    const updated = await this.userRepository.save(user)
    return this.toSafeUser(updated)
  }

  async patchStatus(userId: number, dto: UpdateUserStatusDto): Promise<SafeUser> {
    const user = await this.userRepository.findOne({ where: { userId } })

    if (!user) {
      throw new BusinessException(BusinessCode.USER_NOT_FOUND)
    }

    user.status = dto.status
    const updated = await this.userRepository.save(user)
    return this.toSafeUser(updated)
  }

  async remove(userId: number): Promise<void> {
    const user = await this.findById(userId)

    await this.userRepository.softDelete((user as SafeUser & { userId: number }).userId)
  }

  private async assertUniqueFields(account?: string, code?: string, phone?: string, selfUserId?: number): Promise<void> {
    if (account) {
      const existed = await this.userRepository.findOne({ where: { account } })
      if (existed && existed.userId !== selfUserId) {
        throw new BusinessException(BusinessCode.USER_EXISTS)
      }
    }

    if (code) {
      const existed = await this.userRepository.findOne({ where: { code } })
      if (existed && existed.userId !== selfUserId) {
        throw new BusinessException(BusinessCode.USER_EXISTS)
      }
    }

    if (phone) {
      const existed = await this.userRepository.findOne({ where: { phone } })
      if (existed && existed.userId !== selfUserId) {
        throw new BusinessException(BusinessCode.USER_EXISTS)
      }
    }
  }

  private toSafeUser(user: User): SafeUser {
    const { password, ...safe } = user
    return safe
  }

  private getPublicSelect() {
    return {
      userId: true,
      account: true,
      nickname: true,
      code: true,
      sex: true,
      phone: true,
      avatar: true,
      role: true,
      playerLevelId: true,
      zfb: true,
      name: true,
      deposit: true,
      depositPay: true,
      projectHypothecate: true,
      freezeHours: true,
      status: true,
      remark: true,
      projectAcceptTime: true,
      createdAt: true,
      updatedAt: true,
    }
  }

  private getPublicColumns() {
    return [
      'user.userId',
      'user.account',
      'user.nickname',
      'user.code',
      'user.sex',
      'user.phone',
      'user.avatar',
      'user.role',
      'user.playerLevelId',
      'user.zfb',
      'user.name',
      'user.deposit',
      'user.depositPay',
      'user.projectHypothecate',
      'user.freezeHours',
      'user.status',
      'user.remark',
      'user.projectAcceptTime',
      'user.createdAt',
      'user.updatedAt',
    ]
  }
}

