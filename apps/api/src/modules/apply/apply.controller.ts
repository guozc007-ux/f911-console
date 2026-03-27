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
  CreateApplyDto,
  ListApplyDto,
  UpdateApplyCheckDto,
  UpdateApplyDto,
  UpdateApplyRemitDto,
} from './dto/apply.dto'
import { ApplyService } from './apply.service'

@Controller('applys')
export class ApplyController {
  constructor(private readonly applyService: ApplyService) {}

  @Get()
  list(@Query() query: ListApplyDto) {
    return this.applyService.findPaginated(query)
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.applyService.findById(id)
  }

  @Post()
  create(@Body() dto: CreateApplyDto) {
    return this.applyService.create(dto)
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateApplyDto) {
    return this.applyService.update(id, dto)
  }

  @Patch(':id/check')
  updateCheckStatus(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateApplyCheckDto) {
    return this.applyService.updateCheckStatus(id, dto)
  }

  @Patch(':id/remit')
  updateRemitStatus(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateApplyRemitDto) {
    return this.applyService.updateRemitStatus(id, dto)
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.applyService.remove(id).then(() => null)
  }
}
