import { BusinessCode } from '../../responses'

export interface ErrorDefinition {
  code: BusinessCode
  message: string
  httpStatus: number
}

export const ERROR_CODE_MAP: Record<number, ErrorDefinition> = {
  [BusinessCode.SUCCESS]: {
    code: BusinessCode.SUCCESS,
    message: '操作成功',
    httpStatus: 200,
  },
  [BusinessCode.PARAM_ERROR]: {
    code: BusinessCode.PARAM_ERROR,
    message: '参数错误',
    httpStatus: 400,
  },
  [BusinessCode.UNAUTHORIZED]: {
    code: BusinessCode.UNAUTHORIZED,
    message: '未登录或登录已过期',
    httpStatus: 401,
  },
  [BusinessCode.TOKEN_EXPIRED]: {
    code: BusinessCode.TOKEN_EXPIRED,
    message: '登录已过期，请重新登录',
    httpStatus: 401,
  },
  [BusinessCode.TOKEN_INVALID]: {
    code: BusinessCode.TOKEN_INVALID,
    message: '登录凭证无效',
    httpStatus: 401,
  },
  [BusinessCode.FORBIDDEN]: {
    code: BusinessCode.FORBIDDEN,
    message: '无权限操作',
    httpStatus: 403,
  },
  [BusinessCode.CAPTCHA_REQUIRED]: {
    code: BusinessCode.CAPTCHA_REQUIRED,
    message: '请输入验证码',
    httpStatus: 400,
  },
  [BusinessCode.CAPTCHA_ERROR]: {
    code: BusinessCode.CAPTCHA_ERROR,
    message: '验证码错误',
    httpStatus: 400,
  },
  [BusinessCode.CAPTCHA_EXPIRED]: {
    code: BusinessCode.CAPTCHA_EXPIRED,
    message: '验证码已过期，请重新获取',
    httpStatus: 400,
  },
  [BusinessCode.USER_NOT_FOUND]: {
    code: BusinessCode.USER_NOT_FOUND,
    message: '用户不存在',
    httpStatus: 404,
  },
  [BusinessCode.USER_DISABLED]: {
    code: BusinessCode.USER_DISABLED,
    message: '账号已被禁用',
    httpStatus: 403,
  },
  [BusinessCode.USER_EXISTS]: {
    code: BusinessCode.USER_EXISTS,
    message: '用户已存在',
    httpStatus: 409,
  },
  [BusinessCode.BOSS_NOT_FOUND]: {
    code: BusinessCode.BOSS_NOT_FOUND,
    message: '老板不存在',
    httpStatus: 404,
  },
  [BusinessCode.ORDER_NOT_FOUND]: {
    code: BusinessCode.ORDER_NOT_FOUND,
    message: '订单不存在',
    httpStatus: 404,
  },
  [BusinessCode.REPORT_NOT_FOUND]: {
    code: BusinessCode.REPORT_NOT_FOUND,
    message: '报单不存在',
    httpStatus: 404,
  },
  [BusinessCode.REPORT_ALREADY_PROCESSED]: {
    code: BusinessCode.REPORT_ALREADY_PROCESSED,
    message: '报单已处理，请勿重复操作',
    httpStatus: 400,
  },
  [BusinessCode.APPLY_NOT_FOUND]: {
    code: BusinessCode.APPLY_NOT_FOUND,
    message: '提现申请不存在',
    httpStatus: 404,
  },
  [BusinessCode.INSUFFICIENT_BALANCE]: {
    code: BusinessCode.INSUFFICIENT_BALANCE,
    message: '余额不足',
    httpStatus: 400,
  },
  [BusinessCode.MENU_NOT_FOUND]: {
    code: BusinessCode.MENU_NOT_FOUND,
    message: '菜单不存在',
    httpStatus: 404,
  },
  [BusinessCode.CATEGORY_NOT_FOUND]: {
    code: BusinessCode.CATEGORY_NOT_FOUND,
    message: '分类不存在',
    httpStatus: 404,
  },
  [BusinessCode.ROLE_NOT_FOUND]: {
    code: BusinessCode.ROLE_NOT_FOUND,
    message: '角色不存在',
    httpStatus: 404,
  },
}

