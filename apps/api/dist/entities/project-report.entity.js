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
exports.ProjectReport = void 0;
const typeorm_1 = require("typeorm");
const boss_entity_1 = require("./boss.entity");
const category_entity_1 = require("./category.entity");
const user_entity_1 = require("./user.entity");
let ProjectReport = class ProjectReport {
};
exports.ProjectReport = ProjectReport;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'bigint', unsigned: true, name: 'project_report_id' }),
    __metadata("design:type", Number)
], ProjectReport.prototype, "projectReportId", void 0);
__decorate([
    (0, typeorm_1.Index)('uk_project_report_no', { unique: true }),
    (0, typeorm_1.Column)({ type: 'varchar', length: 20, nullable: false, default: '' }),
    __metadata("design:type", String)
], ProjectReport.prototype, "no", void 0);
__decorate([
    (0, typeorm_1.Index)('idx_project_report_user_id'),
    (0, typeorm_1.Column)({ type: 'bigint', unsigned: true, name: 'user_id', nullable: false }),
    __metadata("design:type", Number)
], ProjectReport.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Index)('idx_project_report_customer_id'),
    (0, typeorm_1.Column)({ type: 'bigint', unsigned: true, name: 'customer_id', nullable: false }),
    __metadata("design:type", Number)
], ProjectReport.prototype, "customerId", void 0);
__decorate([
    (0, typeorm_1.Index)('idx_project_report_boss_id'),
    (0, typeorm_1.Column)({ type: 'bigint', unsigned: true, name: 'boss_id', nullable: false }),
    __metadata("design:type", Number)
], ProjectReport.prototype, "bossId", void 0);
__decorate([
    (0, typeorm_1.Index)('idx_project_report_category_id'),
    (0, typeorm_1.ManyToOne)(() => category_entity_1.Category),
    (0, typeorm_1.JoinColumn)({ name: 'category_id', referencedColumnName: 'categoryId' }),
    (0, typeorm_1.Column)({ type: 'bigint', unsigned: true, nullable: false }),
    __metadata("design:type", Number)
], ProjectReport.prototype, "categoryId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, nullable: false, default: 1 }),
    __metadata("design:type", String)
], ProjectReport.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 12, scale: 2, name: 'total_amount', nullable: false, default: 0 }),
    __metadata("design:type", String)
], ProjectReport.prototype, "totalAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 12, scale: 2, name: 'player_commission', nullable: false, default: 0 }),
    __metadata("design:type", String)
], ProjectReport.prototype, "playerCommission", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 12, scale: 2, name: 'referrer_commission', nullable: false, default: 0 }),
    __metadata("design:type", String)
], ProjectReport.prototype, "referrerCommission", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 12, scale: 2, name: 'shop_money', nullable: false, default: 0 }),
    __metadata("design:type", String)
], ProjectReport.prototype, "shopMoney", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20, nullable: false, default: 'project' }),
    __metadata("design:type", String)
], ProjectReport.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 500, nullable: false, default: '' }),
    __metadata("design:type", String)
], ProjectReport.prototype, "remark", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', name: 'player_img', nullable: true }),
    __metadata("design:type", Object)
], ProjectReport.prototype, "playerImg", void 0);
__decorate([
    (0, typeorm_1.Index)('idx_project_report_status'),
    (0, typeorm_1.Column)({ type: 'tinyint', nullable: false, default: 1 }),
    __metadata("design:type", Number)
], ProjectReport.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'tinyint', name: 'pay_status', nullable: false, default: 1 }),
    __metadata("design:type", Number)
], ProjectReport.prototype, "payStatus", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime', name: 'start_time', nullable: true }),
    __metadata("design:type", Object)
], ProjectReport.prototype, "startTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime', name: 'end_time', nullable: true }),
    __metadata("design:type", Object)
], ProjectReport.prototype, "endTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 500, nullable: false, default: '' }),
    __metadata("design:type", String)
], ProjectReport.prototype, "feedback", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'datetime' }),
    __metadata("design:type", Date)
], ProjectReport.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'datetime' }),
    __metadata("design:type", Date)
], ProjectReport.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ name: 'deleted_at', type: 'datetime', nullable: true }),
    __metadata("design:type", Object)
], ProjectReport.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'user_id', referencedColumnName: 'userId' }),
    __metadata("design:type", user_entity_1.User)
], ProjectReport.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'customer_id', referencedColumnName: 'userId' }),
    __metadata("design:type", user_entity_1.User)
], ProjectReport.prototype, "customer", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => boss_entity_1.Boss),
    (0, typeorm_1.JoinColumn)({ name: 'boss_id', referencedColumnName: 'bossId' }),
    __metadata("design:type", boss_entity_1.Boss)
], ProjectReport.prototype, "boss", void 0);
exports.ProjectReport = ProjectReport = __decorate([
    (0, typeorm_1.Entity)({ name: 'project_report' })
], ProjectReport);
