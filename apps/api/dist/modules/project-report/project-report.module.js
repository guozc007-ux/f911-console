"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectReportModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const boss_entity_1 = require("../../entities/boss.entity");
const boss_type_entity_1 = require("../../entities/boss-type.entity");
const category_entity_1 = require("../../entities/category.entity");
const player_level_entity_1 = require("../../entities/player-level.entity");
const project_report_entity_1 = require("../../entities/project-report.entity");
const user_entity_1 = require("../../entities/user.entity");
const project_report_controller_1 = require("./project-report.controller");
const project_report_service_1 = require("./project-report.service");
let ProjectReportModule = class ProjectReportModule {
};
exports.ProjectReportModule = ProjectReportModule;
exports.ProjectReportModule = ProjectReportModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([project_report_entity_1.ProjectReport, user_entity_1.User, boss_entity_1.Boss, category_entity_1.Category, boss_type_entity_1.BossType, player_level_entity_1.PlayerLevel])],
        controllers: [project_report_controller_1.ProjectReportController],
        providers: [project_report_service_1.ProjectReportService],
        exports: [project_report_service_1.ProjectReportService],
    })
], ProjectReportModule);
