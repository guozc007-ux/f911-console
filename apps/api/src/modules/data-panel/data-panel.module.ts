import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Apply } from '../../entities/apply.entity'
import { Boss } from '../../entities/boss.entity'
import { FundFlow } from '../../entities/fund-flow.entity'
import { ProjectReport } from '../../entities/project-report.entity'
import { RewardPenalty } from '../../entities/reward-penalty.entity'
import { User } from '../../entities/user.entity'
import { DataPanelController } from './data-panel.controller'
import { DataPanelService } from './data-panel.service'

@Module({
  imports: [TypeOrmModule.forFeature([User, Boss, ProjectReport, Apply, FundFlow, RewardPenalty])],
  controllers: [DataPanelController],
  providers: [DataPanelService],
  exports: [DataPanelService],
})
export class DataPanelModule {}
