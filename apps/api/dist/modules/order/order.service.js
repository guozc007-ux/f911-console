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
exports.OrderService = void 0;
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
const typeorm_2 = require("@nestjs/typeorm");
const order_entity_1 = require("../../entities/order.entity");
const responses_1 = require("../../responses");
const responses_2 = require("../../responses");
const business_exception_1 = require("../../common/filters/business.exception");
let OrderService = class OrderService {
    constructor(orderRepository) {
        this.orderRepository = orderRepository;
    }
    async findPaginated(query) {
        const qb = this.orderRepository
            .createQueryBuilder('order')
            .select(this.getPublicColumns())
            .where('order.deletedAt IS NULL')
            .skip((query.page - 1) * query.pageSize)
            .take(query.pageSize)
            .orderBy('order.createdAt', 'DESC');
        if (query.bossId !== undefined) {
            qb.andWhere('order.bossId = :bossId', { bossId: query.bossId });
        }
        if (query.customerId !== undefined) {
            qb.andWhere('order.customerId = :customerId', { customerId: query.customerId });
        }
        if (query.status !== undefined) {
            qb.andWhere('order.status = :status', { status: query.status });
        }
        if (query.no) {
            qb.andWhere('order.no LIKE :no', { no: `%${query.no}%` });
        }
        if (query.del !== undefined) {
            qb.andWhere('order.del = :del', { del: query.del });
        }
        const [orders, total] = await qb.getManyAndCount();
        return responses_1.PaginatedDto.of(orders.map((order) => this.serializeOrder(order)), total, query.page, query.pageSize);
    }
    async findById(orderId) {
        const order = await this.orderRepository.findOne({
            where: { orderId },
            select: this.getPublicSelect(),
        });
        if (!order) {
            throw new business_exception_1.BusinessException(responses_2.BusinessCode.ORDER_NOT_FOUND);
        }
        return this.serializeOrder(order);
    }
    async create(dto) {
        const orderNo = dto.no?.trim();
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
        });
        const saved = await this.orderRepository.save(order);
        return this.serializeOrder(saved);
    }
    async update(orderId, dto) {
        const order = await this.orderRepository.findOne({ where: { orderId } });
        if (!order) {
            throw new business_exception_1.BusinessException(responses_2.BusinessCode.ORDER_NOT_FOUND);
        }
        if (dto.bossGameNickname !== undefined) {
            order.bossGameNickname = dto.bossGameNickname;
        }
        if (dto.customerId !== undefined) {
            order.customerId = dto.customerId;
        }
        if (dto.categoryIds !== undefined) {
            order.categoryId = JSON.stringify(Array.from(new Set(dto.categoryIds)));
        }
        if (dto.userIds !== undefined) {
            order.userId = dto.userIds.join(',');
        }
        if (dto.count !== undefined) {
            order.count = String(dto.count);
        }
        if (dto.feedback !== undefined) {
            order.feedback = dto.feedback;
        }
        if (dto.remark !== undefined) {
            order.remark = dto.remark;
        }
        if (dto.del !== undefined) {
            order.del = dto.del;
        }
        const updated = await this.orderRepository.save(order);
        return this.serializeOrder(updated);
    }
    async updateStatus(orderId, dto) {
        const order = await this.orderRepository.findOne({ where: { orderId } });
        if (!order) {
            throw new business_exception_1.BusinessException(responses_2.BusinessCode.ORDER_NOT_FOUND);
        }
        order.status = dto.status;
        const updated = await this.orderRepository.save(order);
        return this.serializeOrder(updated);
    }
    async assignCustomer(orderId, dto) {
        const order = await this.orderRepository.findOne({ where: { orderId } });
        if (!order) {
            throw new business_exception_1.BusinessException(responses_2.BusinessCode.ORDER_NOT_FOUND);
        }
        order.customerId = dto.customerId;
        const updated = await this.orderRepository.save(order);
        return this.serializeOrder(updated);
    }
    async remove(orderId) {
        await this.findById(orderId);
        await this.orderRepository.softDelete(orderId);
    }
    serializeOrder(order) {
        const { categoryId, userId, ...safeOrder } = order;
        return {
            ...safeOrder,
            categoryIds: this.parseNumberArray(categoryId),
            userIds: this.parseUserIds(userId),
        };
    }
    parseNumberArray(value) {
        if (!value) {
            return [];
        }
        if (Array.isArray(value)) {
            return Array.from(new Set(value
                .map((item) => Number(item))
                .filter((item) => Number.isInteger(item) && item > 0)));
        }
        if (typeof value === 'string') {
            try {
                const parsed = JSON.parse(value);
                if (Array.isArray(parsed)) {
                    return Array.from(new Set(parsed.map((item) => Number(item)).filter((item) => Number.isInteger(item) && item > 0)));
                }
            }
            catch {
                // ignore
            }
            return value
                .split(',')
                .map((item) => Number(item.trim()))
                .filter((item) => Number.isInteger(item) && item > 0);
        }
        return [];
    }
    parseUserIds(value) {
        if (!value) {
            return [];
        }
        return Array.from(new Set(value
            .split(',')
            .map((item) => Number(item.trim()))
            .filter((item) => Number.isInteger(item) && item > 0)));
    }
    getPublicSelect() {
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
        };
    }
    getPublicColumns() {
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
        ];
    }
};
exports.OrderService = OrderService;
exports.OrderService = OrderService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(order_entity_1.Order)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], OrderService);
