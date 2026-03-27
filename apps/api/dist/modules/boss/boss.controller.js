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
exports.BossController = void 0;
const common_1 = require("@nestjs/common");
const boss_dto_1 = require("./dto/boss.dto");
const boss_service_1 = require("./boss.service");
let BossController = class BossController {
    constructor(bossService) {
        this.bossService = bossService;
    }
    list(query) {
        return this.bossService.findPaginated(query);
    }
    findOne(id) {
        return this.bossService.findById(id);
    }
    create(dto) {
        return this.bossService.create(dto);
    }
    update(id, dto) {
        return this.bossService.update(id, dto);
    }
    remove(id) {
        return this.bossService.remove(id).then(() => null);
    }
};
exports.BossController = BossController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [boss_dto_1.ListBossDto]),
    __metadata("design:returntype", void 0)
], BossController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], BossController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [boss_dto_1.CreateBossDto]),
    __metadata("design:returntype", void 0)
], BossController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, boss_dto_1.UpdateBossDto]),
    __metadata("design:returntype", void 0)
], BossController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], BossController.prototype, "remove", null);
exports.BossController = BossController = __decorate([
    (0, common_1.Controller)('bosses'),
    __metadata("design:paramtypes", [boss_service_1.BossService])
], BossController);
