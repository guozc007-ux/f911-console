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
import { CreateMenuDto, ListMenuDto, UpdateMenuDto } from './dto/menu.dto'
import { MenuService } from './menu.service'

@Controller('menus')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get()
  list(@Query() query: ListMenuDto) {
    return this.menuService.findPaginated(query)
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.menuService.findById(id)
  }

  @Post()
  create(@Body() dto: CreateMenuDto) {
    return this.menuService.create(dto)
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateMenuDto) {
    return this.menuService.update(id, dto)
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.menuService.remove(id).then(() => null)
  }
}
