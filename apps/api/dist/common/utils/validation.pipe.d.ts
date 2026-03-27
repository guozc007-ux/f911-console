import { PipeTransform, ArgumentMetadata } from '@nestjs/common';
export declare class ValidationPipe implements PipeTransform {
    transform(value: unknown, _metadata: ArgumentMetadata): {} | null | undefined;
}
