import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Boss } from '../../entities/boss.entity'
import { BossType } from '../../entities/boss-type.entity'
import { Category } from '../../entities/category.entity'
import { PlayerLevel } from '../../entities/player-level.entity'
import { ProjectReport } from '../../entities/project-report.entity'
import { User } from '../../entities/user.entity'
import { ProjectReportController } from './project-report.controller'
import { ProjectReportService } from './project-report.service'

@Module({
  imports: [TypeOrmModule.forFeature([ProjectReport, User, Boss, Category, BossType, PlayerLevel])],
  controllers: [ProjectReportController],
  providers: [ProjectReportService],
  exports: [ProjectReportService],
})
export class ProjectReportModule {}
