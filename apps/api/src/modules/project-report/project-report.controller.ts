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
  CreateProjectReportDto,
  ListProjectReportDto,
  UpdateProjectReportDto,
  UpdateProjectReportPayStatusDto,
  UpdateProjectReportStatusDto,
} from './dto/project-report.dto'
import { ProjectReportService } from './project-report.service'

@Controller('project-reports')
export class ProjectReportController {
  constructor(private readonly projectReportService: ProjectReportService) {}

  @Get()
  list(@Query() query: ListProjectReportDto) {
    return this.projectReportService.findPaginated(query)
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.projectReportService.findById(id)
  }

  @Post()
  create(@Body() dto: CreateProjectReportDto) {
    return this.projectReportService.create(dto)
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateProjectReportDto) {
    return this.projectReportService.update(id, dto)
  }

  @Patch(':id/status')
  updateStatus(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateProjectReportStatusDto) {
    return this.projectReportService.updateStatus(id, dto)
  }

  @Patch(':id/pay-status')
  updatePayStatus(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateProjectReportPayStatusDto) {
    return this.projectReportService.updatePayStatus(id, dto)
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.projectReportService.remove(id).then(() => null)
  }
}
