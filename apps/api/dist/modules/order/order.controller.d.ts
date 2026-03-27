import { AssignOrderCustomerDto, CreateOrderDto, ListOrderDto, UpdateOrderDto, UpdateOrderStatusDto } from './dto/order.dto';
import { OrderService } from './order.service';
export declare class OrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
    list(query: ListOrderDto): Promise<import("../../responses").PaginatedDto<Omit<import("../../entities/order.entity").Order, "userId" | "categoryId"> & {
        categoryIds: number[];
        userIds: number[];
    }>>;
    findOne(id: number): Promise<Omit<import("../../entities/order.entity").Order, "userId" | "categoryId"> & {
        categoryIds: number[];
        userIds: number[];
    }>;
    create(dto: CreateOrderDto): Promise<Omit<import("../../entities/order.entity").Order, "userId" | "categoryId"> & {
        categoryIds: number[];
        userIds: number[];
    }>;
    update(id: number, dto: UpdateOrderDto): Promise<Omit<import("../../entities/order.entity").Order, "userId" | "categoryId"> & {
        categoryIds: number[];
        userIds: number[];
    }>;
    updateStatus(id: number, dto: UpdateOrderStatusDto): Promise<Omit<import("../../entities/order.entity").Order, "userId" | "categoryId"> & {
        categoryIds: number[];
        userIds: number[];
    }>;
    assignCustomer(id: number, dto: AssignOrderCustomerDto): Promise<Omit<import("../../entities/order.entity").Order, "userId" | "categoryId"> & {
        categoryIds: number[];
        userIds: number[];
    }>;
    remove(id: number): Promise<null>;
}
