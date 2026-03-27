import { Transform, Type } from 'class-transformer'
import {
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

export class ListCategoryDto {
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
  @IsIn([0, 1])
  status?: number

  @IsOptional()
  @IsString()
  @Length(0, 50)
  @Transform(trimText)
  categoryName?: string
}

export class CreateCategoryDto {
  @IsInt()
  @Type(() => Number)
  @Min(0)
  categoryFid!: number

  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  @Transform(trimText)
  categoryName!: string

  @IsString()
  @IsNotEmpty()
  @Length(1, 20)
  @Transform(trimText)
  categoryType!: string

  @IsNumber()
  @Type(() => Number)
  @Min(0)
  categoryPrice!: number

  @IsNumber()
  @Type(() => Number)
  @Min(0)
  commissionRate!: number

  @Type(() => Number)
  @IsInt()
  @Min(0)
  categorySort!: number

  @IsString()
  @Length(0, 500)
  @Transform(trimText)
  categoryRemark!: string

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @IsIn([0, 1])
  status?: number
}

export class UpdateCategoryDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  categoryFid?: number

  @IsOptional()
  @IsString()
  @Length(1, 100)
  @Transform(trimText)
  categoryName?: string

  @IsOptional()
  @IsString()
  @Length(1, 20)
  @Transform(trimText)
  categoryType?: string

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(0)
  categoryPrice?: number

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(0)
  commissionRate?: number

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  categorySort?: number

  @IsOptional()
  @IsString()
  @Length(0, 500)
  @Transform(trimText)
  categoryRemark?: string

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @IsIn([0, 1])
  status?: number
}
