import { In } from 'typeorm'
import { Brackets, Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Menu } from '../../entities/menu.entity'
import { Role } from '../../entities/role.entity'
import { PaginatedDto } from '../../responses'
import { BusinessCode } from '../../responses'
import { BusinessException } from '../../common/filters/business.exception'
import { AssignMenusToRoleDto, CreateRoleDto, ListRoleDto, UpdateRoleDto } from './dto/role.dto'

type SafeRole = Omit<Role, 'menus' | 'deletedAt'>

type RoleMenuResult = Omit<SafeRole, 'menus'> & {
  menus: Menu[]
}

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(Menu)
    private readonly menuRepository: Repository<Menu>,
  ) {}

  async findPaginated(query: ListRoleDto): Promise<PaginatedDto<SafeRole>> {
    const qb = this.roleRepository
      .createQueryBuilder('role')
      .where('role.deletedAt IS NULL')
      .skip((query.page - 1) * query.pageSize)
      .take(query.pageSize)
      .orderBy('role.createdAt', 'DESC')

    if (query.keyword) {
      qb.andWhere(
        new Brackets((builder) => {
          builder
            .where('role.name LIKE :keyword', { keyword: `%${query.keyword}%` })
            .orWhere('role.remark LIKE :keyword', { keyword: `%${query.keyword}%` })
        }),
      )
    }

    const [roles, total] = await qb.getManyAndCount()
    return PaginatedDto.of(roles.map((role) => this.toSafeRole(role)), total, query.page, query.pageSize)
  }

  async findById(roleId: number): Promise<RoleMenuResult> {
    const role = await this.roleRepository.findOne({
      where: { roleId },
      relations: { menus: true },
    })

    if (!role) {
      throw new BusinessException(BusinessCode.ROLE_NOT_FOUND)
    }

    return {
      ...this.toSafeRole(role),
      menus: role.menus,
    }
  }

  async create(dto: CreateRoleDto): Promise<SafeRole> {
    const role = this.roleRepository.create({
      name: dto.name,
      remark: dto.remark ?? '',
      del: 1,
    })

    const saved = await this.roleRepository.save(role)
    return this.toSafeRole(saved)
  }

  async update(roleId: number, dto: UpdateRoleDto): Promise<SafeRole> {
    const role = await this.roleRepository.findOne({ where: { roleId } })

    if (!role) {
      throw new BusinessException(BusinessCode.ROLE_NOT_FOUND)
    }

    if (dto.name !== undefined) {
      role.name = dto.name
    }

    if (dto.remark !== undefined) {
      role.remark = dto.remark
    }

    if (dto.del !== undefined) {
      role.del = dto.del
    }

    const updated = await this.roleRepository.save(role)
    return this.toSafeRole(updated)
  }

  async assignMenus(roleId: number, dto: AssignMenusToRoleDto): Promise<RoleMenuResult> {
    const role = await this.roleRepository.findOne({
      where: { roleId },
      relations: { menus: true },
    })

    if (!role) {
      throw new BusinessException(BusinessCode.ROLE_NOT_FOUND)
    }

    const uniqueMenuIds = Array.from(new Set(dto.menuIds))

    const menus = await this.menuRepository.find({
      where: { menuId: In(uniqueMenuIds) },
    })

    role.menus = menus
    const saved = await this.roleRepository.save(role)

    return {
      ...this.toSafeRole(saved),
      menus: saved.menus,
    }
  }

  async remove(roleId: number): Promise<void> {
    const role = await this.findById(roleId)
    await this.roleRepository.softDelete(role.roleId)
  }

  private toSafeRole(role: Role): Omit<Role, 'menus' | 'deletedAt'> {
    const { menus, deletedAt, ...safe } = role
    return safe
  }
}
