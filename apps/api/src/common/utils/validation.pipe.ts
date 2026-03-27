import { Injectable, PipeTransform, ArgumentMetadata, BadRequestException } from '@nestjs/common'

@Injectable()
export class ValidationPipe implements PipeTransform {
  transform(value: unknown, _metadata: ArgumentMetadata) {
    if (value === undefined || value === null) {
      return value
    }

    if (typeof value !== 'string') {
      return value
    }

    const trimmed = value.trim()
    return trimmed.length === 0 ? undefined : trimmed
  }
}
