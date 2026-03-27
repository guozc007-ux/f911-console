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
import { AssignMenusToRoleDto, CreateRoleDto, ListRoleDto, UpdateRoleDto } from './dto/role.dto'
import { RoleService } from './role.service'

@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  list(@Query() query: ListRoleDto) {
    return this.roleService.findPaginated(query)
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.roleService.findById(id)
  }

  @Post()
  create(@Body() dto: CreateRoleDto) {
    return this.roleService.create(dto)
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateRoleDto) {
    return this.roleService.update(id, dto)
  }

  @Patch(':id/menus')
  assignMenus(@Param('id', ParseIntPipe) id: number, @Body() dto: AssignMenusToRoleDto) {
    return this.roleService.assignMenus(id, dto)
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.roleService.remove(id).then(() => null)
  }
}
