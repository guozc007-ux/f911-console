import { Transform, Type } from 'class-transformer'
import { IsIn, IsInt, IsNotEmpty, IsOptional, IsString, Length, Min } from 'class-validator'

export class ListUserDto {
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
  role?: number

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @IsIn([0, 1])
  status?: number

  @IsOptional()
  @IsString()
  @Length(0, 50)
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  keyword?: string
}

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  account!: string

  @IsString()
  @IsNotEmpty()
  @Length(6, 50)
  password!: string

  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  nickname!: string

  @IsString()
  @IsNotEmpty()
  @Length(1, 10)
  code!: string

  @Type(() => Number)
  @IsInt()
  sex!: number

  @IsString()
  @IsNotEmpty()
  @Length(1, 20)
  phone!: string

  @Type(() => Number)
  @IsInt()
  role!: number

  @Type(() => Number)
  @IsInt()
  playerLevelId = 0

  @IsOptional()
  @IsString()
  @Length(0, 100)
  avatar?: string

  @IsOptional()
  @IsString()
  @Length(0, 100)
  zfb?: string

  @IsOptional()
  @IsString()
  @Length(0, 50)
  name?: string

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  status?: number

  @IsOptional()
  @IsString()
  @Length(0, 500)
  remark?: string
}

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @Length(1, 50)
  account?: string

  @IsOptional()
  @IsString()
  @Length(1, 50)
  nickname?: string

  @IsOptional()
  @IsString()
  @Length(1, 10)
  code?: string

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  sex?: number

  @IsOptional()
  @IsString()
  @Length(1, 20)
  phone?: string

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  role?: number

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  playerLevelId?: number

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  status?: number

  @IsOptional()
  @IsString()
  @Length(0, 500)
  remark?: string

  @IsOptional()
  @IsString()
  @Length(0, 100)
  avatar?: string

  @IsOptional()
  @IsString()
  @Length(0, 100)
  zfb?: string

  @IsOptional()
  @IsString()
  @Length(0, 50)
  name?: string

}

export class UpdateUserStatusDto {
  @Type(() => Number)
  @IsInt()
  @IsIn([0, 1])
  status!: number
}
