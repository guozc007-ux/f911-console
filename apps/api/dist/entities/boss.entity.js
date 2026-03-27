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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Boss = void 0;
const typeorm_1 = require("typeorm");
const project_report_entity_1 = require("./project-report.entity");
const fund_flow_entity_1 = require("./fund-flow.entity");
let Boss = class Boss {
};
exports.Boss = Boss;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'bigint', unsigned: true, name: 'boss_id' }),
    __metadata("design:type", Number)
], Boss.prototype, "bossId", void 0);
__decorate([
    (0, typeorm_1.Index)('idx_boss_nickname'),
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, nullable: false, default: '' }),
    __metadata("design:type", String)
], Boss.prototype, "nickname", void 0);
__decorate([
    (0, typeorm_1.Index)('uk_boss_code', ['code'], { unique: true }),
    (0, typeorm_1.Column)({ type: 'char', length: 10, nullable: false, default: '' }),
    __metadata("design:type", String)
], Boss.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'tinyint', nullable: false, default: 0 }),
    __metadata("design:type", Number)
], Boss.prototype, "sex", void 0);
__decorate([
    (0, typeorm_1.Index)('idx_boss_phone'),
    (0, typeorm_1.Column)({ type: 'varchar', length: 20, nullable: false, default: '' }),
    __metadata("design:type", String)
], Boss.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, nullable: false, default: '' }),
    __metadata("design:type", String)
], Boss.prototype, "wx", void 0);
__decorate([
    (0, typeorm_1.Index)('idx_boss_referrer'),
    (0, typeorm_1.Column)({ type: 'bigint', unsigned: true, name: 'referrer', nullable: false, default: 0 }),
    __metadata("design:type", Number)
], Boss.prototype, "referrer", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, name: 'referrer_commission', nullable: false, default: 0 }),
    __metadata("design:type", String)
], Boss.prototype, "referrerCommission", void 0);
__decorate([
    (0, typeorm_1.Index)('idx_boss_boss_type'),
    (0, typeorm_1.Column)({ type: 'bigint', unsigned: true, name: 'boss_type_id', nullable: false, default: 1 }),
    __metadata("design:type", Number)
], Boss.prototype, "bossTypeId", void 0);
__decorate([
    (0, typeorm_1.Index)('idx_boss_status'),
    (0, typeorm_1.Column)({ type: 'tinyint', nullable: false, default: 1 }),
    __metadata("design:type", Number)
], Boss.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => project_report_entity_1.ProjectReport, (report) => report.boss),
    __metadata("design:type", Array)
], Boss.prototype, "reports", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => fund_flow_entity_1.FundFlow, (fundFlow) => fundFlow.boss),
    __metadata("design:type", Array)
], Boss.prototype, "fundFlows", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'datetime' }),
    __metadata("design:type", Date)
], Boss.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'datetime' }),
    __metadata("design:type", Date)
], Boss.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ name: 'deleted_at', type: 'datetime', nullable: true }),
    __metadata("design:type", Object)
], Boss.prototype, "deletedAt", void 0);
exports.Boss = Boss = __decorate([
    (0, typeorm_1.Entity)({ name: 'boss' })
], Boss);
