export enum ResponseCode {
  SUCCESS = 200,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  SERVER_ERROR = 500,
}

export enum BusinessCode {
  SUCCESS = 200,
  PARAM_ERROR = 4001,
  UNAUTHORIZED = 4002,
  TOKEN_EXPIRED = 4003,
  TOKEN_INVALID = 4004,
  FORBIDDEN = 4005,
  CAPTCHA_REQUIRED = 4101,
  CAPTCHA_ERROR = 4102,
  CAPTCHA_EXPIRED = 4103,
  USER_NOT_FOUND = 4201,
  USER_DISABLED = 4202,
  USER_EXISTS = 4203,
  BOSS_NOT_FOUND = 4301,
  ORDER_NOT_FOUND = 4401,
  REPORT_NOT_FOUND = 4501,
  REPORT_ALREADY_PROCESSED = 4502,
  APPLY_NOT_FOUND = 4601,
  INSUFFICIENT_BALANCE = 4602,
  CATEGORY_NOT_FOUND = 4701,
  MENU_NOT_FOUND = 4702,
  ROLE_NOT_FOUND = 4801,
}

export class ResponseDto<T = unknown> {
  code: number
  msg: string
  data: T

  private constructor(code: number, msg: string, data: T) {
    this.code = code
    this.msg = msg
    this.data = data
  }

  static ok<T>(data: T, msg = '操作成功'): ResponseDto<T> {
    return new ResponseDto(BusinessCode.SUCCESS, msg, data)
  }

  static fail(code: number, msg: string): ResponseDto<null> {
    return new ResponseDto(code, msg, null)
  }

  static paramError(msg = '参数错误'): ResponseDto<null> {
    return new ResponseDto(BusinessCode.PARAM_ERROR, msg, null)
  }

  static unauthorized(msg = '未登录或登录已过期'): ResponseDto<null> {
    return new ResponseDto(BusinessCode.UNAUTHORIZED, msg, null)
  }

  static forbidden(msg = '无权限操作'): ResponseDto<null> {
    return new ResponseDto(BusinessCode.FORBIDDEN, msg, null)
  }

  static serverError(msg = '服务器内部错误'): ResponseDto<null> {
    return new ResponseDto(ResponseCode.SERVER_ERROR, msg, null)
  }
}

export class PaginatedDto<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
  pageCount: number

  private constructor(data: T[], total: number, page: number, pageSize: number) {
    this.data = data
    this.total = total
    this.page = page
    this.pageSize = pageSize
    this.pageCount = Math.ceil(total / pageSize)
  }

  static of<T>(data: T[], total: number, page: number, pageSize: number): PaginatedDto<T> {
    return new PaginatedDto(data, total, page, pageSize)
  }
}
