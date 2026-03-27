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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const node_crypto_1 = require("node:crypto");
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
const typeorm_2 = require("@nestjs/typeorm");
const jwt_1 = require("@nestjs/jwt");
const bcryptjs_1 = require("bcryptjs");
const user_entity_1 = require("../../entities/user.entity");
const captcha_entity_1 = require("../../entities/captcha.entity");
const admin_session_entity_1 = require("../../entities/admin-session.entity");
const responses_1 = require("../../responses");
const business_exception_1 = require("../../common/filters/business.exception");
const app_config_1 = require("../../config/app.config");
const jwt_config_1 = require("../../config/jwt.config");
let AuthService = class AuthService {
    constructor(userRepository, captchaRepository, adminSessionRepository, jwtService) {
        this.userRepository = userRepository;
        this.captchaRepository = captchaRepository;
        this.adminSessionRepository = adminSessionRepository;
        this.jwtService = jwtService;
    }
    async generateCaptcha() {
        const uniqId = `${Date.now()}_${(0, node_crypto_1.randomBytes)(8).toString('hex')}`;
        const code = Array.from({ length: 4 }, () => String((0, node_crypto_1.randomInt)(0, 10))).join('');
        const expireTime = Date.now() + app_config_1.default.captcha.expireSeconds * 1000;
        const captcha = this.captchaRepository.create({
            uniqId,
            code,
            expireTime,
            used: 0,
        });
        await this.captchaRepository.save(captcha);
        const image = this.renderCaptchaImage(code);
        return {
            uniqId,
            image,
            expireTime,
        };
    }
    async verifyCaptcha(uniqId, code) {
        if (!uniqId || !code) {
            throw new business_exception_1.BusinessException(responses_1.BusinessCode.CAPTCHA_REQUIRED);
        }
        const captcha = await this.captchaRepository.findOne({ where: { uniqId } });
        if (!captcha) {
            throw new business_exception_1.BusinessException(responses_1.BusinessCode.CAPTCHA_ERROR);
        }
        if (captcha.used === 1) {
            throw new business_exception_1.BusinessException(responses_1.BusinessCode.CAPTCHA_ERROR);
        }
        if (captcha.expireTime <= Date.now()) {
            throw new business_exception_1.BusinessException(responses_1.BusinessCode.CAPTCHA_EXPIRED);
        }
        if (captcha.code !== String(code).trim()) {
            throw new business_exception_1.BusinessException(responses_1.BusinessCode.CAPTCHA_ERROR);
        }
        captcha.used = 1;
        await this.captchaRepository.save(captcha);
    }
    async login(account, password, captcha, uniqId) {
        await this.verifyCaptcha(uniqId, captcha);
        const user = await this.userRepository.findOne({
            where: { account },
        });
        if (!user) {
            throw new business_exception_1.BusinessException(responses_1.BusinessCode.USER_NOT_FOUND);
        }
        if (user.status !== 1) {
            throw new business_exception_1.BusinessException(responses_1.BusinessCode.USER_DISABLED);
        }
        const isMatch = await (0, bcryptjs_1.compare)(password, user.password);
        if (!isMatch) {
            throw new business_exception_1.BusinessException(responses_1.BusinessCode.PARAM_ERROR, '账号或密码错误');
        }
        const payload = {
            sub: user.userId,
            account: user.account,
            role: user.role,
        };
        const token = this.jwtService.sign(payload);
        const expireTime = this.getJwtExpireTimestamp(jwt_config_1.jwtConfig.expiresIn);
        const adminSession = this.adminSessionRepository.create({
            userId: user.userId,
            token,
            expireTime,
            ip: '',
            userAgent: '',
        });
        await this.adminSessionRepository.save(adminSession);
        return {
            token,
            expireTime,
            user: this.toSafeUser(user),
        };
    }
    async logout(token) {
        if (!token) {
            return;
        }
        const adminSession = await this.adminSessionRepository.findOne({ where: { token } });
        if (!adminSession) {
            return;
        }
        await this.adminSessionRepository.softDelete(adminSession.id);
    }
    getJwtExpireTimestamp(expiresIn = '365d') {
        const match = String(expiresIn).match(/^(\d+)([smhd])$/i);
        if (!match) {
            return Date.now() + Number.parseInt(String(expiresIn), 10) * 1000;
        }
        const value = Number.parseInt(match[1], 10);
        const unit = match[2].toLowerCase();
        const unitMap = {
            s: 1,
            m: 60,
            h: 60 * 60,
            d: 24 * 60 * 60,
        };
        return Date.now() + value * (unitMap[unit] || 24 * 60 * 60) * 1000;
    }
    renderCaptchaImage(code) {
        const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="140" height="48" viewBox="0 0 140 48">
        <rect width="140" height="48" fill="#f7f7f7"/>
        <text x="22" y="32" font-size="28" font-family="Arial, Helvetica, sans-serif" fill="#333" tracking="8">
          ${code}
        </text>
      </svg>
    `;
        return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
    }
    toSafeUser(user) {
        const { deletedAt, ...safe } = user;
        return safe;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_2.InjectRepository)(captcha_entity_1.Captcha)),
    __param(2, (0, typeorm_2.InjectRepository)(admin_session_entity_1.AdminSession)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        jwt_1.JwtService])
], AuthService);
