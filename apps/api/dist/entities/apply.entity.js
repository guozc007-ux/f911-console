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
exports.Apply = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
let Apply = class Apply {
};
exports.Apply = Apply;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'bigint', unsigned: true, name: 'apply_id' }),
    __metadata("design:type", Number)
], Apply.prototype, "applyId", void 0);
__decorate([
    (0, typeorm_1.Index)('idx_apply_user_id'),
    (0, typeorm_1.Column)({ type: 'bigint', unsigned: true, name: 'user_id', nullable: false }),
    __metadata("design:type", Number)
], Apply.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, nullable: false, default: 0 }),
    __metadata("design:type", String)
], Apply.prototype, "money", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, name: 'alipay_account', nullable: false, default: '' }),
    __metadata("design:type", String)
], Apply.prototype, "alipayAccount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, name: 'alipay_name', nullable: false, default: '' }),
    __metadata("design:type", String)
], Apply.prototype, "alipayName", void 0);
__decorate([
    (0, typeorm_1.Index)('idx_apply_check'),
    (0, typeorm_1.Column)({ type: 'tinyint', name: 'check', nullable: false, default: 0 }),
    __metadata("design:type", Number)
], Apply.prototype, "checkStatus", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 500, name: 'check_remark', nullable: false, default: '' }),
    __metadata("design:type", String)
], Apply.prototype, "checkRemark", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'bigint', unsigned: true, name: 'check_operator_id', nullable: false, default: 0 }),
    __metadata("design:type", Number)
], Apply.prototype, "checkOperatorId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime', name: 'check_time', nullable: true }),
    __metadata("design:type", Object)
], Apply.prototype, "checkTime", void 0);
__decorate([
    (0, typeorm_1.Index)('idx_apply_remit'),
    (0, typeorm_1.Column)({ type: 'tinyint', name: 'remit', nullable: false, default: 0 }),
    __metadata("design:type", Number)
], Apply.prototype, "remit", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime', name: 'remit_time', nullable: true }),
    __metadata("design:type", Object)
], Apply.prototype, "remitTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 500, name: 'remit_remark', nullable: false, default: '' }),
    __metadata("design:type", String)
], Apply.prototype, "remitRemark", void 0);
__decorate([
    (0, typeorm_1.Index)('idx_apply_status'),
    (0, typeorm_1.Column)({ type: 'tinyint', nullable: false, default: 1 }),
    __metadata("design:type", Number)
], Apply.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Index)('idx_apply_created'),
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'datetime' }),
    __metadata("design:type", Date)
], Apply.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'datetime' }),
    __metadata("design:type", Date)
], Apply.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ name: 'deleted_at', type: 'datetime', nullable: true }),
    __metadata("design:type", Object)
], Apply.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'user_id', referencedColumnName: 'userId' }),
    __metadata("design:type", user_entity_1.User)
], Apply.prototype, "user", void 0);
exports.Apply = Apply = __decorate([
    (0, typeorm_1.Entity)({ name: 'apply' })
], Apply);
