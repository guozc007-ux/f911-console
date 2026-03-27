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
exports.UserService = void 0;
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
const typeorm_2 = require("@nestjs/typeorm");
const bcryptjs_1 = require("bcryptjs");
const user_entity_1 = require("../../entities/user.entity");
const responses_1 = require("../../responses");
const responses_2 = require("../../responses");
const business_exception_1 = require("../../common/filters/business.exception");
let UserService = class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async findPaginated(query) {
        const qb = this.userRepository
            .createQueryBuilder('user')
            .select(this.getPublicColumns())
            .where('user.deletedAt IS NULL')
            .skip((query.page - 1) * query.pageSize)
            .take(query.pageSize)
            .orderBy('user.createdAt', 'DESC');
        if (query.role !== undefined) {
            qb.andWhere('user.role = :role', { role: query.role });
        }
        if (query.status !== undefined) {
            qb.andWhere('user.status = :status', { status: query.status });
        }
        if (query.keyword) {
            qb.andWhere(new typeorm_1.Brackets((builder) => {
                builder
                    .where('user.account LIKE :keyword', { keyword: `%${query.keyword}%` })
                    .orWhere('user.nickname LIKE :keyword', { keyword: `%${query.keyword}%` })
                    .orWhere('user.phone LIKE :keyword', { keyword: `%${query.keyword}%` })
                    .orWhere('user.code LIKE :keyword', { keyword: `%${query.keyword}%` });
            }));
        }
        const [users, total] = await qb.getManyAndCount();
        return responses_1.PaginatedDto.of(users, total, query.page, query.pageSize);
    }
    async findById(userId) {
        const user = await this.userRepository.findOne({
            where: { userId },
            select: this.getPublicSelect(),
        });
        if (!user) {
            throw new business_exception_1.BusinessException(responses_2.BusinessCode.USER_NOT_FOUND);
        }
        return user;
    }
    async create(dto) {
        await this.assertUniqueFields(dto.account, dto.code, dto.phone);
        const hashedPassword = await (0, bcryptjs_1.hash)(dto.password, 10);
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
        });
        const saved = await this.userRepository.save(user);
        return this.toSafeUser(saved);
    }
    async update(userId, dto) {
        const user = await this.userRepository.findOne({ where: { userId } });
        if (!user) {
            throw new business_exception_1.BusinessException(responses_2.BusinessCode.USER_NOT_FOUND);
        }
        if (dto.account !== undefined && dto.account !== user.account) {
            await this.assertUniqueFields(dto.account, undefined, undefined, userId);
            user.account = dto.account;
        }
        if (dto.code !== undefined && dto.code !== user.code) {
            await this.assertUniqueFields(undefined, dto.code, undefined, userId);
            user.code = dto.code;
        }
        if (dto.phone !== undefined && dto.phone !== user.phone) {
            await this.assertUniqueFields(undefined, undefined, dto.phone, userId);
            user.phone = dto.phone;
        }
        if (dto.nickname !== undefined) {
            user.nickname = dto.nickname;
        }
        if (dto.sex !== undefined) {
            user.sex = dto.sex;
        }
        if (dto.role !== undefined) {
            user.role = dto.role;
        }
        if (dto.playerLevelId !== undefined) {
            user.playerLevelId = dto.playerLevelId;
        }
        if (dto.avatar !== undefined) {
            user.avatar = dto.avatar;
        }
        if (dto.zfb !== undefined) {
            user.zfb = dto.zfb;
        }
        if (dto.name !== undefined) {
            user.name = dto.name;
        }
        if (dto.status !== undefined) {
            user.status = dto.status;
        }
        if (dto.remark !== undefined) {
            user.remark = dto.remark;
        }
        const updated = await this.userRepository.save(user);
        return this.toSafeUser(updated);
    }
    async patchStatus(userId, dto) {
        const user = await this.userRepository.findOne({ where: { userId } });
        if (!user) {
            throw new business_exception_1.BusinessException(responses_2.BusinessCode.USER_NOT_FOUND);
        }
        user.status = dto.status;
        const updated = await this.userRepository.save(user);
        return this.toSafeUser(updated);
    }
    async remove(userId) {
        const user = await this.findById(userId);
        await this.userRepository.softDelete(user.userId);
    }
    async assertUniqueFields(account, code, phone, selfUserId) {
        if (account) {
            const existed = await this.userRepository.findOne({ where: { account } });
            if (existed && existed.userId !== selfUserId) {
                throw new business_exception_1.BusinessException(responses_2.BusinessCode.USER_EXISTS);
            }
        }
        if (code) {
            const existed = await this.userRepository.findOne({ where: { code } });
            if (existed && existed.userId !== selfUserId) {
                throw new business_exception_1.BusinessException(responses_2.BusinessCode.USER_EXISTS);
            }
        }
        if (phone) {
            const existed = await this.userRepository.findOne({ where: { phone } });
            if (existed && existed.userId !== selfUserId) {
                throw new business_exception_1.BusinessException(responses_2.BusinessCode.USER_EXISTS);
            }
        }
    }
    toSafeUser(user) {
        const { password, ...safe } = user;
        return safe;
    }
    getPublicSelect() {
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
        };
    }
    getPublicColumns() {
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
        ];
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], UserService);
