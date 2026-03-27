"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ERROR_CODE_MAP = void 0;
const responses_1 = require("../../responses");
exports.ERROR_CODE_MAP = {
    [responses_1.BusinessCode.SUCCESS]: {
        code: responses_1.BusinessCode.SUCCESS,
        message: '操作成功',
        httpStatus: 200,
    },
    [responses_1.BusinessCode.PARAM_ERROR]: {
        code: responses_1.BusinessCode.PARAM_ERROR,
        message: '参数错误',
        httpStatus: 400,
    },
    [responses_1.BusinessCode.UNAUTHORIZED]: {
        code: responses_1.BusinessCode.UNAUTHORIZED,
        message: '未登录或登录已过期',
        httpStatus: 401,
    },
    [responses_1.BusinessCode.TOKEN_EXPIRED]: {
        code: responses_1.BusinessCode.TOKEN_EXPIRED,
        message: '登录已过期，请重新登录',
        httpStatus: 401,
    },
    [responses_1.BusinessCode.TOKEN_INVALID]: {
        code: responses_1.BusinessCode.TOKEN_INVALID,
        message: '登录凭证无效',
        httpStatus: 401,
    },
    [responses_1.BusinessCode.FORBIDDEN]: {
        code: responses_1.BusinessCode.FORBIDDEN,
        message: '无权限操作',
        httpStatus: 403,
    },
    [responses_1.BusinessCode.CAPTCHA_REQUIRED]: {
        code: responses_1.BusinessCode.CAPTCHA_REQUIRED,
        message: '请输入验证码',
        httpStatus: 400,
    },
    [responses_1.BusinessCode.CAPTCHA_ERROR]: {
        code: responses_1.BusinessCode.CAPTCHA_ERROR,
        message: '验证码错误',
        httpStatus: 400,
    },
    [responses_1.BusinessCode.CAPTCHA_EXPIRED]: {
        code: responses_1.BusinessCode.CAPTCHA_EXPIRED,
        message: '验证码已过期，请重新获取',
        httpStatus: 400,
    },
    [responses_1.BusinessCode.USER_NOT_FOUND]: {
        code: responses_1.BusinessCode.USER_NOT_FOUND,
        message: '用户不存在',
        httpStatus: 404,
    },
    [responses_1.BusinessCode.USER_DISABLED]: {
        code: responses_1.BusinessCode.USER_DISABLED,
        message: '账号已被禁用',
        httpStatus: 403,
    },
    [responses_1.BusinessCode.USER_EXISTS]: {
        code: responses_1.BusinessCode.USER_EXISTS,
        message: '用户已存在',
        httpStatus: 409,
    },
    [responses_1.BusinessCode.BOSS_NOT_FOUND]: {
        code: responses_1.BusinessCode.BOSS_NOT_FOUND,
        message: '老板不存在',
        httpStatus: 404,
    },
    [responses_1.BusinessCode.ORDER_NOT_FOUND]: {
        code: responses_1.BusinessCode.ORDER_NOT_FOUND,
        message: '订单不存在',
        httpStatus: 404,
    },
    [responses_1.BusinessCode.REPORT_NOT_FOUND]: {
        code: responses_1.BusinessCode.REPORT_NOT_FOUND,
        message: '报单不存在',
        httpStatus: 404,
    },
    [responses_1.BusinessCode.REPORT_ALREADY_PROCESSED]: {
        code: responses_1.BusinessCode.REPORT_ALREADY_PROCESSED,
        message: '报单已处理，请勿重复操作',
        httpStatus: 400,
    },
    [responses_1.BusinessCode.APPLY_NOT_FOUND]: {
        code: responses_1.BusinessCode.APPLY_NOT_FOUND,
        message: '提现申请不存在',
        httpStatus: 404,
    },
    [responses_1.BusinessCode.INSUFFICIENT_BALANCE]: {
        code: responses_1.BusinessCode.INSUFFICIENT_BALANCE,
        message: '余额不足',
        httpStatus: 400,
    },
    [responses_1.BusinessCode.MENU_NOT_FOUND]: {
        code: responses_1.BusinessCode.MENU_NOT_FOUND,
        message: '菜单不存在',
        httpStatus: 404,
    },
    [responses_1.BusinessCode.CATEGORY_NOT_FOUND]: {
        code: responses_1.BusinessCode.CATEGORY_NOT_FOUND,
        message: '分类不存在',
        httpStatus: 404,
    },
    [responses_1.BusinessCode.ROLE_NOT_FOUND]: {
        code: responses_1.BusinessCode.ROLE_NOT_FOUND,
        message: '角色不存在',
        httpStatus: 404,
    },
};
