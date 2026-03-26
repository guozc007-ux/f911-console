# 志多星云管理系统 - 项目开发规范

> 文档版本：v1.0
> 创建日期：2026-03-26
> 项目名称：ycyt-admin（志多星云管理系统）

---

## 一、项目概述

### 1.1 项目背景
陪玩平台管理系统，用于管理老板（客户）、陪玩（服务者）、客服（派单员）三方之间的订单、结算和提现业务。

### 1.2 技术栈

| 层级 | 技术 | 说明 |
|------|------|------|
| 前端 | Vue 3 + Vite + Element Plus + Pinia + Vue Router | SPA 管理后台 |
| 后端 | Node.js 20+ / NestJS 10+ | RESTful API |
| 数据库 | MySQL 8.0 | 关系型数据库 |
| ORM | TypeORM / Prisma | 二选一，推荐 TypeORM |
| 认证 | JWT | Bearer Token |
| 部署 | Docker | 容器化部署 |

### 1.3 项目仓库结构

```
ycyt-admin/
├── apps/
│   ├── api/                    # 后端 NestJS 项目
│   │   └── src/
│   │       ├── common/         # 公共模块
│   │       │   ├── decorators/ # 自定义装饰器
│   │       │   ├── filters/    # 全局异常过滤器
│   │       │   ├── guards/     # 认证守卫
│   │       │   ├── interceptors/ # 响应拦截器
│   │       │   └── utils/      # 工具函数
│   │       ├── config/         # 配置文件
│   │       │   ├── database.config.ts
│   │       │   ├── jwt.config.ts
│   │       │   └── app.config.ts
│   │       ├── modules/        # 业务模块
│   │       │   ├── auth/
│   │       │   ├── user/
│   │       │   ├── boss/
│   │       │   ├── order/
│   │       │   ├── project-report/
│   │       │   ├── category/
│   │       │   ├── apply/
│   │       │   ├── role/
│   │       │   └── data-panel/
│   │       ├── dto/            # 数据传输对象（按模块组织）
│   │       │   ├── auth/
│   │       │   ├── user/
│   │       │   ├── boss/
│   │       │   ├── order/
│   │       │   ├── project-report/
│   │       │   ├── category/
│   │       │   ├── apply/
│   │       │   ├── role/
│   │       │   └── data-panel/
│   │       ├── entities/       # TypeORM 实体（按模块组织）
│   │       │   ├── user.entity.ts
│   │       │   ├── boss.entity.ts
│   │       │   ├── order.entity.ts
│   │       │   ├── project-report.entity.ts
│   │       │   ├── category.entity.ts
│   │       │   ├── apply.entity.ts
│   │       │   ├── boss-type.entity.ts
│   │       │   ├── player-level.entity.ts
│   │       │   ├── role.entity.ts
│   │       │   ├── menu.entity.ts
│   │       │   ├── fund-flow.entity.ts
│   │       │   ├── reward-penalty.entity.ts
│   │       │   └── index.ts
│   │       ├── responses/      # 统一响应类
│   │       │   └── index.ts
│   │       ├── constants/      # 常量定义
│   │       │   ├── error-code.ts
│   │       │   ├── role-type.ts
│   │       │   └── status.ts
│   │       └── app.module.ts
│   │
│   └── web/                   # 前端 Vue 3 项目
│       └── src/
│           ├── api/           # API 请求层（按模块组织）
│           ├── components/    # 公共组件
│           ├── composables/   # 组合式函数
│           ├── layouts/       # 布局组件
│           ├── router/       # 路由配置
│           ├── stores/       # Pinia 状态管理
│           ├── styles/       # 全局样式
│           ├── utils/        # 工具函数
│           └── views/        # 页面视图（按模块组织）
│               ├── auth/
│               ├── data-board/
│               ├── player-information/
│               ├── consume-list/
│               ├── boss-list/
│               ├── recharge-list/
│               ├── player-list/
│               ├── order-list/
│               ├── bill-audit/
│               ├── withdraw-audit/
│               ├── boss-type/
│               ├── game-category/
│               ├── order-customer/
│               └── role-list/
│
├── packages/
│   └── shared/               # 前后端共享类型定义
│       ├── types/
│       └── constants/
│
├── scripts/                  # 脚本
│   └── init-db.sql
│
├── docker/
│   ├── api.Dockerfile
│   └── web.Dockerfile
│
├── .env.example
├── docker-compose.yml
├── package.json
└── README.md
```

---

## 二、代码规范

### 2.1 通用规范

