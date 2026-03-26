# 志多星云管理系统 - 项目文档

## 文档结构

```
docs/
├── DEVELOPMENT.md        # 开发规范（含响应类设计、错误码规范）
├── DATABASE.md          # 数据库设计（含完整字段说明）
├── init-db.sql          # 数据库建表 SQL（含初始数据）
└── chidianjing-admin-dev-doc.md   # 原站功能逆向分析文档
```

## 文档说明

### DEVELOPMENT.md — 开发规范

- 项目技术栈定义
- 代码规范（命名、文件组织）
- **统一响应类设计**（`ResponseDto` / `PaginatedDto`）
- **业务异常类**（`BusinessException`）
- **错误码常量表**（ERROR_CODE_MAP）
- **全局异常过滤器** + **响应拦截器**
- RESTful API 规范
- Git 协作规范
- 环境配置规范

### DATABASE.md — 数据库设计

- 16 张表的完整 ER 关系图
- 每张表的字段定义、类型、约束、索引说明
- 核心字段的业务含义解释
- 关键计算公式（店铺利润、佣金计算）
- 索引设计说明

### init-db.sql — 建表脚本

- 可直接在 MySQL 中执行的完整建表 SQL
- 含初始化数据（菜单、角色、陪玩等级、老板类型、管理员账号）
- 外键约束完整

## 开发顺序建议

1. **Phase 1**：初始化项目 + 数据库
   - 搭建 NestJS 项目骨架
   - 执行 `init-db.sql` 初始化数据库
   - 配置 TypeORM 连接

2. **Phase 2**：基础设施
   - 实现 `ResponseDto` / `PaginatedDto`
   - 实现 `BusinessException` + 全局异常过滤器
   - 实现 JWT 认证守卫
   - 实现登录模块（验证码 + 登录）

3. **Phase 3**：核心业务模块
   - 用户/角色/菜单模块
   - 老板 + 资金流水模块
   - 订单 + 报单模块
   - 提现模块

4. **Phase 4**：数据统计模块
   - 数据看板 API
   - 陪玩数据 API

## 技术栈

| 层级 | 技术 |
|------|------|
| 前端 | Vue 3 + Vite + Element Plus + Pinia + Vue Router |
| 后端 | Node.js + NestJS |
| 数据库 | MySQL 8.0 |
| ORM | TypeORM |
| 认证 | JWT |
