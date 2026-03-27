import { Repository } from 'typeorm';
import { Order } from '../../entities/order.entity';
import { PaginatedDto } from '../../responses';
import { AssignOrderCustomerDto, CreateOrderDto, ListOrderDto, UpdateOrderDto, UpdateOrderStatusDto } from './dto/order.dto';
type SerializedOrder = Omit<Order, 'categoryId' | 'userId'> & {
    categoryIds: number[];
    userIds: number[];
};
export declare class OrderService {
    private readonly orderRepository;
    constructor(orderRepository: Repository<Order>);
    findPaginated(query: ListOrderDto): Promise<PaginatedDto<SerializedOrder>>;
    findById(orderId: number): Promise<SerializedOrder>;
    create(dto: CreateOrderDto): Promise<SerializedOrder>;
    update(orderId: number, dto: UpdateOrderDto): Promise<SerializedOrder>;
    updateStatus(orderId: number, dto: UpdateOrderStatusDto): Promise<SerializedOrder>;
    assignCustomer(orderId: number, dto: AssignOrderCustomerDto): Promise<SerializedOrder>;
    remove(orderId: number): Promise<void>;
    private serializeOrder;
    private parseNumberArray;
    private parseUserIds;
    private getPublicSelect;
    private getPublicColumns;
}
export {};