- **缩进**：2 空格（禁止 Tab）
- **分号**：禁止尾部加分号
- **引号**：双引号包裹字符串
- **命名**：采用 camelCase（变量/函数）、PascalCase（类/组件/类型/文件）
- **文件后缀**：
  - 实体：`*.entity.ts`
  - DTO：`*.dto.ts`
  - 服务：`*.service.ts`
  - 控制器：`*.controller.ts`
  - 模块：`*.module.ts`
  - 守卫：`*.guard.ts`
  - 拦截器：`*.interceptor.ts`
  - 过滤器：`*.filter.ts`
  - 装饰器：`*.decorator.ts`
- **注释**：使用 JSDoc 风格，重要逻辑必须注释
- **控制台**：`console.log` 禁止在生产代码中使用，使用 `Logger` 服务替代

### 2.2 后端规范

#### 2.2.1 模块划分规则

每个业务模块必须包含以下 4 个文件：

```
xxx.module.ts   # 模块定义
xxx.controller.ts  # 路由 + 参数校验
xxx.service.ts   # 业务逻辑
xxx.entity.ts    # 数据库实体

# 如有需要再增加：
xxx.dto.ts      # DTO（多个相关 DTO 可合并为一个文件）
xxx.guard.ts    # 守卫
```

#### 2.2.2 控制器规范

```typescript
// ✅ 正确示例
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // GET /users?page=1&pageSize=10&role=1
  @Get()
  async list(@Query() query: ListUserDto) {
    return ResponseDto.ok(
      await this.userService.findPaginated(query),
    );
  }

  // GET /users/:id
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return ResponseDto.ok(
      await this.userService.findById(id),
    );
  }

  // POST /users
  @Post()
  async create(@Body() dto: CreateUserDto) {
    return ResponseDto.ok(
      await this.userService.create(dto),
    );
  }

  // PATCH /users/:id
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateUserDto,
  ) {
    return ResponseDto.ok(
      await this.userService.update(id, dto),
    );
  }

  // DELETE /users/:id
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.userService.remove(id);
    return ResponseDto.ok(null);
  }
}
```

#### 2.2.3 服务规范

```typescript
// ✅ 正确示例
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
  ) {}

  async findPaginated(query: ListUserDto): Promise<PaginatedDto<User>> {
    const { page = 1, pageSize = 10, role } = query;
    const [data, total] = await this.repo.findAndCount({
      where: role ? { role } : undefined,
      skip: (page - 1) * pageSize,
      take: pageSize,
      order: { createdAt: 'DESC' },
    });
    return PaginatedDto.of(data, total, page, pageSize);
  }

  async findById(id: number): Promise<User> {
    const user = await this.repo.findOne({ where: { id } });
    if (!user) {
      throw new BusinessException(ErrorCode.USER_NOT_FOUND);
    }
    return user;
  }
}
```

#### 2.2.4 禁止事项

- ❌ 禁止在 Controller 中写业务逻辑
- ❌ 禁止在 Service 中直接抛出字符串错误，必须使用 `BusinessException` + 错误码
- ❌ 禁止使用 `any` 类型
- ❌ 禁止在代码中硬编码字符串（错误信息、状态值等），统一使用常量
- ❌ 禁止使用 `SELECT *`，必须明确指定字段

---

## 三、统一响应规范

### 3.1 响应类设计

所有 API 响应必须通过 `ResponseDto` 包装，不允许直接返回裸对象。

#### 3.1.1 响应基类

