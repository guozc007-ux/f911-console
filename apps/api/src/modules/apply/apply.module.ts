import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Apply } from '../../entities/apply.entity'
import { User } from '../../entities/user.entity'
import { ApplyController } from './apply.controller'
import { ApplyService } from './apply.service'

@Module({
  imports: [TypeOrmModule.forFeature([Apply, User])],
  controllers: [ApplyController],
  providers: [ApplyService],
  exports: [ApplyService],
})
export class ApplyModule {}
