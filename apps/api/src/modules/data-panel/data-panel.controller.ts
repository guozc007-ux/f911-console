import { Controller, Get } from '@nestjs/common'
import { DataPanelService } from './data-panel.service'

@Controller('data-panels')
export class DataPanelController {
  constructor(private readonly dataPanelService: DataPanelService) {}

  @Get('overview')
  overview() {
    return this.dataPanelService.getOverview()
  }

  @Get('player-overview')
  playerOverview() {
    return this.dataPanelService.getPlayerOverview()
  }
}
