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
exports.Category = void 0;
const typeorm_1 = require("typeorm");
const project_report_entity_1 = require("./project-report.entity");
let Category = class Category {
};
exports.Category = Category;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'bigint', unsigned: true, name: 'category_id' }),
    __metadata("design:type", Number)
], Category.prototype, "categoryId", void 0);
__decorate([
    (0, typeorm_1.Index)('idx_category_fid'),
    (0, typeorm_1.Column)({ type: 'bigint', unsigned: true, name: 'category_fid', nullable: false, default: 0 }),
    __metadata("design:type", Number)
], Category.prototype, "categoryFid", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, name: 'category_name', nullable: false, default: '' }),
    __metadata("design:type", String)
], Category.prototype, "categoryName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, name: 'category_price', nullable: false, default: 0 }),
    __metadata("design:type", String)
], Category.prototype, "categoryPrice", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20, name: 'category_type', nullable: false, default: 'project' }),
    __metadata("design:type", String)
], Category.prototype, "categoryType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 5, scale: 2, name: 'commission_rate', nullable: false, default: 0 }),
    __metadata("design:type", String)
], Category.prototype, "commissionRate", void 0);
__decorate([
    (0, typeorm_1.Index)('idx_category_sort'),
    (0, typeorm_1.Column)({ type: 'int', name: 'category_sort', nullable: false, default: 0 }),
    __metadata("design:type", Number)
], Category.prototype, "categorySort", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 500, name: 'category_remark', nullable: false, default: '' }),
    __metadata("design:type", String)
], Category.prototype, "categoryRemark", void 0);
__decorate([
    (0, typeorm_1.Index)('idx_category_type'),
    (0, typeorm_1.Column)({ type: 'varchar', length: 20, nullable: false, default: '' }),
    __metadata("design:type", String)
], Category.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Index)('idx_category_status'),
    (0, typeorm_1.Column)({ type: 'tinyint', nullable: false, default: 1 }),
    __metadata("design:type", Number)
], Category.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => project_report_entity_1.ProjectReport, (report) => report.categoryId),
    __metadata("design:type", Array)
], Category.prototype, "projectReports", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'datetime' }),
    __metadata("design:type", Date)
], Category.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'datetime' }),
    __metadata("design:type", Date)
], Category.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ name: 'deleted_at', type: 'datetime', nullable: true }),
    __metadata("design:type", Object)
], Category.prototype, "deletedAt", void 0);
exports.Category = Category = __decorate([
    (0, typeorm_1.Entity)({ name: 'category' })
], Category);
