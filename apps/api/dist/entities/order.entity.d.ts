import { User } from './user.entity';
export declare class Order {
    orderId: number;
    no: string;
    bossId: number;
    bossGameNickname: string;
    customerId: number;
    categoryId: unknown;
    userId: string;
    count: string;
    remark: string;
    feedback: string;
    status: number;
    del: number;
    createdAt: Date;
    updatedAt: Date;
    customer: User;
}
