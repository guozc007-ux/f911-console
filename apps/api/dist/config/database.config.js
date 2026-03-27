"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseConfig = void 0;
const config_1 = require("@nestjs/config");
const buildTypeOrmOptions = (configService) => ({
    type: 'mysql',
    host: configService.get('DB_HOST', 'localhost'),
    port: Number(configService.get('DB_PORT', 3306)),
    database: configService.get('DB_DATABASE', 'ycyt_admin'),
    username: configService.get('DB_USERNAME', 'root'),
    password: String(configService.get('DB_PASSWORD', '')),
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: false,
    charset: 'utf8mb4',
    timezone: 'Z',
});
exports.databaseConfig = {
    useFactory: async (configService) => buildTypeOrmOptions(configService),
    inject: [config_1.ConfigService],
};
