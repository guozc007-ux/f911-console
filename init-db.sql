-- ============================================================
-- 志多星云管理系统 数据库初始化脚本
-- 版本：v1.0
-- 日期：2026-03-26
-- 数据库名：ycyt_admin
-- ============================================================

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;
DROP DATABASE IF EXISTS `ycyt_admin`;
CREATE DATABASE `ycyt_admin` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `ycyt_admin`;

-- ============================================================
-- 1. 菜单表
-- ============================================================
CREATE TABLE `menu` (
  `menu_id`        BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '菜单ID',
  `name`           VARCHAR(50)     NOT NULL DEFAULT ''          COMMENT '菜单名称',
  `url`            VARCHAR(100)    NOT NULL DEFAULT ''          COMMENT '路由路径',
  `icon`           VARCHAR(50)     NOT NULL DEFAULT ''          COMMENT '图标名称',
  `sort`           INT             NOT NULL DEFAULT 0          COMMENT '排序',
  `parent_id`      BIGINT UNSIGNED NOT NULL DEFAULT 0          COMMENT '父菜单ID，0=顶级',
  `status`         TINYINT         NOT NULL DEFAULT 1           COMMENT '状态：0=禁用，1=启用',
  `created_at`     DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at`     DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `deleted_at`     DATETIME        NULL                          COMMENT '删除时间（软删除）',
  PRIMARY KEY (`menu_id`),
  KEY `idx_menu_url`         (`url`),
  KEY `idx_menu_parent_id`   (`parent_id`),
  KEY `idx_menu_status`      (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='菜单表';

-- ============================================================
-- 2. 角色表
-- ============================================================
CREATE TABLE `role` (
  `role_id`        BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '角色ID',
  `name`           VARCHAR(50)     NOT NULL DEFAULT ''          COMMENT '角色名称',
  `del`            TINYINT         NOT NULL DEFAULT 1           COMMENT '是否可删除：1=可删除，2=不可删除（系统内置）',
  `remark`         VARCHAR(255)    NOT NULL DEFAULT ''          COMMENT '备注',
  `created_at`     DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at`     DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `deleted_at`     DATETIME        NULL                          COMMENT '删除时间',
  PRIMARY KEY (`role_id`),
  KEY `idx_role_name`        (`name`),
  KEY `idx_role_del`         (`del`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='角色表';

-- ============================================================
-- 3. 角色-菜单关联表
-- ============================================================
CREATE TABLE `role_menu` (
  `role_id`        BIGINT UNSIGNED NOT NULL COMMENT '角色ID',
  `menu_id`        BIGINT UNSIGNED NOT NULL COMMENT '菜单ID',
  `created_at`     DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`role_id`, `menu_id`),
  KEY `idx_role_menu_role_id`  (`role_id`),
  KEY `idx_role_menu_menu_id`  (`menu_id`),
  CONSTRAINT `fk_role_menu_role`  FOREIGN KEY (`role_id`)  REFERENCES `menu`  (`menu_id`)  ON DELETE CASCADE,
  CONSTRAINT `fk_role_menu_menu`  FOREIGN KEY (`menu_id`)  REFERENCES `role`  (`role_id`)  ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='角色菜单关联表';

-- ============================================================
-- 4. 用户表（陪玩/客服/管理员共用）
-- ============================================================
CREATE TABLE `user` (
  `user_id`          BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '用户ID',
  `account`          VARCHAR(50)      NOT NULL DEFAULT ''      COMMENT '账号（登录名）',
  `password`         VARCHAR(255)     NOT NULL DEFAULT ''      COMMENT '密码（bcrypt加密）',
  `nickname`         VARCHAR(50)      NOT NULL DEFAULT ''      COMMENT '昵称',
  `code`             CHAR(10)         NOT NULL DEFAULT ''      COMMENT '邀请码（如 AU916）',
  `sex`              TINYINT          NOT NULL DEFAULT 0       COMMENT '性别：0=未设置，1=男，2=女',
  `phone`            VARCHAR(20)      NOT NULL DEFAULT ''      COMMENT '手机号',
  `avatar`           VARCHAR(255)     NOT NULL DEFAULT ''      COMMENT '头像URL',
  `role`             TINYINT          NOT NULL DEFAULT 1       COMMENT '角色：1=陪玩，2=客服，6=管理员/股东',
  `player_level_id`  BIGINT UNSIGNED  NOT NULL DEFAULT 0       COMMENT '陪玩等级ID',
  `zfb`              VARCHAR(100)     NOT NULL DEFAULT ''      COMMENT '支付宝账号',
  `name`             VARCHAR(50)      NOT NULL DEFAULT ''      COMMENT '真实姓名',
  `deposit`          DECIMAL(10,2)   NOT NULL DEFAULT 0.00   COMMENT '押金金额',
  `deposit_pay`      DECIMAL(10,2)   NOT NULL DEFAULT 0.00   COMMENT '已支付押金',
  `project_hypothecate` TINYINT       NOT NULL DEFAULT 0       COMMENT '项目担保：0=未担保，1=已担保',
  `freeze_hours`     INT              NOT NULL DEFAULT 0       COMMENT '冻结小时数',
  `status`           TINYINT          NOT NULL DEFAULT 1       COMMENT '状态：0=禁用，1=正常',
  `remark`           VARCHAR(500)     NOT NULL DEFAULT ''      COMMENT '备注',
  `project_accept_time` BIGINT        NOT NULL DEFAULT 0       COMMENT '项目接单时间戳',
  `created_at`       DATETIME         NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at`       DATETIME         NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `deleted_at`       DATETIME         NULL                    COMMENT '删除时间',
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `uk_user_account`     (`account`),
  UNIQUE KEY `uk_user_code`        (`code`),
  UNIQUE KEY `uk_user_phone`       (`phone`),
  KEY `idx_user_role`          (`role`),
  KEY `idx_user_status`        (`status`),
  KEY `idx_user_player_level`  (`player_level_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='用户表（陪玩/客服/管理员）';

-- ============================================================
-- 5. 陪玩等级表
-- ============================================================
CREATE TABLE `player_level` (
  `player_level_id`  BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '等级ID',
  `name`             VARCHAR(50)      NOT NULL DEFAULT ''      COMMENT '等级名称（如 A/B/C）',
  `percent`          DECIMAL(5,2)    NOT NULL DEFAULT 0.00   COMMENT '收入加成比例（%）',
  `sort`             INT              NOT NULL DEFAULT 0       COMMENT '排序，数字越小排越前',
  `status`           TINYINT          NOT NULL DEFAULT 1       COMMENT '状态：0=禁用，1=启用',
  `created_at`       DATETIME         NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at`       DATETIME         NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `deleted_at`       DATETIME         NULL                    COMMENT '删除时间',
  PRIMARY KEY (`player_level_id`),
  KEY `idx_player_level_status`  (`status`),
  KEY `idx_player_level_sort`    (`sort`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='陪玩等级表';

-- ============================================================
-- 6. 陪玩奖惩记录表
-- ============================================================
CREATE TABLE `reward_penalty` (
  `id`               BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '记录ID',
  `user_id`          BIGINT UNSIGNED NOT NULL COMMENT '陪玩用户ID',
  `type`             TINYINT         NOT NULL COMMENT '类型：1=奖励，2=惩罚',
  `amount`           DECIMAL(10,2)   NOT NULL DEFAULT 0.00   COMMENT '金额',
  `remark`           VARCHAR(500)    NOT NULL DEFAULT ''    COMMENT '原因/备注',
  `operator_id`      BIGINT UNSIGNED NOT NULL COMMENT '操作人ID',
  `created_at`       DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`),
  KEY `idx_reward_penalty_user_id`  (`user_id`),
  KEY `idx_reward_penalty_type`     (`type`),
  KEY `idx_reward_penalty_created`  (`created_at`),
  CONSTRAINT `fk_reward_penalty_user`     FOREIGN KEY (`user_id`)    REFERENCES `user`      (`user_id`)    ON DELETE RESTRICT,
  CONSTRAINT `fk_reward_penalty_operator` FOREIGN KEY (`operator_id`) REFERENCES `user`      (`user_id`)    ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='陪玩奖惩记录表';

-- ============================================================
-- 7. 老板类型表
-- ============================================================
CREATE TABLE `boss_type` (
  `boss_type_id`   BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '类型ID',
  `name`           VARCHAR(50)      NOT NULL DEFAULT ''      COMMENT '类型名称（如 vip1 / 散户）',
  `percent`        DECIMAL(5,2)    NOT NULL DEFAULT 0.00   COMMENT '推荐人佣金比例（%）',
  `sort`           INT              NOT NULL DEFAULT 0       COMMENT '排序',
  `status`         TINYINT          NOT NULL DEFAULT 1       COMMENT '状态：0=禁用，1=启用',
  `created_at`     DATETIME         NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at`     DATETIME         NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `deleted_at`     DATETIME         NULL                    COMMENT '删除时间',
  PRIMARY KEY (`boss_type_id`),
  KEY `idx_boss_type_status`  (`status`),
  KEY `idx_boss_type_sort`    (`sort`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='老板类型表';

-- ============================================================
-- 8. 老板表
-- ============================================================
CREATE TABLE `boss` (
  `boss_id`            BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '老板ID',
  `nickname`           VARCHAR(50)      NOT NULL DEFAULT ''      COMMENT '昵称',
  `code`               CHAR(10)         NOT NULL DEFAULT ''      COMMENT '邀请码（如 RTS404）',
  `sex`                TINYINT          NOT NULL DEFAULT 0       COMMENT '性别：0=未设置，1=男，2=女',
  `phone`              VARCHAR(20)      NOT NULL DEFAULT ''      COMMENT '手机号',
  `wx`                 VARCHAR(100)     NOT NULL DEFAULT ''      COMMENT '微信号',
  `referrer`           BIGINT UNSIGNED  NOT NULL DEFAULT 0       COMMENT '推荐人ID（指向 boss.boss_id，0=无推荐人）',
  `referrer_commission` DECIMAL(10,2)  NOT NULL DEFAULT 0.00   COMMENT '推荐人累计佣金',
  `boss_type_id`       BIGINT UNSIGNED  NOT NULL DEFAULT 1       COMMENT '老板类型ID',
  `status`             TINYINT          NOT NULL DEFAULT 1       COMMENT '状态：0=禁用，1=正常',
  `created_at`         DATETIME         NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at`         DATETIME         NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `deleted_at`         DATETIME         NULL                    COMMENT '删除时间',
  PRIMARY KEY (`boss_id`),
  UNIQUE KEY `uk_boss_code`     (`code`),
  KEY `idx_boss_phone`          (`phone`),
  KEY `idx_boss_referrer`       (`referrer`),
  KEY `idx_boss_boss_type`     (`boss_type_id`),
  KEY `idx_boss_status`        (`status`),
  CONSTRAINT `fk_boss_referrer`   FOREIGN KEY (`referrer`)     REFERENCES `boss`       (`boss_id`)    ON DELETE SET NULL,
  CONSTRAINT `fk_boss_boss_type` FOREIGN KEY (`boss_type_id`) REFERENCES `boss_type`  (`boss_type_id`) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='老板表';

-- ============================================================
-- 9. 老板资金流水表
-- ============================================================
CREATE TABLE `fund_flow` (
  `fund_flow_id`     BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '流水ID',
  `boss_id`          BIGINT UNSIGNED NOT NULL COMMENT '老板ID',
  `amount`           DECIMAL(12,2)   NOT NULL DEFAULT 0.00   COMMENT '交易金额（正=入账，负=扣款）',
  `give`             DECIMAL(12,2)   NOT NULL DEFAULT 0.00   COMMENT '赠送金额',
  `balance_before`   DECIMAL(12,2)   NOT NULL DEFAULT 0.00   COMMENT '操作前余额',
  `balance_after`    DECIMAL(12,2)   NOT NULL DEFAULT 0.00   COMMENT '操作后余额',
  `operation_type`    TINYINT         NOT NULL COMMENT '操作类型：1=消费，2=退款，3=充值，4=提现，5=系统调整',
  `type`             VARCHAR(50)     NOT NULL DEFAULT ''      COMMENT '充值方式（如 其他 / 支付宝 / 微信）',
  `business_type`    VARCHAR(50)     NOT NULL DEFAULT ''      COMMENT '业务类型（如 deposit=充值）',
  `business_id`      BIGINT UNSIGNED  NOT NULL DEFAULT 0       COMMENT '关联业务ID（如充值记录ID）',
  `remark`           VARCHAR(500)    NOT NULL DEFAULT ''      COMMENT '备注/描述',
  `extra_data`       JSON            NULL                    COMMENT '扩展数据（JSON格式存储原始请求）',
  `customer_id`      BIGINT UNSIGNED  NOT NULL DEFAULT 0       COMMENT '操作客服ID',
  `photo`            VARCHAR(500)    NOT NULL DEFAULT ''      COMMENT '付款截图URL',
  `status`           TINYINT         NOT NULL DEFAULT 1       COMMENT '状态：0=无效，1=有效',
  `del`              TINYINT         NOT NULL DEFAULT 1       COMMENT '删除标记：1=正常，2=已删除',
  `created_at`       DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at`       DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`fund_flow_id`),
  KEY `idx_fund_flow_boss_id`      (`boss_id`),
  KEY `idx_fund_flow_operation_type` (`operation_type`),
  KEY `idx_fund_flow_customer_id`   (`customer_id`),
  KEY `idx_fund_flow_created`       (`created_at`),
  KEY `idx_fund_flow_del`           (`del`),
  CONSTRAINT `fk_fund_flow_boss`    FOREIGN KEY (`boss_id`)     REFERENCES `boss`  (`boss_id`)  ON DELETE CASCADE,
  CONSTRAINT `fk_fund_flow_customer` FOREIGN KEY (`customer_id`) REFERENCES `user`  (`user_id`)  ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='老板资金流水表';

-- ============================================================
-- 10. 游戏分类表（树形结构）
-- ============================================================
CREATE TABLE `category` (
  `category_id`       BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '分类ID',
  `category_fid`      BIGINT UNSIGNED  NOT NULL DEFAULT 0       COMMENT '父级ID，0=顶级分类',
  `category_name`     VARCHAR(100)     NOT NULL DEFAULT ''      COMMENT '分类名称',
  `category_price`    DECIMAL(10,2)   NOT NULL DEFAULT 0.00   COMMENT '单价（顶级分类此字段为空）',
  `category_type`      VARCHAR(20)     NOT NULL DEFAULT 'project' COMMENT '类型：project=项目，gift=礼物',
  `commission_rate`   DECIMAL(5,2)    NOT NULL DEFAULT 0.00   COMMENT '佣金比例（%），陪玩可获得的收入比例',
  `category_sort`     INT              NOT NULL DEFAULT 0       COMMENT '排序',
  `category_remark`   VARCHAR(500)     NOT NULL DEFAULT ''      COMMENT '备注/说明',
  `status`            TINYINT          NOT NULL DEFAULT 1       COMMENT '状态：0=禁用，1=启用',
  `created_at`       DATETIME         NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at`       DATETIME         NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `deleted_at`       DATETIME         NULL                    COMMENT '删除时间',
  PRIMARY KEY (`category_id`),
  KEY `idx_category_fid`     (`category_fid`),
  KEY `idx_category_type`    (`category_type`),
  KEY `idx_category_sort`    (`category_sort`),
  KEY `idx_category_status`  (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='游戏分类表（树形）';

-- ============================================================
-- 11. 派单表
-- ============================================================
CREATE TABLE `order` (
  `order_id`           BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '派单ID',
  `no`                 VARCHAR(20)      NOT NULL DEFAULT ''      COMMENT '派单编号（如 OPIR7919）',
  `boss_id`            BIGINT UNSIGNED  NOT NULL COMMENT '老板ID',
  `boss_game_nickname` VARCHAR(100)    NOT NULL DEFAULT ''      COMMENT '老板游戏昵称',
  `customer_id`        BIGINT UNSIGNED  NOT NULL COMMENT '负责客服ID',
  `category_id`        JSON            NOT NULL COMMENT '游戏项目ID数组（JSON，如 [1, 5]）',
  `user_id`            VARCHAR(500)    NOT NULL DEFAULT ''      COMMENT '分配陪玩用户ID（逗号分隔，如 320,321）',
  `count`              DECIMAL(10,2)  NOT NULL DEFAULT 1.00   COMMENT '数量',
  `remark`             VARCHAR(500)    NOT NULL DEFAULT ''      COMMENT '备注',
  `feedback`           VARCHAR(500)    NOT NULL DEFAULT ''      COMMENT '老板反馈',
  `status`             TINYINT         NOT NULL DEFAULT 1       COMMENT '状态：1=进行中，2=已完成，3=已取消',
  `del`                TINYINT         NOT NULL DEFAULT 1       COMMENT '删除标记：1=正常，2=已删除',
  `created_at`         DATETIME         NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at`         DATETIME         NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`order_id`),
  UNIQUE KEY `uk_order_no`       (`no`),
  KEY `idx_order_boss_id`      (`boss_id`),
  KEY `idx_order_customer_id`   (`customer_id`),
  KEY `idx_order_status`       (`status`),
  KEY `idx_order_created`      (`created_at`),
  CONSTRAINT `fk_order_boss`    FOREIGN KEY (`boss_id`)     REFERENCES `boss`  (`boss_id`)  ON DELETE CASCADE,
  CONSTRAINT `fk_order_customer` FOREIGN KEY (`customer_id`) REFERENCES `user`  (`user_id`)  ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='派单表';

-- ============================================================
-- 12. 报单表（陪玩项目报告/消费记录）
-- ============================================================
CREATE TABLE `project_report` (
  `project_report_id`  BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '报单ID',
  `no`                 VARCHAR(20)      NOT NULL DEFAULT ''      COMMENT '订单编号（如 TXCC7202）',
  `user_id`            BIGINT UNSIGNED  NOT NULL COMMENT '陪玩用户ID',
  `customer_id`        BIGINT UNSIGNED  NOT NULL COMMENT '客服ID（报单人）',
  `boss_id`            BIGINT UNSIGNED  NOT NULL COMMENT '老板ID',
  `category_id`        BIGINT UNSIGNED  NOT NULL COMMENT '游戏项目分类ID',
  `quantity`           DECIMAL(10,2)  NOT NULL DEFAULT 1.00   COMMENT '完成数量',
  `total_amount`       DECIMAL(12,2)   NOT NULL DEFAULT 0.00   COMMENT '订单总金额',
  `player_commission`   DECIMAL(12,2)   NOT NULL DEFAULT 0.00   COMMENT '陪玩佣金（实际收入）',
  `referrer_commission` DECIMAL(12,2)  NOT NULL DEFAULT 0.00   COMMENT '老板推荐人佣金',
  `shop_money`         DECIMAL(12,2)   NOT NULL DEFAULT 0.00   COMMENT '店铺收入（= total_amount - player_commission - referrer_commission）',
  `type`               VARCHAR(20)     NOT NULL DEFAULT 'project' COMMENT '类型：project=项目，gift=礼物',
  `remark`             VARCHAR(500)    NOT NULL DEFAULT ''      COMMENT '备注',
  `player_img`         JSON            NULL                    COMMENT '陪玩提交截图（JSON数组）',
  `status`             TINYINT         NOT NULL DEFAULT 1       COMMENT '审核状态：1=待审核，2=已通过，3=已拒绝',
  `pay_status`         TINYINT         NOT NULL DEFAULT 1       COMMENT '支付状态：1=待支付，2=已支付',
  `start_time`         DATETIME        NULL                    COMMENT '项目开始时间',
  `end_time`           DATETIME        NULL                    COMMENT '项目结束时间',
  `feedback`           VARCHAR(500)    NOT NULL DEFAULT ''      COMMENT '反馈',
  `created_at`         DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at`         DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`project_report_id`),
  UNIQUE KEY `uk_project_report_no`  (`no`),
  KEY `idx_project_report_user_id`    (`user_id`),
  KEY `idx_project_report_customer_id` (`customer_id`),
  KEY `idx_project_report_boss_id`   (`boss_id`),
  KEY `idx_project_report_category_id` (`category_id`),
  KEY `idx_project_report_status`    (`status`),
  KEY `idx_project_report_created`   (`created_at`),
  CONSTRAINT `fk_project_report_user`     FOREIGN KEY (`user_id`)     REFERENCES `user`      (`user_id`)    ON DELETE CASCADE,
  CONSTRAINT `fk_project_report_customer` FOREIGN KEY (`customer_id`) REFERENCES `user`      (`user_id`)    ON DELETE CASCADE,
  CONSTRAINT `fk_project_report_boss`     FOREIGN KEY (`boss_id`)     REFERENCES `boss`      (`boss_id`)    ON DELETE CASCADE,
  CONSTRAINT `fk_project_report_category` FOREIGN KEY (`category_id`) REFERENCES `category`  (`category_id`) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='报单表（陪玩项目报告/消费记录）';

-- ============================================================
-- 13. 提现申请表
-- ============================================================
CREATE TABLE `apply` (
  `apply_id`          BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '申请ID',
  `user_id`           BIGINT UNSIGNED  NOT NULL COMMENT '用户ID（陪玩）',
  `money`             DECIMAL(10,2)  NOT NULL DEFAULT 0.00   COMMENT '提现金额',
  `alipay_account`    VARCHAR(100)    NOT NULL DEFAULT ''      COMMENT '支付宝账号',
  `alipay_name`       VARCHAR(50)     NOT NULL DEFAULT ''      COMMENT '支付宝实名',
  `check`             TINYINT         NOT NULL DEFAULT 0       COMMENT '审核状态：0=待审核，1=已通过，2=已拒绝',
  `check_remark`      VARCHAR(500)    NOT NULL DEFAULT ''      COMMENT '审核备注',
  `check_operator_id` BIGINT UNSIGNED  NOT NULL DEFAULT 0       COMMENT '审核操作人ID',
  `check_time`        DATETIME        NULL                    COMMENT '审核时间',
  `remit`             TINYINT         NOT NULL DEFAULT 0       COMMENT '打款状态：0=待导出，1=已导出，2=已打款',
  `remit_time`        DATETIME        NULL                    COMMENT '打款时间',
  `remit_remark`      VARCHAR(500)    NOT NULL DEFAULT ''      COMMENT '打款备注',
  `status`            TINYINT         NOT NULL DEFAULT 1       COMMENT '状态：1=正常，0=无效',
  `created_at`        DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '申请时间',
  `updated_at`        DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`apply_id`),
  KEY `idx_apply_user_id`       (`user_id`),
  KEY `idx_apply_check`         (`check`),
  KEY `idx_apply_remit`         (`remit`),
  KEY `idx_apply_status`       (`status`),
  KEY `idx_apply_created`       (`created_at`),
  CONSTRAINT `fk_apply_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='提现申请表';

-- ============================================================
-- 14. 管理员登录会话表
-- ============================================================
CREATE TABLE `admin_session` (
  `id`                BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '会话ID',
  `user_id`          BIGINT UNSIGNED  NOT NULL COMMENT '用户ID',
  `token`            VARCHAR(500)     NOT NULL DEFAULT ''      COMMENT 'JWT Token',
  `expire_time`      BIGINT           NOT NULL COMMENT '过期时间戳（秒）',
  `ip`               VARCHAR(50)     NOT NULL DEFAULT ''      COMMENT '登录IP',
  `user_agent`       VARCHAR(500)    NOT NULL DEFAULT ''      COMMENT 'User-Agent',
  `created_at`       DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_admin_session_token` (`token`(255)),
  KEY `idx_admin_session_user_id`   (`user_id`),
  KEY `idx_admin_session_expire`    (`expire_time`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='管理员登录会话表';

-- ============================================================
-- 15. 操作日志表
-- ============================================================
CREATE TABLE `operation_log` (
  `log_id`          BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '日志ID',
  `user_id`        BIGINT UNSIGNED  NOT NULL COMMENT '操作用户ID',
  `username`       VARCHAR(50)       NOT NULL DEFAULT ''      COMMENT '操作用户名',
  `module`         VARCHAR(50)      NOT NULL DEFAULT ''      COMMENT '模块名称',
  `action`         VARCHAR(50)      NOT NULL DEFAULT ''      COMMENT '操作类型（新增/修改/删除/审核）',
  `target_id`      BIGINT UNSIGNED  NOT NULL DEFAULT 0       COMMENT '操作目标ID',
  `target_type`    VARCHAR(50)      NOT NULL DEFAULT ''      COMMENT '目标类型（如 Order, User）',
  `before_data`     JSON            NULL                    COMMENT '操作前数据',
  `after_data`     JSON            NULL                    COMMENT '操作后数据',
  `ip`             VARCHAR(50)      NOT NULL DEFAULT ''      COMMENT '操作IP',
  `user_agent`     VARCHAR(500)     NOT NULL DEFAULT ''      COMMENT 'User-Agent',
  `created_at`     DATETIME         NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '操作时间',
  PRIMARY KEY (`log_id`),
  KEY `idx_operation_log_user_id`   (`user_id`),
  KEY `idx_operation_log_module`   (`module`),
  KEY `idx_operation_log_target`    (`target_id`, `target_type`),
  KEY `idx_operation_log_created`   (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='操作日志表';

-- ============================================================
-- 16. 验证码表
-- ============================================================
CREATE TABLE `captcha` (
  `id`            BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `uniq_id`      VARCHAR(50)      NOT NULL DEFAULT ''      COMMENT '唯一标识（用于匹配验证码）',
  `code`         VARCHAR(10)      NOT NULL DEFAULT ''      COMMENT '验证码内容',
  `expire_time`  BIGINT           NOT NULL COMMENT '过期时间戳（秒）',
  `used`         TINYINT         NOT NULL DEFAULT 0       COMMENT '是否已使用：0=未使用，1=已使用',
  `created_at`   DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_captcha_uniq_id`  (`uniq_id`),
  KEY `idx_captcha_expire`   (`expire_time`),
  KEY `idx_captcha_used`    (`used`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='验证码表';

-- ============================================================
-- 初始化数据
-- ============================================================

-- 插入菜单数据
INSERT INTO `menu` (`menu_id`, `name`, `url`, `icon`, `sort`, `parent_id`, `status`) VALUES
(1,  '平台数据看板',      '/data_board',        'TrendCharts', 1, 0, 1),
(2,  '陪玩数据看板',      '/player_information', 'TrendCharts', 2, 0, 1),
(3,  '老板消费记录',      '/consume_list',       'List',       3, 0, 1),
(4,  '老板信息管理',      '/boss_list',          'UserFilled', 4, 0, 1),
(5,  '老板充值记录',      '/recharge_list',      'Management',  5, 0, 1),
(6,  '陪玩信息管理',      '/player_list',        'UserFilled', 6, 0, 1),
(7,  '陪玩派单管理',      '/order_list',         'Platform',   7, 0, 1),
(8,  '陪玩报单审核',      '/bill_audit',         'Checked',    8, 0, 1),
(9,  '陪玩提现审核',      '/withdraw_audit',     'Checked',    9, 0, 1),
(10, '老板类型管理',      '/boss_type_list',     'Setting',    10, 0, 1),
(11, '游戏分类管理',      '/game_category',       'Menu',       11, 0, 1),
(12, '客服信息管理',      '/order_customer',      'Avatar',     12, 0, 1),
(13, '职位权限管理',      '/role_list',          'Setting',    13, 0, 1);

-- 插入角色数据
INSERT INTO `role` (`role_id`, `name`, `del`, `remark`) VALUES
(2, '派单客服', 1, '负责派单和报单审核'),
(6, '股东/管理员', 2, '拥有全部权限，不可删除');

-- 插入角色菜单关联
INSERT INTO `role_menu` (`role_id`, `menu_id`) VALUES
(2, 4), (2, 7), (2, 8),
(6, 1), (6, 2), (6, 3), (6, 4), (6, 5), (6, 6), (6, 7), (6, 8), (6, 9), (6, 10), (6, 11), (6, 12), (6, 13);

-- 插入老板类型
INSERT INTO `boss_type` (`boss_type_id`, `name`, `percent`, `sort`, `status`) VALUES
(1, 'vip1',   0.00, 0, 1),
(2, '散户',   0.00, 1, 1),
(3, 'VIP2',   0.00, 2, 1),
(4, 'VIP3',   0.00, 3, 1);

-- 插入陪玩等级
INSERT INTO `player_level` (`player_level_id`, `name`, `percent`, `sort`, `status`) VALUES
(1, 'A',     5.00,  1, 1),
(2, 'B',     3.00,  2, 1),
(3, 'C',     0.00,  3, 1),
(4, '未设置', 0.00, 99, 1);

-- 插入管理员账号（密码为 123123123w，使用时替换为正确的 bcrypt hash）
INSERT INTO `user` (`user_id`, `account`, `password`, `nickname`, `code`, `sex`, `phone`, `role`, `status`) VALUES
(1, 'admin', '$2b$12$LQv3c1yqBWVjvkdRCjMyMEOGSWj6R.2rM巧0G2p2E4J9R2Q3N4y6', '管理员', 'AF000', 1, '13800000000', 6, 1);

SET FOREIGN_KEY_CHECKS = 1;
