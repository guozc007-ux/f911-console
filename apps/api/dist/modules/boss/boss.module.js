"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BossModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const boss_entity_1 = require("../../entities/boss.entity");
const boss_controller_1 = require("./boss.controller");
const boss_service_1 = require("./boss.service");
let BossModule = class BossModule {
};
exports.BossModule = BossModule;
exports.BossModule = BossModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([boss_entity_1.Boss])],
        controllers: [boss_controller_1.BossController],
        providers: [boss_service_1.BossService],
        exports: [boss_service_1.BossService],
    })
], BossModule);
