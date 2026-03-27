import { Request } from 'express';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { AdminSession } from '../../entities/admin-session.entity';
type JwtPayload = {
    sub: number;
    account?: string;
};
type LoginUser = {
    userId: number;
    account: string;
    role: number;
    nickName?: string;
};
declare const JwtAuthStrategy_base: new (...args: any) => any;
export declare class JwtAuthStrategy extends JwtAuthStrategy_base {
    private readonly userRepository;
    private readonly adminSessionRepository;
    constructor(userRepository: Repository<User>, adminSessionRepository: Repository<AdminSession>);
    validate(req: Request, payload: JwtPayload): Promise<LoginUser>;
}
export {};
