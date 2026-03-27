import { Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Order } from '../../entities/order.entity'
import { PaginatedDto } from '../../responses'
import { BusinessCode } from '../../responses'
import { BusinessException } from '../../common/filters/business.exception'
import {
  AssignOrderCustomerDto,
  CreateOrderDto,
  ListOrderDto,
  UpdateOrderDto,
  UpdateOrderStatusDto,
} from './dto/order.dto'

type SerializedOrder = Omit<Order, 'categoryId' | 'userId'> & {
  categoryIds: number[]
  userIds: number[]
}

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async findPaginated(query: ListOrderDto): Promise<PaginatedDto<SerializedOrder>> {
    const qb = this.orderRepository
      .createQueryBuilder('order')
      .select(this.getPublicColumns())
      .where('order.deletedAt IS NULL')
      .skip((query.page - 1) * query.pageSize)
      .take(query.pageSize)
      .orderBy('order.createdAt', 'DESC')

    if (query.bossId !== undefined) {
      qb.andWhere('order.bossId = :bossId', { bossId: query.bossId })
    }

    if (query.customerId !== undefined) {
      qb.andWhere('order.customerId = :customerId', { customerId: query.customerId })
    }

    if (query.status !== undefined) {
      qb.andWhere('order.status = :status', { status: query.status })
    }

    if (query.no) {
      qb.andWhere('order.no LIKE :no', { no: `%${query.no}%` })
    }

    if (query.del !== undefined) {
      qb.andWhere('order.del = :del', { del: query.del })
    }

    const [orders, total] = await qb.getManyAndCount()

    return PaginatedDto.of(orders.map((order) => this.serializeOrder(order)), total, query.page, query.pageSize)
  }

  async findById(orderId: number): Promise<SerializedOrder> {
    const order = await this.orderRepository.findOne({
      where: { orderId },
      select: this.getPublicSelect(),
    })

    if (!order) {
      throw new BusinessException(BusinessCode.ORDER_NOT_FOUND)
    }

    return this.serializeOrder(order)
  }

  async create(dto: CreateOrderDto): Promise<SerializedOrder> {
    const orderNo = dto.no?.trim()
    const order = this.orderRepository.create({
      no: orderNo || `ORD${Date.now()}`,
      bossId: dto.bossId,
      bossGameNickname: dto.bossGameNickname,
      customerId: dto.customerId,
      categoryId: JSON.stringify(Array.from(new Set(dto.categoryIds))),
      userId: dto.userIds.join(','),
      count: String(dto.count),
      remark: dto.remark ?? '',
      status: 1,
      del: 1,
      feedback: '',
    })

    const saved = await this.orderRepository.save(order)
    return this.serializeOrder(saved)
  }

  async update(orderId: number, dto: UpdateOrderDto): Promise<SerializedOrder> {
    const order = await this.orderRepository.findOne({ where: { orderId } })

    if (!order) {
      throw new BusinessException(BusinessCode.ORDER_NOT_FOUND)
    }

    if (dto.bossGameNickname !== undefined) {
      order.bossGameNickname = dto.bossGameNickname
    }

    if (dto.customerId !== undefined) {
      order.customerId = dto.customerId
    }

    if (dto.categoryIds !== undefined) {
      order.categoryId = JSON.stringify(Array.from(new Set(dto.categoryIds)))
    }

    if (dto.userIds !== undefined) {
      order.userId = dto.userIds.join(',')
    }

    if (dto.count !== undefined) {
      order.count = String(dto.count)
    }

    if (dto.feedback !== undefined) {
      order.feedback = dto.feedback
    }

    if (dto.remark !== undefined) {
      order.remark = dto.remark
    }

    if (dto.del !== undefined) {
      order.del = dto.del
    }

    const updated = await this.orderRepository.save(order)
    return this.serializeOrder(updated)
  }

  async updateStatus(orderId: number, dto: UpdateOrderStatusDto): Promise<SerializedOrder> {
    const order = await this.orderRepository.findOne({ where: { orderId } })

    if (!order) {
      throw new BusinessException(BusinessCode.ORDER_NOT_FOUND)
    }

    order.status = dto.status
    const updated = await this.orderRepository.save(order)
    return this.serializeOrder(updated)
  }

  async assignCustomer(orderId: number, dto: AssignOrderCustomerDto): Promise<SerializedOrder> {
    const order = await this.orderRepository.findOne({ where: { orderId } })

    if (!order) {
      throw new BusinessException(BusinessCode.ORDER_NOT_FOUND)
    }

    order.customerId = dto.customerId
    const updated = await this.orderRepository.save(order)
    return this.serializeOrder(updated)
  }

  async remove(orderId: number): Promise<void> {
    await this.findById(orderId)
    await this.orderRepository.softDelete(orderId)
  }

  private serializeOrder(order: Order): SerializedOrder {
    const { categoryId, userId, ...safeOrder } = order
    return {
      ...(safeOrder as Omit<Order, 'categoryId' | 'userId'>),
      categoryIds: this.parseNumberArray(categoryId),
      userIds: this.parseUserIds(userId),
    }
  }

  private parseNumberArray(value: unknown): number[] {
    if (!value) {
      return []
    }

    if (Array.isArray(value)) {
      return Array.from(
        new Set(
          value
            .map((item) => Number(item))
            .filter((item) => Number.isInteger(item) && item > 0),
        ),
      )
    }

    if (typeof value === 'string') {
      try {
        const parsed = JSON.parse(value)
        if (Array.isArray(parsed)) {
          return Array.from(new Set(parsed.map((item) => Number(item)).filter((item) => Number.isInteger(item) && item > 0)))
        }
      } catch {
        // ignore
      }

      return value
        .split(',')
        .map((item) => Number(item.trim()))
        .filter((item) => Number.isInteger(item) && item > 0)
    }

    return []
  }

  private parseUserIds(value: string): number[] {
    if (!value) {
      return []
    }

    return Array.from(
      new Set(
        value
          .split(',')
          .map((item) => Number(item.trim()))
          .filter((item) => Number.isInteger(item) && item > 0),
      ),
    )
  }

  private getPublicSelect() {
    return {
      orderId: true,
      no: true,
      bossId: true,
      bossGameNickname: true,
      customerId: true,
      categoryId: true,
      userId: true,
      count: true,
      remark: true,
      feedback: true,
      status: true,
      del: true,
      createdAt: true,
      updatedAt: true,
    }
  }

  private getPublicColumns() {
    return [
      'order.orderId',
      'order.no',
      'order.bossId',
      'order.bossGameNickname',
      'order.customerId',
      'order.categoryId',
      'order.userId',
      'order.count',
      'order.remark',
      'order.feedback',
      'order.status',
      'order.del',
      'order.createdAt',
      'order.updatedAt',
    ]
  }
}
