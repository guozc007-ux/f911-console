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
exports.FundFlow = void 0;
const typeorm_1 = require("typeorm");
const boss_entity_1 = require("./boss.entity");
const user_entity_1 = require("./user.entity");
let FundFlow = class FundFlow {
};
exports.FundFlow = FundFlow;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'bigint', unsigned: true, name: 'fund_flow_id' }),
    __metadata("design:type", Number)
], FundFlow.prototype, "fundFlowId", void 0);
__decorate([
    (0, typeorm_1.Index)('idx_fund_flow_boss_id'),
    (0, typeorm_1.Column)({ type: 'bigint', unsigned: true, name: 'boss_id', nullable: false }),
    __metadata("design:type", Number)
], FundFlow.prototype, "bossId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 12, scale: 2, nullable: false, default: 0 }),
    __metadata("design:type", String)
], FundFlow.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 12, scale: 2, nullable: false, default: 0 }),
    __metadata("design:type", String)
], FundFlow.prototype, "give", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 12, scale: 2, name: 'balance_before', nullable: false, default: 0 }),
    __metadata("design:type", String)
], FundFlow.prototype, "balanceBefore", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 12, scale: 2, name: 'balance_after', nullable: false, default: 0 }),
    __metadata("design:type", String)
], FundFlow.prototype, "balanceAfter", void 0);
__decorate([
    (0, typeorm_1.Index)('idx_fund_flow_operation_type'),
    (0, typeorm_1.Column)({ type: 'tinyint', name: 'operation_type', nullable: false }),
    __metadata("design:type", Number)
], FundFlow.prototype, "operationType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, nullable: false, default: '' }),
    __metadata("design:type", String)
], FundFlow.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, name: 'business_type', nullable: false, default: '' }),
    __metadata("design:type", String)
], FundFlow.prototype, "businessType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'bigint', unsigned: true, name: 'business_id', nullable: false, default: 0 }),
    __metadata("design:type", Number)
], FundFlow.prototype, "businessId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 500, nullable: false, default: '' }),
    __metadata("design:type", String)
], FundFlow.prototype, "remark", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', name: 'extra_data', nullable: true }),
    __metadata("design:type", Object)
], FundFlow.prototype, "extraData", void 0);
__decorate([
    (0, typeorm_1.Index)('idx_fund_flow_customer_id'),
    (0, typeorm_1.Column)({ type: 'bigint', unsigned: true, name: 'customer_id', nullable: true }),
    __metadata("design:type", Object)
], FundFlow.prototype, "customerId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 500, nullable: false, default: '' }),
    __metadata("design:type", String)
], FundFlow.prototype, "photo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'tinyint', nullable: false, default: 1 }),
    __metadata("design:type", Number)
], FundFlow.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Index)('idx_fund_flow_del'),
    (0, typeorm_1.Column)({ type: 'tinyint', name: 'del', nullable: false, default: 1 }),
    __metadata("design:type", Number)
], FundFlow.prototype, "del", void 0);
__decorate([
    (0, typeorm_1.Index)('idx_fund_flow_created'),
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'datetime' }),
    __metadata("design:type", Date)
], FundFlow.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'datetime' }),
    __metadata("design:type", Date)
], FundFlow.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ name: 'deleted_at', type: 'datetime', nullable: true }),
    __metadata("design:type", Object)
], FundFlow.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => boss_entity_1.Boss),
    (0, typeorm_1.JoinColumn)({ name: 'boss_id', referencedColumnName: 'bossId' }),
    __metadata("design:type", boss_entity_1.Boss)
], FundFlow.prototype, "boss", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => user_entity_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'customer_id', referencedColumnName: 'userId' }),
    __metadata("design:type", user_entity_1.User)
], FundFlow.prototype, "customer", void 0);
exports.FundFlow = FundFlow = __decorate([
    (0, typeorm_1.Entity)({ name: 'fund_flow' })
], FundFlow);
