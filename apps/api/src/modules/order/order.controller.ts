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
  AssignOrderCustomerDto,
  CreateOrderDto,
  ListOrderDto,
  UpdateOrderDto,
  UpdateOrderStatusDto,
} from './dto/order.dto'
import { OrderService } from './order.service'

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  list(@Query() query: ListOrderDto) {
    return this.orderService.findPaginated(query)
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.orderService.findById(id)
  }

  @Post()
  create(@Body() dto: CreateOrderDto) {
    return this.orderService.create(dto)
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateOrderDto) {
    return this.orderService.update(id, dto)
  }

  @Patch(':id/status')
  updateStatus(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateOrderStatusDto) {
    return this.orderService.updateStatus(id, dto)
  }

  @Patch(':id/customer')
  assignCustomer(@Param('id', ParseIntPipe) id: number, @Body() dto: AssignOrderCustomerDto) {
    return this.orderService.assignCustomer(id, dto)
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.orderService.remove(id).then(() => null)
  }
}
