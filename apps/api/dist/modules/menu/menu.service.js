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
exports.MenuService = void 0;
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
const typeorm_2 = require("@nestjs/typeorm");
const menu_entity_1 = require("../../entities/menu.entity");
const responses_1 = require("../../responses");
const responses_2 = require("../../responses");
const business_exception_1 = require("../../common/filters/business.exception");
let MenuService = class MenuService {
    constructor(menuRepository) {
        this.menuRepository = menuRepository;
    }
    async findPaginated(query) {
        const qb = this.menuRepository
            .createQueryBuilder('menu')
            .select(this.getPublicColumns())
            .where('menu.deletedAt IS NULL')
            .skip((query.page - 1) * query.pageSize)
            .take(query.pageSize)
            .orderBy('menu.createdAt', 'DESC');
        if (query.keyword) {
            qb.andWhere(new typeorm_1.Brackets((builder) => {
                builder
                    .where('menu.name LIKE :keyword', { keyword: `%${query.keyword}%` })
                    .orWhere('menu.url LIKE :keyword', { keyword: `%${query.keyword}%` })
                    .orWhere('menu.icon LIKE :keyword', { keyword: `%${query.keyword}%` });
            }));
        }
        const [menus, total] = await qb.getManyAndCount();
        return responses_1.PaginatedDto.of(menus.map((menu) => this.toSafeMenu(menu)), total, query.page, query.pageSize);
    }
    async findById(menuId) {
        const menu = await this.menuRepository.findOne({
            where: { menuId },
            select: this.getPublicSelect(),
        });
        if (!menu) {
            throw new business_exception_1.BusinessException(responses_2.BusinessCode.MENU_NOT_FOUND);
        }
        return menu;
    }
    async create(dto) {
        const menu = this.menuRepository.create({
            name: dto.name,
            url: dto.url,
            icon: dto.icon,
            sort: dto.sort,
            parentId: dto.parentId,
            status: 1,
        });
        const saved = await this.menuRepository.save(menu);
        return this.toSafeMenu(saved);
    }
    async update(menuId, dto) {
        const menu = await this.menuRepository.findOne({ where: { menuId } });
        if (!menu) {
            throw new business_exception_1.BusinessException(responses_2.BusinessCode.MENU_NOT_FOUND);
        }
        if (dto.name !== undefined) {
            menu.name = dto.name;
        }
        if (dto.url !== undefined) {
            menu.url = dto.url;
        }
        if (dto.icon !== undefined) {
            menu.icon = dto.icon;
        }
        if (dto.sort !== undefined) {
            menu.sort = dto.sort;
        }
        if (dto.parentId !== undefined) {
            menu.parentId = dto.parentId;
        }
        if (dto.status !== undefined) {
            menu.status = dto.status;
        }
        const updated = await this.menuRepository.save(menu);
        return this.toSafeMenu(updated);
    }
    async remove(menuId) {
        const menu = await this.findById(menuId);
        await this.menuRepository.softDelete(menu.menuId);
    }
    toSafeMenu(menu) {
        const { deletedAt, ...safe } = menu;
        return safe;
    }
    getPublicSelect() {
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
        };
    }
    getPublicColumns() {
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
        ];
    }
};
exports.MenuService = MenuService;
exports.MenuService = MenuService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(menu_entity_1.Menu)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], MenuService);
