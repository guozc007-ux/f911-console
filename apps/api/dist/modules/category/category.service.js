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
exports.CategoryService = void 0;
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
const typeorm_2 = require("@nestjs/typeorm");
const category_entity_1 = require("../../entities/category.entity");
const responses_1 = require("../../responses");
const responses_2 = require("../../responses");
const business_exception_1 = require("../../common/filters/business.exception");
let CategoryService = class CategoryService {
    constructor(categoryRepository) {
        this.categoryRepository = categoryRepository;
    }
    async findPaginated(query) {
        const qb = this.categoryRepository
            .createQueryBuilder('category')
            .select(this.getPublicColumns())
            .where('category.deletedAt IS NULL')
            .skip((query.page - 1) * query.pageSize)
            .take(query.pageSize)
            .orderBy('category.createdAt', 'DESC');
        if (query.status !== undefined) {
            qb.andWhere('category.status = :status', { status: query.status });
        }
        if (query.categoryName) {
            qb.andWhere(new typeorm_1.Brackets((builder) => {
                builder.where('category.categoryName LIKE :categoryName', { categoryName: `%${query.categoryName}%` });
            }));
        }
        const [categories, total] = await qb.getManyAndCount();
        return responses_1.PaginatedDto.of(categories.map((category) => this.toSafeCategory(category)), total, query.page, query.pageSize);
    }
    async findById(categoryId) {
        const category = await this.categoryRepository.findOne({
            where: { categoryId },
            select: this.getPublicSelect(),
        });
        if (!category) {
            throw new business_exception_1.BusinessException(responses_2.BusinessCode.CATEGORY_NOT_FOUND);
        }
        return this.toSafeCategory(category);
    }
    async create(dto) {
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
        });
        const saved = await this.categoryRepository.save(category);
        return this.toSafeCategory(saved);
    }
    async update(categoryId, dto) {
        const category = await this.categoryRepository.findOne({ where: { categoryId } });
        if (!category) {
            throw new business_exception_1.BusinessException(responses_2.BusinessCode.CATEGORY_NOT_FOUND);
        }
        if (dto.categoryFid !== undefined) {
            category.categoryFid = dto.categoryFid;
        }
        if (dto.categoryName !== undefined) {
            category.categoryName = dto.categoryName;
        }
        if (dto.categoryType !== undefined) {
            category.categoryType = dto.categoryType;
            category.type = dto.categoryType;
        }
        if (dto.categoryPrice !== undefined) {
            category.categoryPrice = String(dto.categoryPrice);
        }
        if (dto.commissionRate !== undefined) {
            category.commissionRate = String(dto.commissionRate);
        }
        if (dto.categorySort !== undefined) {
            category.categorySort = dto.categorySort;
        }
        if (dto.categoryRemark !== undefined) {
            category.categoryRemark = dto.categoryRemark;
        }
        if (dto.status !== undefined) {
            category.status = dto.status;
        }
        const updated = await this.categoryRepository.save(category);
        return this.toSafeCategory(updated);
    }
    async remove(categoryId) {
        const category = await this.findById(categoryId);
        await this.categoryRepository.softDelete(category.categoryId);
    }
    toSafeCategory(category) {
        const { deletedAt, ...safe } = category;
        return safe;
    }
    getPublicSelect() {
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
        };
    }
    getPublicColumns() {
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
        ];
    }
};
exports.CategoryService = CategoryService;
exports.CategoryService = CategoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(category_entity_1.Category)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], CategoryService);
