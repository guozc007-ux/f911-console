import { Transform, Type } from 'class-transformer'
import { IsIn, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, IsArray, ArrayNotEmpty, Min, IsDefined } from 'class-validator'

const toNumberArray = ({ value }: { value: unknown }) => {
  if (Array.isArray(value)) {
    return value.map((item) => {
      const n = Number(item)
      return Number.isNaN(n) ? item : n
    })
  }

  if (typeof value === 'string') {
    const parsed = value
      .split(',')
      .map((item) => Number(item.trim()))
      .filter((item) => Number.isFinite(item))

    return parsed.length > 0 ? parsed : []
  }

  return []
}

export class ListOrderDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page = 1

  @Type(() => Number)
  @IsInt()
  @Min(1)
  pageSize = 10

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  bossId?: number

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  customerId?: number

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @IsIn([1, 2, 3])
  status?: number

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  no?: string

  @IsOptional()
  @Type(() => Number)
  @IsIn([1, 2])
  del?: number
}

export class CreateOrderDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  no?: string

  @IsInt()
  @Type(() => Number)
  @Min(1)
  bossId!: number

  @IsString()
  @IsNotEmpty()
  bossGameNickname!: string

  @IsInt()
  @Type(() => Number)
  @Min(1)
  customerId!: number

  @IsArray()
  @ArrayNotEmpty()
  @Transform(toNumberArray)
  @IsNumber({}, { each: true })
  @Type(() => Number)
  @IsInt({ each: true })
  @Min(1, { each: true })
  categoryIds!: number[]

  @IsArray()
  @Transform(toNumberArray)
  @IsNumber({}, { each: true })
  @Type(() => Number)
  @IsInt({ each: true })
  @Min(1, { each: true })
  userIds!: number[]

  @IsNumber()
  @Type(() => Number)
  @Min(0)
  count = 1

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  remark?: string
}

export class UpdateOrderDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  bossGameNickname?: string

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Min(1)
  customerId?: number

  @IsOptional()
  @IsArray()
  @Transform(toNumberArray)
  @IsNumber({}, { each: true })
  @Type(() => Number)
  @IsInt({ each: true })
  @Min(1, { each: true })
  categoryIds?: number[]

  @IsOptional()
  @IsArray()
  @Transform(toNumberArray)
  @IsNumber({}, { each: true })
  @Type(() => Number)
  @IsInt({ each: true })
  @Min(1, { each: true })
  userIds?: number[]

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(0)
  count?: number

  @IsOptional()
  @IsString()
  feedback?: string

  @IsOptional()
  @IsString()
  remark?: string

  @IsOptional()
  @IsIn([0, 1])
  del?: number
}

export class UpdateOrderStatusDto {
  @Type(() => Number)
  @IsInt()
  @IsIn([1, 2, 3])
  status!: number
}

export class AssignOrderCustomerDto {
  @Type(() => Number)
  @IsInt()
  @IsDefined()
  @Min(1)
  customerId!: number
}
