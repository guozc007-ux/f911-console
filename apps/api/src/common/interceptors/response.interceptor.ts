import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { ResponseDto } from '../../responses'

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, ResponseDto<T | null>>
{
  intercept(context: ExecutionContext, next: CallHandler<T>): Observable<ResponseDto<T | null>> {
    return next.handle().pipe(
      map((data: unknown) => {
        if (data instanceof ResponseDto) {
          return data
        }
        return ResponseDto.ok(data as T)
      }),
    )
  }
}
