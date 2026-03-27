import { Transform, Type } from 'class-transformer'
import { IsIn, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Length, Min } from 'class-validator'

const trimText = ({ value }: { value: unknown }) => {
  if (typeof value !== 'string') {
    return value
  }

  return value.trim()
}

export class ListApplyDto {
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
  userId?: number

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @IsIn([0, 1, 2])
  checkStatus?: number

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @IsIn([0, 1, 2])
  remit?: number

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @IsIn([0, 1])
  status?: number

  @IsOptional()
  @IsString()
  @Length(0, 100)
  @Transform(trimText)
  keyword?: string
}

export class CreateApplyDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  userId!: number

  @IsNumber()
  @Type(() => Number)
  @Min(0)
  money!: number

  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  @Transform(trimText)
  alipayAccount!: string

  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  @Transform(trimText)
  alipayName!: string

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @IsIn([0, 1])
  status?: number
}

export class UpdateApplyDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  userId?: number

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(0)
  money?: number

  @IsOptional()
  @IsString()
  @Length(1, 100)
  @Transform(trimText)
  alipayAccount?: string

  @IsOptional()
  @IsString()
  @Length(1, 50)
  @Transform(trimText)
  alipayName?: string

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @IsIn([0, 1])
  status?: number
}

export class UpdateApplyCheckDto {
  @Type(() => Number)
  @IsInt()
  @IsIn([1, 2])
  checkStatus!: number

  @IsOptional()
  @IsString()
  @Length(0, 500)
  @Transform(trimText)
  checkRemark?: string

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  checkOperatorId?: number
}

export class UpdateApplyRemitDto {
  @Type(() => Number)
  @IsInt()
  @IsIn([1, 2])
  remit!: number

  @IsOptional()
  @IsString()
  @Length(0, 500)
  @Transform(trimText)
  remitRemark?: string
}
