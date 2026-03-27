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
exports.Captcha = void 0;
const typeorm_1 = require("typeorm");
let Captcha = class Captcha {
};
exports.Captcha = Captcha;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'bigint', unsigned: true, name: 'id' }),
    __metadata("design:type", Number)
], Captcha.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Index)('uk_captcha_uniq_id', ['uniqId'], { unique: true }),
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, nullable: false, default: '' }),
    __metadata("design:type", String)
], Captcha.prototype, "uniqId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 10, nullable: false, default: '' }),
    __metadata("design:type", String)
], Captcha.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Index)('idx_captcha_expire'),
    (0, typeorm_1.Column)({ type: 'bigint', name: 'expire_time', nullable: false }),
    __metadata("design:type", Number)
], Captcha.prototype, "expireTime", void 0);
__decorate([
    (0, typeorm_1.Index)('idx_captcha_used'),
    (0, typeorm_1.Column)({ type: 'tinyint', nullable: false, default: 0 }),
    __metadata("design:type", Number)
], Captcha.prototype, "used", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'datetime' }),
    __metadata("design:type", Date)
], Captcha.prototype, "createdAt", void 0);
exports.Captcha = Captcha = __decorate([
    (0, typeorm_1.Entity)({ name: 'captcha' })
], Captcha);
