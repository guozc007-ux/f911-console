import { AuthService } from './auth.service';
type LoginBody = {
    account: string;
    password: string;
    captcha: string;
    uniqId: string;
};
type LogoutBody = {
    token: string;
};
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    ping(): string;
    generateCaptcha(): Promise<{
        uniqId: string;
        image: string;
        expireTime: number;
    }>;
    login(body: LoginBody): Promise<{
        token: string;
        expireTime: number;
        user: {
            name: string;
            password: string;
            userId: number;
            account: string;
            nickname: string;
            code: string;
            sex: number;
            phone: string;
            avatar: string;
            role: number;
            playerLevelId: number;
            zfb: string;
            deposit: string;
            depositPay: string;
            projectHypothecate: number;
            freezeHours: number;
            status: number;
            remark: string;
            projectAcceptTime: number;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    logout(body: LogoutBody): Promise<void>;
}
export {};
