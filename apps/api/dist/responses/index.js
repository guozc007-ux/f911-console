"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginatedDto = exports.ResponseDto = exports.BusinessCode = exports.ResponseCode = void 0;
var ResponseCode;
(function (ResponseCode) {
    ResponseCode[ResponseCode["SUCCESS"] = 200] = "SUCCESS";
    ResponseCode[ResponseCode["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    ResponseCode[ResponseCode["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    ResponseCode[ResponseCode["FORBIDDEN"] = 403] = "FORBIDDEN";
    ResponseCode[ResponseCode["NOT_FOUND"] = 404] = "NOT_FOUND";
    ResponseCode[ResponseCode["SERVER_ERROR"] = 500] = "SERVER_ERROR";
})(ResponseCode || (exports.ResponseCode = ResponseCode = {}));
var BusinessCode;
(function (BusinessCode) {
    BusinessCode[BusinessCode["SUCCESS"] = 200] = "SUCCESS";
    BusinessCode[BusinessCode["PARAM_ERROR"] = 4001] = "PARAM_ERROR";
    BusinessCode[BusinessCode["UNAUTHORIZED"] = 4002] = "UNAUTHORIZED";
    BusinessCode[BusinessCode["TOKEN_EXPIRED"] = 4003] = "TOKEN_EXPIRED";
    BusinessCode[BusinessCode["TOKEN_INVALID"] = 4004] = "TOKEN_INVALID";
    BusinessCode[BusinessCode["FORBIDDEN"] = 4005] = "FORBIDDEN";
    BusinessCode[BusinessCode["CAPTCHA_REQUIRED"] = 4101] = "CAPTCHA_REQUIRED";
    BusinessCode[BusinessCode["CAPTCHA_ERROR"] = 4102] = "CAPTCHA_ERROR";
    BusinessCode[BusinessCode["CAPTCHA_EXPIRED"] = 4103] = "CAPTCHA_EXPIRED";
    BusinessCode[BusinessCode["USER_NOT_FOUND"] = 4201] = "USER_NOT_FOUND";
    BusinessCode[BusinessCode["USER_DISABLED"] = 4202] = "USER_DISABLED";
    BusinessCode[BusinessCode["USER_EXISTS"] = 4203] = "USER_EXISTS";
    BusinessCode[BusinessCode["BOSS_NOT_FOUND"] = 4301] = "BOSS_NOT_FOUND";
    BusinessCode[BusinessCode["ORDER_NOT_FOUND"] = 4401] = "ORDER_NOT_FOUND";
    BusinessCode[BusinessCode["REPORT_NOT_FOUND"] = 4501] = "REPORT_NOT_FOUND";
    BusinessCode[BusinessCode["REPORT_ALREADY_PROCESSED"] = 4502] = "REPORT_ALREADY_PROCESSED";
    BusinessCode[BusinessCode["APPLY_NOT_FOUND"] = 4601] = "APPLY_NOT_FOUND";
    BusinessCode[BusinessCode["INSUFFICIENT_BALANCE"] = 4602] = "INSUFFICIENT_BALANCE";
    BusinessCode[BusinessCode["CATEGORY_NOT_FOUND"] = 4701] = "CATEGORY_NOT_FOUND";
    BusinessCode[BusinessCode["MENU_NOT_FOUND"] = 4702] = "MENU_NOT_FOUND";
    BusinessCode[BusinessCode["ROLE_NOT_FOUND"] = 4801] = "ROLE_NOT_FOUND";
})(BusinessCode || (exports.BusinessCode = BusinessCode = {}));
class ResponseDto {
    constructor(code, msg, data) {
        this.code = code;
        this.msg = msg;
        this.data = data;
    }
    static ok(data, msg = '操作成功') {
        return new ResponseDto(BusinessCode.SUCCESS, msg, data);
    }
    static fail(code, msg) {
        return new ResponseDto(code, msg, null);
    }
    static paramError(msg = '参数错误') {
        return new ResponseDto(BusinessCode.PARAM_ERROR, msg, null);
    }
    static unauthorized(msg = '未登录或登录已过期') {
        return new ResponseDto(BusinessCode.UNAUTHORIZED, msg, null);
    }
    static forbidden(msg = '无权限操作') {
        return new ResponseDto(BusinessCode.FORBIDDEN, msg, null);
    }
    static serverError(msg = '服务器内部错误') {
        return new ResponseDto(ResponseCode.SERVER_ERROR, msg, null);
    }
}
exports.ResponseDto = ResponseDto;
class PaginatedDto {
    constructor(data, total, page, pageSize) {
        this.data = data;
        this.total = total;
        this.page = page;
        this.pageSize = pageSize;
        this.pageCount = Math.ceil(total / pageSize);
    }
    static of(data, total, page, pageSize) {
        return new PaginatedDto(data, total, page, pageSize);
    }
}
exports.PaginatedDto = PaginatedDto;
