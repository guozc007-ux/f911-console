import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Boss } from '../../entities/boss.entity'
import { BossController } from './boss.controller'
import { BossService } from './boss.service'

@Module({
  imports: [TypeOrmModule.forFeature([Boss])],
  controllers: [BossController],
  providers: [BossService],
  exports: [BossService],
})
export class BossModule {}
