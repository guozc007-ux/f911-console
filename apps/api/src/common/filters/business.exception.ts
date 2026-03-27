import { BusinessCode } from '../../responses'
import { ERROR_CODE_MAP } from '../../common/constants/error-code'

export class BusinessException extends Error {
  readonly code: BusinessCode
  readonly httpStatus: number

  constructor(code: BusinessCode, customMessage?: string) {
    const def = ERROR_CODE_MAP[code]
    super(customMessage || def.message)
    this.code = code
    this.httpStatus = def.httpStatus
  }
}
