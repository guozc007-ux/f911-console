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
exports.RoleService = void 0;
const typeorm_1 = require("typeorm");
const typeorm_2 = require("typeorm");
const common_1 = require("@nestjs/common");
const typeorm_3 = require("@nestjs/typeorm");
const menu_entity_1 = require("../../entities/menu.entity");
const role_entity_1 = require("../../entities/role.entity");
const responses_1 = require("../../responses");
const responses_2 = require("../../responses");
const business_exception_1 = require("../../common/filters/business.exception");
let RoleService = class RoleService {
    constructor(roleRepository, menuRepository) {
        this.roleRepository = roleRepository;
        this.menuRepository = menuRepository;
    }
    async findPaginated(query) {
        const qb = this.roleRepository
            .createQueryBuilder('role')
            .where('role.deletedAt IS NULL')
            .skip((query.page - 1) * query.pageSize)
            .take(query.pageSize)
            .orderBy('role.createdAt', 'DESC');
        if (query.keyword) {
            qb.andWhere(new typeorm_2.Brackets((builder) => {
                builder
                    .where('role.name LIKE :keyword', { keyword: `%${query.keyword}%` })
                    .orWhere('role.remark LIKE :keyword', { keyword: `%${query.keyword}%` });
            }));
        }
        const [roles, total] = await qb.getManyAndCount();
        return responses_1.PaginatedDto.of(roles.map((role) => this.toSafeRole(role)), total, query.page, query.pageSize);
    }
    async findById(roleId) {
        const role = await this.roleRepository.findOne({
            where: { roleId },
            relations: { menus: true },
        });
        if (!role) {
            throw new business_exception_1.BusinessException(responses_2.BusinessCode.ROLE_NOT_FOUND);
        }
        return {
            ...this.toSafeRole(role),
            menus: role.menus,
        };
    }
    async create(dto) {
        const role = this.roleRepository.create({
            name: dto.name,
            remark: dto.remark ?? '',
            del: 1,
        });
        const saved = await this.roleRepository.save(role);
        return this.toSafeRole(saved);
    }
    async update(roleId, dto) {
        const role = await this.roleRepository.findOne({ where: { roleId } });
        if (!role) {
            throw new business_exception_1.BusinessException(responses_2.BusinessCode.ROLE_NOT_FOUND);
        }
        if (dto.name !== undefined) {
            role.name = dto.name;
        }
        if (dto.remark !== undefined) {
            role.remark = dto.remark;
        }
        if (dto.del !== undefined) {
            role.del = dto.del;
        }
        const updated = await this.roleRepository.save(role);
        return this.toSafeRole(updated);
    }
    async assignMenus(roleId, dto) {
        const role = await this.roleRepository.findOne({
            where: { roleId },
            relations: { menus: true },
        });
        if (!role) {
            throw new business_exception_1.BusinessException(responses_2.BusinessCode.ROLE_NOT_FOUND);
        }
        const uniqueMenuIds = Array.from(new Set(dto.menuIds));
        const menus = await this.menuRepository.find({
            where: { menuId: (0, typeorm_1.In)(uniqueMenuIds) },
        });
        role.menus = menus;
        const saved = await this.roleRepository.save(role);
        return {
            ...this.toSafeRole(saved),
            menus: saved.menus,
        };
    }
    async remove(roleId) {
        const role = await this.findById(roleId);
        await this.roleRepository.softDelete(role.roleId);
    }
    toSafeRole(role) {
        const { menus, deletedAt, ...safe } = role;
        return safe;
    }
};
exports.RoleService = RoleService;
exports.RoleService = RoleService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_3.InjectRepository)(role_entity_1.Role)),
    __param(1, (0, typeorm_3.InjectRepository)(menu_entity_1.Menu)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], RoleService);
