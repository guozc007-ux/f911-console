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
exports.BossType = void 0;
const typeorm_1 = require("typeorm");
const boss_entity_1 = require("./boss.entity");
let BossType = class BossType {
};
exports.BossType = BossType;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'bigint', unsigned: true, name: 'boss_type_id' }),
    __metadata("design:type", Number)
], BossType.prototype, "bossTypeId", void 0);
__decorate([
    (0, typeorm_1.Index)('idx_boss_type_name'),
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, nullable: false, default: '' }),
    __metadata("design:type", String)
], BossType.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 5, scale: 2, nullable: false, default: 0 }),
    __metadata("design:type", String)
], BossType.prototype, "percent", void 0);
__decorate([
    (0, typeorm_1.Index)('idx_boss_type_sort'),
    (0, typeorm_1.Column)({ type: 'int', nullable: false, default: 0 }),
    __metadata("design:type", Number)
], BossType.prototype, "sort", void 0);
__decorate([
    (0, typeorm_1.Index)('idx_boss_type_status'),
    (0, typeorm_1.Column)({ type: 'tinyint', nullable: false, default: 1 }),
    __metadata("design:type", Number)
], BossType.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => boss_entity_1.Boss, (boss) => boss.bossTypeId),
    __metadata("design:type", Array)
], BossType.prototype, "bosses", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'datetime' }),
    __metadata("design:type", Date)
], BossType.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'datetime' }),
    __metadata("design:type", Date)
], BossType.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ name: 'deleted_at', type: 'datetime', nullable: true }),
    __metadata("design:type", Object)
], BossType.prototype, "deletedAt", void 0);
exports.BossType = BossType = __decorate([
    (0, typeorm_1.Entity)({ name: 'boss_type' })
], BossType);