```typescript
// responses/index.ts

/**
 * 统一响应状态码
 */
export enum ResponseCode {
  SUCCESS = 200,          // 成功
  BAD_REQUEST = 400,      // 参数错误
  UNAUTHORIZED = 401,     // 未认证
  FORBIDDEN = 403,        // 无权限
  NOT_FOUND = 404,        // 资源不存在
  SERVER_ERROR = 500,     // 服务器错误
}

/**
 * 业务错误码（详细定义见 error-code.ts）
 */
export enum BusinessCode {
  // 系统级
  SUCCESS = 200,
  PARAM_ERROR = 4001,
  UNAUTHORIZED = 4002,
  TOKEN_EXPIRED = 4003,
  TOKEN_INVALID = 4004,
  FORBIDDEN = 4005,

  // 验证码
  CAPTCHA_REQUIRED = 4101,
  CAPTCHA_ERROR = 4102,
  CAPTCHA_EXPIRED = 4103,

  // 用户相关 4201-4299
  USER_NOT_FOUND = 4201,
  USER_DISABLED = 4202,
  USER_EXISTS = 4203,

  // 老板相关 4301-4399
  BOSS_NOT_FOUND = 4301,

  // 订单相关 4401-4499
  ORDER_NOT_FOUND = 4401,

  // 报单相关 4501-4599
  REPORT_NOT_FOUND = 4501,
  REPORT_ALREADY_PROCESSED = 4502,

  // 提现相关 4601-4699
  APPLY_NOT_FOUND = 4601,
  INSUFFICIENT_BALANCE = 4602,

  // 分类相关 4701-4799
  CATEGORY_NOT_FOUND = 4701,

  // 角色相关 4801-4899
  ROLE_NOT_FOUND = 4801,
}

/**
 * 统一响应 DTO
 */
export class ResponseDto<T = any> {
  code: number;    // 业务状态码（用于前端判断）
  msg: string;     // 消息
  data: T;         // 数据

  private constructor(code: number, msg: string, data: T) {
    this.code = code;
    this.msg = msg;
    this.data = data;
  }

  /**
   * 成功响应
   */
  static ok<T>(data: T, msg = '操作成功'): ResponseDto<T> {
    return new ResponseDto(BusinessCode.SUCCESS, msg, data);
  }

  /**
   * 失败响应
   */
  static fail(code: number, msg: string): ResponseDto<null> {
    return new ResponseDto(code, msg, null);
  }

  /**
   * 参数错误
   */
  static paramError(msg = '参数错误'): ResponseDto<null> {
    return new ResponseDto(BusinessCode.PARAM_ERROR, msg, null);
  }

  /**
   * 未认证
   */
  static unauthorized(msg = '未登录或登录已过期'): ResponseDto<null> {
    return new ResponseDto(BusinessCode.UNAUTHORIZED, msg, null);
  }

  /**
   * 无权限
   */
  static forbidden(msg = '无权限操作'): ResponseDto<null> {
    return new ResponseDto(BusinessCode.FORBIDDEN, msg, null);
  }

  /**
   * 服务器错误
   */
  static serverError(msg = '服务器内部错误'): ResponseDto<null> {
    return new ResponseDto(ResponseCode.SERVER_ERROR, msg, null);
  }
}

/**
 * 分页响应 DTO
 */
export class PaginatedDto<T> {
  data: T[];       // 数据列表
  total: number;   // 总数
  page: number;     // 当前页
  pageSize: number; // 每页条数
  pageCount: number; // 总页数

  constructor(data: T[], total: number, page: number, pageSize: number) {
    this.data = data;
    this.total = total;
    this.page = page;
    this.pageSize = pageSize;
    this.pageCount = Math.ceil(total / pageSize);
  }

  static of<T>(
    data: T[],
    total: number,
    page: number,
    pageSize: number,
  ): PaginatedDto<T> {
    return new PaginatedDto(data, total, page, pageSize);
  }
}
```

#### 3.1.2 错误码常量

