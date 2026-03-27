import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common'
import {
  CreateBossDto,
  ListBossDto,
  UpdateBossDto,
} from './dto/boss.dto'
import { BossService } from './boss.service'

@Controller('bosses')
export class BossController {
  constructor(private readonly bossService: BossService) {}

  @Get()
  list(@Query() query: ListBossDto) {
    return this.bossService.findPaginated(query)
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.bossService.findById(id)
  }

  @Post()
  create(@Body() dto: CreateBossDto) {
    return this.bossService.create(dto)
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateBossDto) {
    return this.bossService.update(id, dto)
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.bossService.remove(id).then(() => null)
  }
}
