import { Transform, Type } from 'class-transformer'
import {
  IsArray,
  IsDateString,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Min,
} from 'class-validator'

const trimText = ({ value }: { value: unknown }) => {
  if (typeof value !== 'string') {
    return value
  }

  return value.trim()
}

const normalizePlayerImg = ({ value }: { value: unknown }) => {
  if (Array.isArray(value)) {
    return value.filter((item) => typeof item === 'string' && item.trim().length > 0)
  }

  if (typeof value === 'string') {
    const trimmed = value.trim()
    if (!trimmed) {
      return []
    }

    try {
      const parsed = JSON.parse(trimmed)
      if (Array.isArray(parsed)) {
        return parsed.filter((item) => typeof item === 'string' && item.trim().length > 0)
      }
    } catch {
      return trimmed
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean)
    }
  }

  return []
}

export class ListProjectReportDto {
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
  @Min(1)
  customerId?: number

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  bossId?: number

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  categoryId?: number

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @IsIn([0, 1, 2])
  status?: number

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @IsIn([0, 1, 2])
  payStatus?: number

  @IsOptional()
  @IsString()
  @Length(0, 20)
  @Transform(trimText)
  no?: string
}

export class CreateProjectReportDto {
  @IsOptional()
  @IsString()
  @Length(0, 20)
  @Transform(trimText)
  no?: string

  @Type(() => Number)
  @IsInt()
  @Min(1)
  userId!: number

  @Type(() => Number)
  @IsInt()
  @Min(1)
  customerId!: number

  @Type(() => Number)
  @IsInt()
  @Min(1)
  bossId!: number

  @Type(() => Number)
  @IsInt()
  @Min(1)
  categoryId!: number

  @IsNumber()
  @Type(() => Number)
  @Min(0)
  quantity!: number

  @IsOptional()
  @IsString()
  @Length(0, 20)
  @Transform(trimText)
  type?: string

  @IsOptional()
  @IsString()
  @Length(0, 500)
  @Transform(trimText)
  remark?: string

  @IsOptional()
  @Transform(normalizePlayerImg)
  @IsArray()
  @IsString({ each: true })
  playerImg?: string[]

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @IsIn([0, 1, 2])
  status?: number

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @IsIn([0, 1, 2])
  payStatus?: number

  @IsOptional()
  @IsDateString()
  startTime?: string

  @IsOptional()
  @IsDateString()
  endTime?: string

  @IsOptional()
  @IsString()
  @Length(0, 500)
  @Transform(trimText)
  feedback?: string
}

export class UpdateProjectReportDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  userId?: number

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  customerId?: number

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  bossId?: number

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  categoryId?: number

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(0)
  quantity?: number

  @IsOptional()
  @IsString()
  @Length(1, 20)
  @Transform(trimText)
  type?: string

  @IsOptional()
  @IsString()
  @Length(0, 500)
  @Transform(trimText)
  remark?: string

  @IsOptional()
  @Transform(normalizePlayerImg)
  @IsArray()
  @IsString({ each: true })
  playerImg?: string[]

  @IsOptional()
  @IsDateString()
  startTime?: string

  @IsOptional()
  @IsDateString()
  endTime?: string

  @IsOptional()
  @IsString()
  @Length(0, 500)
  @Transform(trimText)
  feedback?: string
}

export class UpdateProjectReportStatusDto {
  @Type(() => Number)
  @IsInt()
  @IsIn([0, 1, 2])
  status!: number
}

export class UpdateProjectReportPayStatusDto {
  @Type(() => Number)
  @IsInt()
  @IsIn([0, 1, 2])
  payStatus!: number
}