```typescript
// constants/error-code.ts

import { BusinessCode } from '../responses';

export interface ErrorDefinition {
  code: BusinessCode;
  message: string;
  httpStatus: number;
}

/**
 * 错误码定义表
 * 格式：{ code: [错误信息, HTTP状态码] }
 */
export const ERROR_CODE_MAP: Record<BusinessCode, ErrorDefinition> = {
  [BusinessCode.SUCCESS]: {
    code: BusinessCode.SUCCESS,
    message: '操作成功',
    httpStatus: 200,
  },
  [BusinessCode.PARAM_ERROR]: {
    code: BusinessCode.PARAM_ERROR,
    message: '参数错误',
    httpStatus: 400,
  },
  [BusinessCode.UNAUTHORIZED]: {
    code: BusinessCode.UNAUTHORIZED,
    message: '未登录或登录已过期',
    httpStatus: 401,
  },
  [BusinessCode.TOKEN_EXPIRED]: {
    code: BusinessCode.TOKEN_EXPIRED,
    message: '登录已过期，请重新登录',
    httpStatus: 401,
  },
  [BusinessCode.TOKEN_INVALID]: {
    code: BusinessCode.TOKEN_INVALID,
    message: '登录凭证无效',
    httpStatus: 401,
  },
  [BusinessCode.FORBIDDEN]: {
    code: BusinessCode.FORBIDDEN,
    message: '无权限操作',
    httpStatus: 403,
  },

  // 验证码 4101-4199
  [BusinessCode.CAPTCHA_REQUIRED]: {
    code: BusinessCode.CAPTCHA_REQUIRED,
    message: '请输入验证码',
    httpStatus: 400,
  },
  [BusinessCode.CAPTCHA_ERROR]: {
    code: BusinessCode.CAPTCHA_ERROR,
    message: '验证码错误',
    httpStatus: 400,
  },
  [BusinessCode.CAPTCHA_EXPIRED]: {
    code: BusinessCode.CAPTCHA_EXPIRED,
    message: '验证码已过期，请重新获取',
    httpStatus: 400,
  },

  // 用户相关 4201-4299
  [BusinessCode.USER_NOT_FOUND]: {
    code: BusinessCode.USER_NOT_FOUND,
    message: '用户不存在',
    httpStatus: 404,
  },
  [BusinessCode.USER_DISABLED]: {
    code: BusinessCode.USER_DISABLED,
    message: '账号已被禁用',
    httpStatus: 403,
  },
  [BusinessCode.USER_EXISTS]: {
    code: BusinessCode.USER_EXISTS,
    message: '用户已存在',
    httpStatus: 409,
  },

  // 老板相关 4301-4399
  [BusinessCode.BOSS_NOT_FOUND]: {
    code: BusinessCode.BOSS_NOT_FOUND,
    message: '老板不存在',
    httpStatus: 404,
  },

  // 订单相关 4401-4499
  [BusinessCode.ORDER_NOT_FOUND]: {
    code: BusinessCode.ORDER_NOT_FOUND,
    message: '订单不存在',
    httpStatus: 404,
  },

  // 报单相关 4501-4599
  [BusinessCode.REPORT_NOT_FOUND]: {
    code: BusinessCode.REPORT_NOT_FOUND,
    message: '报单不存在',
    httpStatus: 404,
  },
  [BusinessCode.REPORT_ALREADY_PROCESSED]: {
    code: BusinessCode.REPORT_ALREADY_PROCESSED,
    message: '报单已处理，请勿重复操作',
    httpStatus: 400,
  },

  // 提现相关 4601-4699
  [BusinessCode.APPLY_NOT_FOUND]: {
    code: BusinessCode.APPLY_NOT_FOUND,
    message: '提现申请不存在',
    httpStatus: 404,
  },
  [BusinessCode.INSUFFICIENT_BALANCE]: {
    code: BusinessCode.INSUFFICIENT_BALANCE,
    message: '余额不足',
    httpStatus: 400,
  },

  // 分类相关 4701-4799
  [BusinessCode.CATEGORY_NOT_FOUND]: {
    code: BusinessCode.CATEGORY_NOT_FOUND,
    message: '分类不存在',
    httpStatus: 404,
  },

  // 角色相关 4801-4899
  [BusinessCode.ROLE_NOT_FOUND]: {
    code: BusinessCode.ROLE_NOT_FOUND,
    message: '角色不存在',
    httpStatus: 404,
  },
};
```

#### 3.1.3 业务异常类

```typescript
// common/filters/business.exception.ts

import { BusinessCode } from '../../responses';
import { ERROR_CODE_MAP } from '../../constants/error-code';

export class BusinessException extends Error {
  readonly code: BusinessCode;
  readonly httpStatus: number;

  constructor(code: BusinessCode, customMessage?: string) {
    const def = ERROR_CODE_MAP[code];
    super(customMessage || def.message);
    this.code = code;
    this.httpStatus = def.httpStatus;
  }
}
```

#### 3.1.4 全局异常过滤器

```typescript
// common/filters/global-exception.filter.ts

import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';
import { BusinessException } from './business.exception';
import { ResponseDto, ResponseCode } from '../../responses';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let dto: ResponseDto<null>;

    if (exception instanceof BusinessException) {
      // 业务异常
      dto = ResponseDto.fail(exception.code, exception.message);
      response.status(exception.httpStatus);
    } else if (exception instanceof HttpException) {
      // NestJS 内置异常
      const status = exception.getStatus();
      const msg = exception.getResponse() as string;
      dto = ResponseDto.fail(
        status === 400 ? ResponseCode.BAD_REQUEST : status,
        msg,
      );
      response.status(status);
    } else {
      // 未知异常
      this.logger.error('Unknown error', exception);
      dto = ResponseDto.serverError();
      response.status(HttpStatus.INTERNAL_SERVER_ERROR);
    }

    response.json(dto);
  }
}
```

#### 3.1.5 响应拦截器（统一数据包装）

```typescript
// common/interceptors/response.interceptor.ts

import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResponseDto } from '../../responses';

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, ResponseDto<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ResponseDto<T>> {
    return next.handle().pipe(
      map((data) => {
        // 如果已经是 ResponseDto，直接返回
        if (data instanceof ResponseDto) {
          return data;
        }
        // 否则自动包装
        return ResponseDto.ok(data);
      }),
    );
  }
}
```

