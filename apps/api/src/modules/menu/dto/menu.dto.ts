import { Transform } from 'class-transformer'
import { IsIn, IsInt, IsNotEmpty, IsOptional, IsString, Length, Min } from 'class-validator'
import { Type } from 'class-transformer'

export class ListMenuDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page = 1

  @Type(() => Number)
  @IsInt()
  @Min(1)
  pageSize = 10

  @IsOptional()
  @IsString()
  @Length(0, 50)
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  keyword?: string
}

export class CreateMenuDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  name!: string

  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  url!: string

  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  icon!: string

  @Type(() => Number)
  @IsInt()
  sort = 0

  @Type(() => Number)
  @IsInt()
  @Min(0)
  parentId = 0
}

export class UpdateMenuDto {
  @IsOptional()
  @IsString()
  @Length(1, 50)
  name?: string

  @IsOptional()
  @IsString()
  @Length(1, 100)
  url?: string

  @IsOptional()
  @IsString()
  @Length(1, 50)
  icon?: string

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  sort?: number

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  parentId?: number

  @IsOptional()
  @Type(() => Number)
  @IsIn([0, 1])
  status?: number
}
