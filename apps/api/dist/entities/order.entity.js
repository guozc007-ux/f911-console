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
exports.Order = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
let Order = class Order {
};
exports.Order = Order;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'bigint', unsigned: true, name: 'order_id' }),
    __metadata("design:type", Number)
], Order.prototype, "orderId", void 0);
__decorate([
    (0, typeorm_1.Index)('uk_order_no', { unique: true }),
    (0, typeorm_1.Column)({ type: 'varchar', length: 20, nullable: false, default: '' }),
    __metadata("design:type", String)
], Order.prototype, "no", void 0);
__decorate([
    (0, typeorm_1.Index)('idx_order_boss_id'),
    (0, typeorm_1.Column)({ type: 'bigint', unsigned: true, name: 'boss_id', nullable: false }),
    __metadata("design:type", Number)
], Order.prototype, "bossId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, name: 'boss_game_nickname', nullable: false, default: '' }),
    __metadata("design:type", String)
], Order.prototype, "bossGameNickname", void 0);
__decorate([
    (0, typeorm_1.Index)('idx_order_customer_id'),
    (0, typeorm_1.Column)({ type: 'bigint', unsigned: true, name: 'customer_id', nullable: false }),
    __metadata("design:type", Number)
], Order.prototype, "customerId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', name: 'category_id', nullable: false }),
    __metadata("design:type", Object)
], Order.prototype, "categoryId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 500, name: 'user_id', nullable: false, default: '' }),
    __metadata("design:type", String)
], Order.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, nullable: false, default: 1 }),
    __metadata("design:type", String)
], Order.prototype, "count", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 500, nullable: false, default: '' }),
    __metadata("design:type", String)
], Order.prototype, "remark", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 500, nullable: false, default: '' }),
    __metadata("design:type", String)
], Order.prototype, "feedback", void 0);
__decorate([
    (0, typeorm_1.Index)('idx_order_status'),
    (0, typeorm_1.Column)({ type: 'tinyint', nullable: false, default: 1 }),
    __metadata("design:type", Number)
], Order.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'tinyint', name: 'del', nullable: false, default: 1 }),
    __metadata("design:type", Number)
], Order.prototype, "del", void 0);
__decorate([
    (0, typeorm_1.Index)('idx_order_created'),
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'datetime' }),
    __metadata("design:type", Date)
], Order.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'datetime' }),
    __metadata("design:type", Date)
], Order.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'customer_id', referencedColumnName: 'userId' }),
    __metadata("design:type", user_entity_1.User)
], Order.prototype, "customer", void 0);
exports.Order = Order = __decorate([
    (0, typeorm_1.Entity)({ name: 'order' })
], Order);