---

## 四、数据库设计规范

### 4.1 命名规范

- **数据库名**：`ycyt_admin`
- **表名**：全小写，下划线分隔，单数名词
  - `user` / `boss` / `order` / `project_report` / `category`
- **字段名**：全小写，下划线分隔
  - `user_id` / `created_at` / `nick_name`
- **索引名**：`idx_{表名}_{字段名}`
  - `idx_user_role`
- **唯一索引**：`uk_{表名}_{字段名}`
  - `uk_user_account`
- **外键名**：`fk_{表名}_{关联表名}`
  - `fk_order_boss`

### 4.2 字段规范

- **ID**：统一使用 `BIGINT UNSIGNED AUTO_INCREMENT`，主键
- **时间**：创建时间用 `created_at (datetime)`，更新时间用 `updated_at (datetime)`
- **软删除**：使用 `deleted_at (datetime)` 而非 `is_deleted` 布尔值
- **金额**：统一使用 `DECIMAL(10, 2)`，禁止使用 FLOAT/DOUBLE
- **状态**：使用 `TINYINT`，0=禁用/删除，1=正常/启用
- **字符串**：
  - 固定长度用 `CHAR`（如性别 code）
  - 不固定长度用 `VARCHAR`
  - 超长文本用 `TEXT`
- **JSON**：使用 `JSON` 类型（如 `user_id` 数组存储为 JSON）

### 4.3 索引规范

- 主键自动创建索引
- 外键字段必须建立索引
- WHERE 条件常用字段必须建立索引
- 联合索引注意字段顺序（区分度高的放前面）
- 禁止在索引列上使用函数或表达式

### 4.4 详见数据库设计文档

> **完整建表 SQL 及字段说明请参考 `DATABASE.md`**

---

## 五、API 设计规范

### 5.1 RESTful 风格

| 操作 | 方法 | URL | 说明 |
|------|------|------|------|
| 列表 | `GET` | `/users` | 分页列表 |
| 详情 | `GET` | `/users/:id` | 获取单个 |
| 新增 | `POST` | `/users` | 创建资源 |
| 更新 | `PUT` | `/users/:id` | 全量更新 |
| 部分更新 | `PATCH` | `/users/:id` | 部分更新 |
| 删除 | `DELETE` | `/users/:id` | 删除资源 |

### 5.2 请求头

```
Content-Type: application/json
Authorization: Bearer {jwt_token}
platform: admin
```

### 5.3 分页参数

```
GET /users?page=1&pageSize=10
```

### 5.4 统一响应格式

```typescript
// 成功
{
  "code": 200,
  "msg": "操作成功",
  "data": { ... }
}

// 列表
{
  "code": 200,
  "msg": "操作成功",
  "data": {
    "data": [...],
    "total": 100,
    "page": 1,
    "pageSize": 10,
    "pageCount": 10
  }
}

// 失败
{
  "code": 4201,
  "msg": "用户不存在",
  "data": null
}
```

---

## 六、Git 协作规范

### 6.1 分支命名

```
main           # 主分支（生产环境）
develop        # 开发分支
feature/xxx   # 功能分支
fix/xxx       # 修复分支
```

### 6.2 Commit 规范

```
<type>(<scope>): <subject>

feat(user): 添加用户登录功能
fix(order): 修复订单状态更新异常
docs(readme): 更新 README
style(auth): 格式化登录代码
refactor(report): 重构报单查询逻辑
test(boss): 添加老板模块单元测试
```

### 6.3 PR 规范

- 所有功能通过 PR 合并到 `develop`
- PR 必须经过 Code Review
- PR 描述必须包含：功能说明、测试截图、影响范围

---

## 七、环境配置规范

### 7.1 环境划分

| 环境 | 用途 | 数据库 |
|------|------|--------|
| development | 本地开发 | 本地 MySQL |
| staging | 预发布测试 | 测试服务器 |
| production | 线上生产 | 线上服务器 |

### 7.2 配置管理

敏感配置（数据库密码、密钥等）通过环境变量注入，禁止提交到代码仓库。

```bash
# .env.example
NODE_ENV=development
PORT=3000

# 数据库
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=ycyt_admin
DB_USERNAME=root
DB_PASSWORD=

# JWT
JWT_SECRET=
JWT_EXPIRES_IN=365d

# 验证码
CAPTCHA_EXPIRE_SECONDS=120

# App
APP_PLATFORM=admin
```

---

*本规范为项目开发标准，所有参与者必须严格遵守。*
