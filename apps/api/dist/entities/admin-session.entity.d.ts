import { User } from './user.entity';
export declare class AdminSession {
    id: number;
    userId: number;
    token: string;
    expireTime: number;
    ip: string;
    userAgent: string;
    createdAt: Date;
    updatedAt: Date | null;
    deletedAt: Date | null;
    user: User;
}
