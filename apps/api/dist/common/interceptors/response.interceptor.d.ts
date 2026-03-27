import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ResponseDto } from '../../responses';
export declare class TransformInterceptor<T> implements NestInterceptor<T, ResponseDto<T | null>> {
    intercept(context: ExecutionContext, next: CallHandler<T>): Observable<ResponseDto<T | null>>;
}
