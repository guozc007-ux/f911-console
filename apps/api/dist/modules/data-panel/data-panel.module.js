"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataPanelModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const apply_entity_1 = require("../../entities/apply.entity");
const boss_entity_1 = require("../../entities/boss.entity");
const fund_flow_entity_1 = require("../../entities/fund-flow.entity");
const project_report_entity_1 = require("../../entities/project-report.entity");
const reward_penalty_entity_1 = require("../../entities/reward-penalty.entity");
const user_entity_1 = require("../../entities/user.entity");
const data_panel_controller_1 = require("./data-panel.controller");
const data_panel_service_1 = require("./data-panel.service");
let DataPanelModule = class DataPanelModule {
};
exports.DataPanelModule = DataPanelModule;
exports.DataPanelModule = DataPanelModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([user_entity_1.User, boss_entity_1.Boss, project_report_entity_1.ProjectReport, apply_entity_1.Apply, fund_flow_entity_1.FundFlow, reward_penalty_entity_1.RewardPenalty])],
        controllers: [data_panel_controller_1.DataPanelController],
        providers: [data_panel_service_1.DataPanelService],
        exports: [data_panel_service_1.DataPanelService],
    })
], DataPanelModule);
