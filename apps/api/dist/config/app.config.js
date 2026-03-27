"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    db: {
        host: process.env.DB_HOST || 'localhost',
        port: Number(process.env.DB_PORT || 3306),
        database: process.env.DB_DATABASE || 'ycyt_admin',
        username: process.env.DB_USERNAME || 'root',
        password: process.env.DB_PASSWORD || '',
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'dev-secret',
        expiresIn: process.env.JWT_EXPIRES_IN || '365d',
    },
    app: {
        port: Number(process.env.PORT || 3000),
        platform: process.env.APP_PLATFORM || 'admin',
    },
    captcha: {
        expireSeconds: Number(process.env.CAPTCHA_EXPIRE_SECONDS || 120),
    },
};
