import { ConfigService } from '@nestjs/config'
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm'
import { DataSourceOptions } from 'typeorm'

const buildTypeOrmOptions = (configService: ConfigService): DataSourceOptions => ({
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
})

export const databaseConfig: TypeOrmModuleAsyncOptions = {
  useFactory: async (configService: ConfigService): Promise<DataSourceOptions> => buildTypeOrmOptions(configService),
  inject: [ConfigService],
}
