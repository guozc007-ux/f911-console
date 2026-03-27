import { User } from './user.entity';
export declare class Apply {
    applyId: number;
    userId: number;
    money: string;
    alipayAccount: string;
    alipayName: string;
    checkStatus: number;
    checkRemark: string;
    checkOperatorId: number;
    checkTime: Date | null;
    remit: number;
    remitTime: Date | null;
    remitRemark: string;
    status: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    user: User;
}
