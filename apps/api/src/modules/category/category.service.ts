import { Brackets, Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Category } from '../../entities/category.entity'
import { PaginatedDto } from '../../responses'
import { BusinessCode } from '../../responses'
import { BusinessException } from '../../common/filters/business.exception'
import { CreateCategoryDto, ListCategoryDto, UpdateCategoryDto } from './dto/category.dto'

type SafeCategory = Omit<Category, 'deletedAt'>

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async findPaginated(query: ListCategoryDto): Promise<PaginatedDto<SafeCategory>> {
    const qb = this.categoryRepository
      .createQueryBuilder('category')
      .select(this.getPublicColumns())
      .where('category.deletedAt IS NULL')
      .skip((query.page - 1) * query.pageSize)
      .take(query.pageSize)
      .orderBy('category.createdAt', 'DESC')

    if (query.status !== undefined) {
      qb.andWhere('category.status = :status', { status: query.status })
    }

    if (query.categoryName) {
      qb.andWhere(
        new Brackets((builder) => {
          builder.where('category.categoryName LIKE :categoryName', { categoryName: `%${query.categoryName}%` })
        }),
      )
    }

    const [categories, total] = await qb.getManyAndCount()
    return PaginatedDto.of(categories.map((category) => this.toSafeCategory(category)), total, query.page, query.pageSize)
  }

  async findById(categoryId: number): Promise<SafeCategory> {
    const category = await this.categoryRepository.findOne({
      where: { categoryId },
      select: this.getPublicSelect(),
    })

    if (!category) {
      throw new BusinessException(BusinessCode.CATEGORY_NOT_FOUND)
    }

    return this.toSafeCategory(category)
  }

  async create(dto: CreateCategoryDto): Promise<SafeCategory> {
    const category = this.categoryRepository.create({
      categoryFid: dto.categoryFid,
      categoryName: dto.categoryName,
      categoryType: dto.categoryType,
      type: dto.categoryType,
      categoryPrice: String(dto.categoryPrice),
      commissionRate: String(dto.commissionRate),
      categorySort: dto.categorySort,
      categoryRemark: dto.categoryRemark,
      status: dto.status ?? 1,
    })

    const saved = await this.categoryRepository.save(category)
    return this.toSafeCategory(saved)
  }

  async update(categoryId: number, dto: UpdateCategoryDto): Promise<SafeCategory> {
    const category = await this.categoryRepository.findOne({ where: { categoryId } })

    if (!category) {
      throw new BusinessException(BusinessCode.CATEGORY_NOT_FOUND)
    }

    if (dto.categoryFid !== undefined) {
      category.categoryFid = dto.categoryFid
    }

    if (dto.categoryName !== undefined) {
      category.categoryName = dto.categoryName
    }

    if (dto.categoryType !== undefined) {
      category.categoryType = dto.categoryType
      category.type = dto.categoryType
    }

    if (dto.categoryPrice !== undefined) {
      category.categoryPrice = String(dto.categoryPrice)
    }

    if (dto.commissionRate !== undefined) {
      category.commissionRate = String(dto.commissionRate)
    }

    if (dto.categorySort !== undefined) {
      category.categorySort = dto.categorySort
    }

    if (dto.categoryRemark !== undefined) {
      category.categoryRemark = dto.categoryRemark
    }

    if (dto.status !== undefined) {
      category.status = dto.status
    }

    const updated = await this.categoryRepository.save(category)
    return this.toSafeCategory(updated)
  }

  async remove(categoryId: number): Promise<void> {
    const category = await this.findById(categoryId)
    await this.categoryRepository.softDelete(category.categoryId)
  }

  private toSafeCategory(category: Category): SafeCategory {
    const { deletedAt, ...safe } = category
    return safe
  }

  private getPublicSelect() {
    return {
      categoryId: true,
      categoryFid: true,
      categoryName: true,
      categoryType: true,
      categoryPrice: true,
      commissionRate: true,
      categorySort: true,
      categoryRemark: true,
      type: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    }
  }

  private getPublicColumns() {
    return [
      'category.categoryId',
      'category.categoryFid',
      'category.categoryName',
      'category.categoryType',
      'category.categoryPrice',
      'category.commissionRate',
      'category.categorySort',
      'category.categoryRemark',
      'category.type',
      'category.status',
      'category.createdAt',
      'category.updatedAt',
    ]
  }
}
