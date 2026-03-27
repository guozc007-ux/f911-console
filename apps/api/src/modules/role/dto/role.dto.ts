import { Transform, Type } from 'class-transformer'
import { IsIn, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Length, Min } from 'class-validator'

export class ListRoleDto {
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

export class CreateRoleDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  name!: string

  @IsOptional()
  @IsString()
  @Length(0, 255)
  remark?: string
}

export class UpdateRoleDto {
  @IsOptional()
  @IsString()
  @Length(1, 50)
  name?: string

  @IsOptional()
  @IsString()
  @Length(0, 255)
  remark?: string

  @IsOptional()
  @IsIn([1, 2])
  del?: number
}

export class AssignMenusToRoleDto {
  @Type(() => Number)
  @IsNumber({}, { each: true })
  @IsInt({ each: true })
  @Min(1, { each: true })
  menuIds!: number[]
}
