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
exports.ApplyController = void 0;
const common_1 = require("@nestjs/common");
const apply_dto_1 = require("./dto/apply.dto");
const apply_service_1 = require("./apply.service");
let ApplyController = class ApplyController {
    constructor(applyService) {
        this.applyService = applyService;
    }
    list(query) {
        return this.applyService.findPaginated(query);
    }
    findOne(id) {
        return this.applyService.findById(id);
    }
    create(dto) {
        return this.applyService.create(dto);
    }
    update(id, dto) {
        return this.applyService.update(id, dto);
    }
    updateCheckStatus(id, dto) {
        return this.applyService.updateCheckStatus(id, dto);
    }
    updateRemitStatus(id, dto) {
        return this.applyService.updateRemitStatus(id, dto);
    }
    remove(id) {
        return this.applyService.remove(id).then(() => null);
    }
};
exports.ApplyController = ApplyController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [apply_dto_1.ListApplyDto]),
    __metadata("design:returntype", void 0)
], ApplyController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ApplyController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [apply_dto_1.CreateApplyDto]),
    __metadata("design:returntype", void 0)
], ApplyController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, apply_dto_1.UpdateApplyDto]),
    __metadata("design:returntype", void 0)
], ApplyController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(':id/check'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, apply_dto_1.UpdateApplyCheckDto]),
    __metadata("design:returntype", void 0)
], ApplyController.prototype, "updateCheckStatus", null);
__decorate([
    (0, common_1.Patch)(':id/remit'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, apply_dto_1.UpdateApplyRemitDto]),
    __metadata("design:returntype", void 0)
], ApplyController.prototype, "updateRemitStatus", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ApplyController.prototype, "remove", null);
exports.ApplyController = ApplyController = __decorate([
    (0, common_1.Controller)('applys'),
    __metadata("design:paramtypes", [apply_service_1.ApplyService])
], ApplyController);
