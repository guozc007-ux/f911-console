import { Module } from '@nestjs/common'
import { APP_GUARD, APP_INTERCEPTOR, APP_FILTER } from '@nestjs/core'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { databaseConfig } from './config/database.config'
import { AuthModule } from './modules/auth/auth.module'
import { UserModule } from './modules/user/user.module'
import { RoleModule } from './modules/role/role.module'
import { MenuModule } from './modules/menu/menu.module'
import { BossModule } from './modules/boss/boss.module'
import { OrderModule } from './modules/order/order.module'
import { ProjectReportModule } from './modules/project-report/project-report.module'
import { CategoryModule } from './modules/category/category.module'
import { ApplyModule } from './modules/apply/apply.module'
import { DataPanelModule } from './modules/data-panel/data-panel.module'
import { GlobalExceptionFilter } from './common/filters/global-exception.filter'
import { TransformInterceptor } from './common/interceptors/response.interceptor'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync(databaseConfig),
    AuthModule,
    UserModule,
    RoleModule,
    MenuModule,
    BossModule,
    OrderModule,
    ProjectReportModule,
    CategoryModule,
    ApplyModule,
    DataPanelModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class AppModule {}
