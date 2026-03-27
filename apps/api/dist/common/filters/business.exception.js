"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusinessException = void 0;
const error_code_1 = require("../../common/constants/error-code");
class BusinessException extends Error {
    constructor(code, customMessage) {
        const def = error_code_1.ERROR_CODE_MAP[code];
        super(customMessage || def.message);
        this.code = code;
        this.httpStatus = def.httpStatus;
    }
}
exports.BusinessException = BusinessException;
