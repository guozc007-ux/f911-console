import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common'
import { Response } from 'express'
import { ResponseDto, ResponseCode } from '../../responses'
import { BusinessException } from './business.exception'

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name)

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()

    let dto: ResponseDto<null>

    if (exception instanceof BusinessException) {
      dto = ResponseDto.fail(exception.code, exception.message)
      response.status(exception.httpStatus)
    } else if (exception instanceof HttpException) {
      const status = exception.getStatus()
      const responseBody = exception.getResponse()
      const msg = typeof responseBody === 'string' ? responseBody : '请求处理失败'
      dto = ResponseDto.fail(status === 400 ? ResponseCode.BAD_REQUEST : status, msg)
      response.status(status)
    } else {
      this.logger.error('Unknown error', exception)
      dto = ResponseDto.serverError()
      response.status(HttpStatus.INTERNAL_SERVER_ERROR)
    }

    response.json(dto)
  }
}
