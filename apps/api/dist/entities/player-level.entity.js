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
exports.PlayerLevel = void 0;
const typeorm_1 = require("typeorm");
let PlayerLevel = class PlayerLevel {
};
exports.PlayerLevel = PlayerLevel;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'bigint', unsigned: true, name: 'player_level_id' }),
    __metadata("design:type", Number)
], PlayerLevel.prototype, "playerLevelId", void 0);
__decorate([
    (0, typeorm_1.Index)('idx_player_level_name'),
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, nullable: false, default: '' }),
    __metadata("design:type", String)
], PlayerLevel.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 5, scale: 2, nullable: false, default: 0 }),
    __metadata("design:type", String)
], PlayerLevel.prototype, "percent", void 0);
__decorate([
    (0, typeorm_1.Index)('idx_player_level_sort'),
    (0, typeorm_1.Column)({ type: 'int', nullable: false, default: 0 }),
    __metadata("design:type", Number)
], PlayerLevel.prototype, "sort", void 0);
__decorate([
    (0, typeorm_1.Index)('idx_player_level_status'),
    (0, typeorm_1.Column)({ type: 'tinyint', nullable: false, default: 1 }),
    __metadata("design:type", Number)
], PlayerLevel.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'datetime' }),
    __metadata("design:type", Date)
], PlayerLevel.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'datetime' }),
    __metadata("design:type", Date)
], PlayerLevel.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ name: 'deleted_at', type: 'datetime', nullable: true }),
    __metadata("design:type", Object)
], PlayerLevel.prototype, "deletedAt", void 0);
exports.PlayerLevel = PlayerLevel = __decorate([
    (0, typeorm_1.Entity)({ name: 'player_level' })
], PlayerLevel);
