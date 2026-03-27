"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplyModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const apply_entity_1 = require("../../entities/apply.entity");
const user_entity_1 = require("../../entities/user.entity");
const apply_controller_1 = require("./apply.controller");
const apply_service_1 = require("./apply.service");
let ApplyModule = class ApplyModule {
};
exports.ApplyModule = ApplyModule;
exports.ApplyModule = ApplyModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([apply_entity_1.Apply, user_entity_1.User])],
        controllers: [apply_controller_1.ApplyController],
        providers: [apply_service_1.ApplyService],
        exports: [apply_service_1.ApplyService],
    })
], ApplyModule);
