import { Brackets, Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Menu } from '../../entities/menu.entity'
import { PaginatedDto } from '../../responses'
import { BusinessCode } from '../../responses'
import { BusinessException } from '../../common/filters/business.exception'
import { CreateMenuDto, ListMenuDto, UpdateMenuDto } from './dto/menu.dto'

type SafeMenu = Omit<Menu, 'deletedAt'>

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu)
    private readonly menuRepository: Repository<Menu>,
  ) {}

  async findPaginated(query: ListMenuDto): Promise<PaginatedDto<SafeMenu>> {
    const qb = this.menuRepository
      .createQueryBuilder('menu')
      .select(this.getPublicColumns())
      .where('menu.deletedAt IS NULL')
      .skip((query.page - 1) * query.pageSize)
      .take(query.pageSize)
      .orderBy('menu.createdAt', 'DESC')

    if (query.keyword) {
      qb.andWhere(
        new Brackets((builder) => {
          builder
            .where('menu.name LIKE :keyword', { keyword: `%${query.keyword}%` })
            .orWhere('menu.url LIKE :keyword', { keyword: `%${query.keyword}%` })
            .orWhere('menu.icon LIKE :keyword', { keyword: `%${query.keyword}%` })
        }),
      )
    }

    const [menus, total] = await qb.getManyAndCount()
    return PaginatedDto.of(menus.map((menu) => this.toSafeMenu(menu)), total, query.page, query.pageSize)
  }

  async findById(menuId: number): Promise<SafeMenu> {
    const menu = await this.menuRepository.findOne({
      where: { menuId },
      select: this.getPublicSelect(),
    })

    if (!menu) {
      throw new BusinessException(BusinessCode.MENU_NOT_FOUND)
    }

    return menu as SafeMenu
  }

  async create(dto: CreateMenuDto): Promise<SafeMenu> {
    const menu = this.menuRepository.create({
      name: dto.name,
      url: dto.url,
      icon: dto.icon,
      sort: dto.sort,
      parentId: dto.parentId,
      status: 1,
    })

    const saved = await this.menuRepository.save(menu)
    return this.toSafeMenu(saved)
  }

  async update(menuId: number, dto: UpdateMenuDto): Promise<SafeMenu> {
    const menu = await this.menuRepository.findOne({ where: { menuId } })

    if (!menu) {
      throw new BusinessException(BusinessCode.MENU_NOT_FOUND)
    }

    if (dto.name !== undefined) {
      menu.name = dto.name
    }

    if (dto.url !== undefined) {
      menu.url = dto.url
    }

    if (dto.icon !== undefined) {
      menu.icon = dto.icon
    }

    if (dto.sort !== undefined) {
      menu.sort = dto.sort
    }

    if (dto.parentId !== undefined) {
      menu.parentId = dto.parentId
    }

    if (dto.status !== undefined) {
      menu.status = dto.status
    }

    const updated = await this.menuRepository.save(menu)
    return this.toSafeMenu(updated)
  }

  async remove(menuId: number): Promise<void> {
    const menu = await this.findById(menuId)
    await this.menuRepository.softDelete((menu as SafeMenu & { menuId: number }).menuId)
  }

  private toSafeMenu(menu: Menu): SafeMenu {
    const { deletedAt, ...safe } = menu
    return safe
  }

  private getPublicSelect() {
    return {
      menuId: true,
      name: true,
      url: true,
      icon: true,
      sort: true,
      parentId: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    }
  }

  private getPublicColumns() {
    return [
      'menu.menuId',
      'menu.name',
      'menu.url',
      'menu.icon',
      'menu.sort',
      'menu.parentId',
      'menu.status',
      'menu.createdAt',
      'menu.updatedAt',
    ]
  }
}
