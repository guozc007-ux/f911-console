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
exports.JwtAuthStrategy = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const passport_jwt_1 = require("passport-jwt");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const jwt_config_1 = require("../../config/jwt.config");
const user_entity_1 = require("../../entities/user.entity");
const admin_session_entity_1 = require("../../entities/admin-session.entity");
let JwtAuthStrategy = class JwtAuthStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy, 'jwt') {
    constructor(userRepository, adminSessionRepository) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwt_config_1.jwtConfig.secret,
            passReqToCallback: true,
        });
        this.userRepository = userRepository;
        this.adminSessionRepository = adminSessionRepository;
    }
    async validate(req, payload) {
        if (!payload?.sub) {
            throw new common_1.UnauthorizedException('未登录或登录已过期');
        }
        const authorization = req.headers.authorization || '';
        const token = authorization.startsWith('Bearer ') ? authorization.substring(7) : '';
        if (!token) {
            throw new common_1.UnauthorizedException('未登录或登录已过期');
        }
        const session = await this.adminSessionRepository.findOne({
            where: {
                token,
                userId: payload.sub,
            },
        });
        if (!session || session.expireTime <= Date.now()) {
            throw new common_1.UnauthorizedException('未登录或登录已过期');
        }
        const user = await this.userRepository.findOne({ where: { userId: payload.sub } });
        if (!user) {
            throw new common_1.UnauthorizedException('用户不存在');
        }
        if (user.status !== 1) {
            throw new common_1.UnauthorizedException('账号已被禁用');
        }
        return {
            userId: user.userId,
            account: user.account,
            role: user.role,
            nickName: user.nickname,
        };
    }
};
exports.JwtAuthStrategy = JwtAuthStrategy;
exports.JwtAuthStrategy = JwtAuthStrategy = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(admin_session_entity_1.AdminSession)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], JwtAuthStrategy);
