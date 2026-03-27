"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const database_config_1 = require("./config/database.config");
const auth_module_1 = require("./modules/auth/auth.module");
const user_module_1 = require("./modules/user/user.module");
const role_module_1 = require("./modules/role/role.module");
const menu_module_1 = require("./modules/menu/menu.module");
const boss_module_1 = require("./modules/boss/boss.module");
const order_module_1 = require("./modules/order/order.module");
const project_report_module_1 = require("./modules/project-report/project-report.module");
const category_module_1 = require("./modules/category/category.module");
const apply_module_1 = require("./modules/apply/apply.module");
const data_panel_module_1 = require("./modules/data-panel/data-panel.module");
const global_exception_filter_1 = require("./common/filters/global-exception.filter");
const response_interceptor_1 = require("./common/interceptors/response.interceptor");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env',
            }),
            typeorm_1.TypeOrmModule.forRootAsync(database_config_1.databaseConfig),
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            role_module_1.RoleModule,
            menu_module_1.MenuModule,
            boss_module_1.BossModule,
            order_module_1.OrderModule,
            project_report_module_1.ProjectReportModule,
            category_module_1.CategoryModule,
            apply_module_1.ApplyModule,
            data_panel_module_1.DataPanelModule,
        ],
        providers: [
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: response_interceptor_1.TransformInterceptor,
            },
            {
                provide: core_1.APP_FILTER,
                useClass: global_exception_filter_1.GlobalExceptionFilter,
            },
        ],
    })
], AppModule);
