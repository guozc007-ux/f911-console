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
exports.ProjectReportController = void 0;
const common_1 = require("@nestjs/common");
const project_report_dto_1 = require("./dto/project-report.dto");
const project_report_service_1 = require("./project-report.service");
let ProjectReportController = class ProjectReportController {
    constructor(projectReportService) {
        this.projectReportService = projectReportService;
    }
    list(query) {
        return this.projectReportService.findPaginated(query);
    }
    findOne(id) {
        return this.projectReportService.findById(id);
    }
    create(dto) {
        return this.projectReportService.create(dto);
    }
    update(id, dto) {
        return this.projectReportService.update(id, dto);
    }
    updateStatus(id, dto) {
        return this.projectReportService.updateStatus(id, dto);
    }
    updatePayStatus(id, dto) {
        return this.projectReportService.updatePayStatus(id, dto);
    }
    remove(id) {
        return this.projectReportService.remove(id).then(() => null);
    }
};
exports.ProjectReportController = ProjectReportController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [project_report_dto_1.ListProjectReportDto]),
    __metadata("design:returntype", void 0)
], ProjectReportController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ProjectReportController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [project_report_dto_1.CreateProjectReportDto]),
    __metadata("design:returntype", void 0)
], ProjectReportController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, project_report_dto_1.UpdateProjectReportDto]),
    __metadata("design:returntype", void 0)
], ProjectReportController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(':id/status'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, project_report_dto_1.UpdateProjectReportStatusDto]),
    __metadata("design:returntype", void 0)
], ProjectReportController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.Patch)(':id/pay-status'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, project_report_dto_1.UpdateProjectReportPayStatusDto]),
    __metadata("design:returntype", void 0)
], ProjectReportController.prototype, "updatePayStatus", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ProjectReportController.prototype, "remove", null);
exports.ProjectReportController = ProjectReportController = __decorate([
    (0, common_1.Controller)('project-reports'),
    __metadata("design:paramtypes", [project_report_service_1.ProjectReportService])
], ProjectReportController);
