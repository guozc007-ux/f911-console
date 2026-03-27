import { Transform, Type } from 'class-transformer'
import { IsIn, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator'

const trimText = ({ value }: { value: unknown }) => {
  if (typeof value !== 'string') {
    return value
  }

  return value.trim()
}

export class ListBossDto {
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
  @Min(0)
  sex?: number

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @IsIn([0, 1])
  status?: number

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  bossTypeId?: number

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  referrer?: number

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Transform(trimText)
  keyword?: string
}

export class CreateBossDto {
  @IsString()
  @IsNotEmpty()
  @Transform(trimText)
  nickname!: string

  @IsString()
  @IsNotEmpty()
  @Transform(trimText)
  code!: string

  @Type(() => Number)
  @IsInt()
  sex!: number

  @IsString()
  @IsNotEmpty()
  @Transform(trimText)
  phone!: string

  @IsString()
  @IsNotEmpty()
  @Transform(trimText)
  wx!: string

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  referrer?: number

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(0)
  referrerCommission?: number

  @Type(() => Number)
  @IsInt()
  @Min(1)
  bossTypeId!: number

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @IsIn([0, 1])
  status?: number
}

export class UpdateBossDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Transform(trimText)
  nickname?: string

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Transform(trimText)
  code?: string

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  sex?: number

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Transform(trimText)
  phone?: string

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Transform(trimText)
  wx?: string

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  referrer?: number

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(0)
  referrerCommission?: number

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  bossTypeId?: number

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @IsIn([0, 1])
  status?: number
}
