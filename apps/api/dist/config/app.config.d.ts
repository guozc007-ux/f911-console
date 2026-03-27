declare const _default: {
    db: {
        host: string;
        port: number;
        database: string;
        username: string;
        password: string;
    };
    jwt: {
        secret: string;
        expiresIn: string;
    };
    app: {
        port: number;
        platform: string;
    };
    captcha: {
        expireSeconds: number;
    };
};
export default _default;
