"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var GlobalExceptionFilter_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const responses_1 = require("../../responses");
const business_exception_1 = require("./business.exception");
let GlobalExceptionFilter = GlobalExceptionFilter_1 = class GlobalExceptionFilter {
    constructor() {
        this.logger = new common_1.Logger(GlobalExceptionFilter_1.name);
    }
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        let dto;
        if (exception instanceof business_exception_1.BusinessException) {
            dto = responses_1.ResponseDto.fail(exception.code, exception.message);
            response.status(exception.httpStatus);
        }
        else if (exception instanceof common_1.HttpException) {
            const status = exception.getStatus();
            const responseBody = exception.getResponse();
            const msg = typeof responseBody === 'string' ? responseBody : '请求处理失败';
            dto = responses_1.ResponseDto.fail(status === 400 ? responses_1.ResponseCode.BAD_REQUEST : status, msg);
            response.status(status);
        }
        else {
            this.logger.error('Unknown error', exception);
            dto = responses_1.ResponseDto.serverError();
            response.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        response.json(dto);
    }
};
exports.GlobalExceptionFilter = GlobalExceptionFilter;
exports.GlobalExceptionFilter = GlobalExceptionFilter = GlobalExceptionFilter_1 = __decorate([
    (0, common_1.Catch)()
], GlobalExceptionFilter);
