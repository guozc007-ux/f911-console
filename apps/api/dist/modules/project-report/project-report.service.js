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
exports.ProjectReportService = void 0;
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
const typeorm_2 = require("@nestjs/typeorm");
const project_report_entity_1 = require("../../entities/project-report.entity");
const user_entity_1 = require("../../entities/user.entity");
const boss_entity_1 = require("../../entities/boss.entity");
const category_entity_1 = require("../../entities/category.entity");
const boss_type_entity_1 = require("../../entities/boss-type.entity");
const player_level_entity_1 = require("../../entities/player-level.entity");
const responses_1 = require("../../responses");
const responses_2 = require("../../responses");
const business_exception_1 = require("../../common/filters/business.exception");
let ProjectReportService = class ProjectReportService {
    constructor(projectReportRepository, userRepository, bossRepository, categoryRepository, bossTypeRepository, playerLevelRepository) {
        this.projectReportRepository = projectReportRepository;
        this.userRepository = userRepository;
        this.bossRepository = bossRepository;
        this.categoryRepository = categoryRepository;
        this.bossTypeRepository = bossTypeRepository;
        this.playerLevelRepository = playerLevelRepository;
    }
    async findPaginated(query) {
        const qb = this.projectReportRepository
            .createQueryBuilder('projectReport')
            .select(this.getPublicColumns())
            .where('projectReport.deletedAt IS NULL')
            .skip((query.page - 1) * query.pageSize)
            .take(query.pageSize)
            .orderBy('projectReport.createdAt', 'DESC');
        if (query.userId !== undefined) {
            qb.andWhere('projectReport.userId = :userId', { userId: query.userId });
        }
        if (query.customerId !== undefined) {
            qb.andWhere('projectReport.customerId = :customerId', { customerId: query.customerId });
        }
        if (query.bossId !== undefined) {
            qb.andWhere('projectReport.bossId = :bossId', { bossId: query.bossId });
        }
        if (query.categoryId !== undefined) {
            qb.andWhere('projectReport.categoryId = :categoryId', { categoryId: query.categoryId });
        }
        if (query.status !== undefined) {
            qb.andWhere('projectReport.status = :status', { status: query.status });
        }
        if (query.payStatus !== undefined) {
            qb.andWhere('projectReport.payStatus = :payStatus', { payStatus: query.payStatus });
        }
        if (query.no) {
            qb.andWhere('projectReport.no LIKE :no', { no: `%${query.no}%` });
        }
        const [reports, total] = await qb.getManyAndCount();
        return responses_1.PaginatedDto.of(reports.map((report) => this.toSafeProjectReport(report)), total, query.page, query.pageSize);
    }
    async findById(projectReportId) {
        const report = await this.projectReportRepository.findOne({
            where: { projectReportId },
            select: this.getPublicSelect(),
        });
        if (!report) {
            throw new business_exception_1.BusinessException(responses_2.BusinessCode.REPORT_NOT_FOUND);
        }
        return this.toSafeProjectReport(report);
    }
    async create(dto) {
        const relations = await this.resolveRelations(dto.userId, dto.bossId, dto.categoryId);
        await this.ensureUserExists(dto.customerId);
        const amounts = this.calculateAmounts({
            quantity: dto.quantity,
            categoryPrice: relations.category.categoryPrice,
            commissionRate: relations.category.commissionRate,
            playerLevelPercent: relations.playerLevelPercent,
            bossTypePercent: relations.bossTypePercent,
        });
        const report = this.projectReportRepository.create({
            no: dto.no?.trim() || `PR${Date.now()}`,
            userId: dto.userId,
            customerId: dto.customerId,
            bossId: dto.bossId,
            categoryId: dto.categoryId,
            quantity: this.toMoney(dto.quantity),
            totalAmount: amounts.totalAmount,
            playerCommission: amounts.playerCommission,
            referrerCommission: amounts.referrerCommission,
            shopMoney: amounts.shopMoney,
            type: dto.type?.trim() || 'project',
            remark: dto.remark ?? '',
            playerImg: dto.playerImg ?? [],
            status: dto.status ?? 1,
            payStatus: dto.payStatus ?? 1,
            startTime: dto.startTime ? new Date(dto.startTime) : null,
            endTime: dto.endTime ? new Date(dto.endTime) : null,
            feedback: dto.feedback ?? '',
        });
        const saved = await this.projectReportRepository.save(report);
        return this.toSafeProjectReport(saved);
    }
    async update(projectReportId, dto) {
        const report = await this.projectReportRepository.findOne({ where: { projectReportId } });
        if (!report) {
            throw new business_exception_1.BusinessException(responses_2.BusinessCode.REPORT_NOT_FOUND);
        }
        const nextUserId = dto.userId ?? report.userId;
        const nextBossId = dto.bossId ?? report.bossId;
        const nextCategoryId = dto.categoryId ?? report.categoryId;
        if (dto.customerId !== undefined) {
            await this.ensureUserExists(dto.customerId);
            report.customerId = dto.customerId;
        }
        if (dto.userId !== undefined) {
            report.userId = dto.userId;
        }
        if (dto.bossId !== undefined) {
            report.bossId = dto.bossId;
        }
        if (dto.categoryId !== undefined) {
            report.categoryId = dto.categoryId;
        }
        if (dto.type !== undefined) {
            report.type = dto.type;
        }
        if (dto.remark !== undefined) {
            report.remark = dto.remark;
        }
        if (dto.playerImg !== undefined) {
            report.playerImg = dto.playerImg;
        }
        if (dto.startTime !== undefined) {
            report.startTime = dto.startTime ? new Date(dto.startTime) : null;
        }
        if (dto.endTime !== undefined) {
            report.endTime = dto.endTime ? new Date(dto.endTime) : null;
        }
        if (dto.feedback !== undefined) {
            report.feedback = dto.feedback;
        }
        if (dto.userId !== undefined || dto.bossId !== undefined || dto.categoryId !== undefined || dto.quantity !== undefined) {
            const relations = await this.resolveRelations(nextUserId, nextBossId, nextCategoryId);
            const amounts = this.calculateAmounts({
                quantity: dto.quantity ?? Number(report.quantity),
                categoryPrice: relations.category.categoryPrice,
                commissionRate: relations.category.commissionRate,
                playerLevelPercent: relations.playerLevelPercent,
                bossTypePercent: relations.bossTypePercent,
            });
            report.quantity = this.toMoney(dto.quantity ?? Number(report.quantity));
            report.totalAmount = amounts.totalAmount;
            report.playerCommission = amounts.playerCommission;
            report.referrerCommission = amounts.referrerCommission;
            report.shopMoney = amounts.shopMoney;
        }
        const updated = await this.projectReportRepository.save(report);
        return this.toSafeProjectReport(updated);
    }
    async updateStatus(projectReportId, dto) {
        const report = await this.projectReportRepository.findOne({ where: { projectReportId } });
        if (!report) {
            throw new business_exception_1.BusinessException(responses_2.BusinessCode.REPORT_NOT_FOUND);
        }
        report.status = dto.status;
        const updated = await this.projectReportRepository.save(report);
        return this.toSafeProjectReport(updated);
    }
    async updatePayStatus(projectReportId, dto) {
        const report = await this.projectReportRepository.findOne({ where: { projectReportId } });
        if (!report) {
            throw new business_exception_1.BusinessException(responses_2.BusinessCode.REPORT_NOT_FOUND);
        }
        report.payStatus = dto.payStatus;
        const updated = await this.projectReportRepository.save(report);
        return this.toSafeProjectReport(updated);
    }
    async remove(projectReportId) {
        await this.findById(projectReportId);
        await this.projectReportRepository.softDelete(projectReportId);
    }
    async resolveRelations(userId, bossId, categoryId) {
        const user = await this.userRepository.findOne({ where: { userId }, select: { userId: true, playerLevelId: true } });
        if (!user) {
            throw new business_exception_1.BusinessException(responses_2.BusinessCode.USER_NOT_FOUND);
        }
        const boss = await this.bossRepository.findOne({ where: { bossId }, select: { bossId: true, bossTypeId: true } });
        if (!boss) {
            throw new business_exception_1.BusinessException(responses_2.BusinessCode.BOSS_NOT_FOUND);
        }
        const category = await this.categoryRepository.findOne({
            where: { categoryId },
            select: { categoryId: true, categoryPrice: true, commissionRate: true },
        });
        if (!category) {
            throw new business_exception_1.BusinessException(responses_2.BusinessCode.CATEGORY_NOT_FOUND);
        }
        const bossType = boss.bossTypeId
            ? await this.bossTypeRepository.findOne({ where: { bossTypeId: boss.bossTypeId }, select: { bossTypeId: true, percent: true } })
            : null;
        const playerLevel = user.playerLevelId
            ? await this.playerLevelRepository.findOne({
                where: { playerLevelId: user.playerLevelId },
                select: { playerLevelId: true, percent: true },
            })
            : null;
        return {
            category,
            bossTypePercent: Number(bossType?.percent ?? 0),
            playerLevelPercent: Number(playerLevel?.percent ?? 0),
        };
    }
    async ensureUserExists(userId) {
        const user = await this.userRepository.findOne({ where: { userId }, select: { userId: true } });
        if (!user) {
            throw new business_exception_1.BusinessException(responses_2.BusinessCode.USER_NOT_FOUND);
        }
    }
    calculateAmounts(input) {
        const quantity = input.quantity;
        const categoryPrice = Number(input.categoryPrice);
        const commissionRate = Number(input.commissionRate);
        const totalAmount = categoryPrice * quantity;
        const playerCommission = totalAmount * (commissionRate / 100) * (1 + input.playerLevelPercent / 100);
        const referrerCommission = totalAmount * (input.bossTypePercent / 100);
        const shopMoney = totalAmount - playerCommission - referrerCommission;
        return {
            totalAmount: this.toMoney(totalAmount),
            playerCommission: this.toMoney(playerCommission),
            referrerCommission: this.toMoney(referrerCommission),
            shopMoney: this.toMoney(shopMoney),
        };
    }
    toMoney(value) {
        return value.toFixed(2);
    }
    toSafeProjectReport(report) {
        const { deletedAt, ...safe } = report;
        return safe;
    }
    getPublicSelect() {
        return {
            projectReportId: true,
            no: true,
            userId: true,
            customerId: true,
            bossId: true,
            categoryId: true,
            quantity: true,
            totalAmount: true,
            playerCommission: true,
            referrerCommission: true,
            shopMoney: true,
            type: true,
            remark: true,
            playerImg: true,
            status: true,
            payStatus: true,
            startTime: true,
            endTime: true,
            feedback: true,
            createdAt: true,
            updatedAt: true,
        };
    }
    getPublicColumns() {
        return [
            'projectReport.projectReportId',
            'projectReport.no',
            'projectReport.userId',
            'projectReport.customerId',
            'projectReport.bossId',
            'projectReport.categoryId',
            'projectReport.quantity',
            'projectReport.totalAmount',
            'projectReport.playerCommission',
            'projectReport.referrerCommission',
            'projectReport.shopMoney',
            'projectReport.type',
            'projectReport.remark',
            'projectReport.playerImg',
            'projectReport.status',
            'projectReport.payStatus',
            'projectReport.startTime',
            'projectReport.endTime',
            'projectReport.feedback',
            'projectReport.createdAt',
            'projectReport.updatedAt',
        ];
    }
};
exports.ProjectReportService = ProjectReportService;
exports.ProjectReportService = ProjectReportService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(project_report_entity_1.ProjectReport)),
    __param(1, (0, typeorm_2.InjectRepository)(user_entity_1.User)),
    __param(2, (0, typeorm_2.InjectRepository)(boss_entity_1.Boss)),
    __param(3, (0, typeorm_2.InjectRepository)(category_entity_1.Category)),
    __param(4, (0, typeorm_2.InjectRepository)(boss_type_entity_1.BossType)),
    __param(5, (0, typeorm_2.InjectRepository)(player_level_entity_1.PlayerLevel)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository])
], ProjectReportService);
