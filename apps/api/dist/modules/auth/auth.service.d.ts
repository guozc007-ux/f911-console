import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../entities/user.entity';
import { Captcha } from '../../entities/captcha.entity';
import { AdminSession } from '../../entities/admin-session.entity';
type SafeUser = Omit<User, 'deletedAt'>;
type LoginResult = {
    token: string;
    expireTime: number;
    user: SafeUser;
};
export declare class AuthService {
    private readonly userRepository;
    private readonly captchaRepository;
    private readonly adminSessionRepository;
    private readonly jwtService;
    constructor(userRepository: Repository<User>, captchaRepository: Repository<Captcha>, adminSessionRepository: Repository<AdminSession>, jwtService: JwtService);
    generateCaptcha(): Promise<{
        uniqId: string;
        image: string;
        expireTime: number;
    }>;
    verifyCaptcha(uniqId: string, code: string): Promise<void>;
    login(account: string, password: string, captcha: string, uniqId: string): Promise<LoginResult>;
    logout(token: string): Promise<void>;
    private getJwtExpireTimestamp;
    private renderCaptchaImage;
    private toSafeUser;
}
export {};
