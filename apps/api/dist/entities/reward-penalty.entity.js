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
exports.RewardPenalty = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
let RewardPenalty = class RewardPenalty {
};
exports.RewardPenalty = RewardPenalty;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'bigint', unsigned: true, name: 'id' }),
    __metadata("design:type", Number)
], RewardPenalty.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Index)('idx_reward_penalty_user_id'),
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.Column)({ type: 'bigint', unsigned: true, name: 'user_id', nullable: false }),
    __metadata("design:type", Number)
], RewardPenalty.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Index)('idx_reward_penalty_type'),
    (0, typeorm_1.Column)({ type: 'tinyint', nullable: false }),
    __metadata("design:type", Number)
], RewardPenalty.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, nullable: false, default: 0 }),
    __metadata("design:type", String)
], RewardPenalty.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 500, nullable: false, default: '' }),
    __metadata("design:type", String)
], RewardPenalty.prototype, "remark", void 0);
__decorate([
    (0, typeorm_1.Index)('idx_reward_penalty_operator_id'),
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.Column)({ type: 'bigint', unsigned: true, name: 'operator_id', nullable: false }),
    __metadata("design:type", Number)
], RewardPenalty.prototype, "operatorId", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'datetime' }),
    __metadata("design:type", Date)
], RewardPenalty.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'datetime' }),
    __metadata("design:type", Date)
], RewardPenalty.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ name: 'deleted_at', type: 'datetime', nullable: true }),
    __metadata("design:type", Object)
], RewardPenalty.prototype, "deletedAt", void 0);
exports.RewardPenalty = RewardPenalty = __decorate([
    (0, typeorm_1.Entity)({ name: 'reward_penalty' })
], RewardPenalty);
