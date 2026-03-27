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
exports.BossService = void 0;
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
const typeorm_2 = require("@nestjs/typeorm");
const boss_entity_1 = require("../../entities/boss.entity");
const responses_1 = require("../../responses");
const responses_2 = require("../../responses");
const business_exception_1 = require("../../common/filters/business.exception");
let BossService = class BossService {
    constructor(bossRepository) {
        this.bossRepository = bossRepository;
    }
    async findPaginated(query) {
        const qb = this.bossRepository
            .createQueryBuilder('boss')
            .select(this.getPublicColumns())
            .where('boss.deletedAt IS NULL')
            .skip((query.page - 1) * query.pageSize)
            .take(query.pageSize)
            .orderBy('boss.createdAt', 'DESC');
        if (query.sex !== undefined) {
            qb.andWhere('boss.sex = :sex', { sex: query.sex });
        }
        if (query.status !== undefined) {
            qb.andWhere('boss.status = :status', { status: query.status });
        }
        if (query.bossTypeId !== undefined) {
            qb.andWhere('boss.bossTypeId = :bossTypeId', { bossTypeId: query.bossTypeId });
        }
        if (query.referrer !== undefined) {
            qb.andWhere('boss.referrer = :referrer', { referrer: query.referrer });
        }
        if (query.keyword) {
            qb.andWhere(new typeorm_1.Brackets((builder) => {
                builder
                    .where('boss.nickname LIKE :keyword', { keyword: `%${query.keyword}%` })
                    .orWhere('boss.code LIKE :keyword', { keyword: `%${query.keyword}%` })
                    .orWhere('boss.phone LIKE :keyword', { keyword: `%${query.keyword}%` })
                    .orWhere('boss.wx LIKE :keyword', { keyword: `%${query.keyword}%` });
            }));
        }
        const [bosses, total] = await qb.getManyAndCount();
        return responses_1.PaginatedDto.of(bosses, total, query.page, query.pageSize);
    }
    async findById(bossId) {
        const boss = await this.bossRepository.findOne({
            where: { bossId },
            select: this.getPublicSelect(),
        });
        if (!boss) {
            throw new business_exception_1.BusinessException(responses_2.BusinessCode.BOSS_NOT_FOUND);
        }
        return boss;
    }
    async create(dto) {
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
        });
        const saved = await this.bossRepository.save(boss);
        return saved;
    }
    async update(bossId, dto) {
        const boss = await this.bossRepository.findOne({ where: { bossId } });
        if (!boss) {
            throw new business_exception_1.BusinessException(responses_2.BusinessCode.BOSS_NOT_FOUND);
        }
        if (dto.nickname !== undefined) {
            boss.nickname = dto.nickname;
        }
        if (dto.code !== undefined) {
            boss.code = dto.code;
        }
        if (dto.sex !== undefined) {
            boss.sex = dto.sex;
        }
        if (dto.phone !== undefined) {
            boss.phone = dto.phone;
        }
        if (dto.wx !== undefined) {
            boss.wx = dto.wx;
        }
        if (dto.referrer !== undefined) {
            boss.referrer = dto.referrer;
        }
        if (dto.referrerCommission !== undefined) {
            boss.referrerCommission = String(dto.referrerCommission);
        }
        if (dto.bossTypeId !== undefined) {
            boss.bossTypeId = dto.bossTypeId;
        }
        if (dto.status !== undefined) {
            boss.status = dto.status;
        }
        const updated = await this.bossRepository.save(boss);
        return updated;
    }
    async remove(bossId) {
        await this.findById(bossId);
        await this.bossRepository.softDelete(bossId);
    }
    getPublicSelect() {
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
        };
    }
    getPublicColumns() {
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
        ];
    }
};
exports.BossService = BossService;
exports.BossService = BossService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(boss_entity_1.Boss)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], BossService);
