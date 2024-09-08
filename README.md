# RBAC

RBAC（Role-Based Access Control）基于角色的访问控制系统是一种控制用户权限的管理方法。对于 SQLite3 数据库，可以通过设计合适的表结构来实现 RBAC 功能。该例子基于 <a href="https://w.t1y.net/">T1 后端云</a>云函数独立私有云版（`JSXpress`）进行开发；已完成表结构设计以及用户、角色、权限、以及用户与角色、角色与权限之间的关系数据创建 API 接口。

使用前，请将该代码上传至您的 `JSXpress` 容器下的 `/workSpace/fs` 目录下，并访问：<a href="http://your_host_address:8080/install.jsx">http://your_host_address:8080/install.jsx</a> 进行数据库的初始化安装（默认会创建一个名为 `rbac.db` 的数据库文件）。

有关于 JSXpress 的相关内容，请访问：<a href="https://hub.docker.com/r/wwwanghua/jsxpress/">https://hub.docker.com/r/wwwanghua/jsxpress/</a>

以下是一个基本的 RBAC 表结构设计，包含用户、角色、权限、以及用户与角色、角色与权限之间的关系。

## SQLite3 RBAC 表结构

- 用户表 (`users`): 存储用户信息。
- 角色表 (`roles`): 存储不同角色的信息。
- 权限表 (`permissions`): 存储不同权限的信息。
- 用户角色关联表 (`user_roles`): 用于将用户与角色进行关联。
- 角色权限关联表 (`role_permissions`): 用于将角色与权限进行关联。

## 表结构详细设计

```sql
-- 用户表：存储用户信息
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,  -- 用户名
    password TEXT NOT NULL,         -- 密码（建议使用哈希）
    email TEXT UNIQUE,              -- 邮箱
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP  -- 创建时间
);

-- 角色表：存储角色信息
CREATE TABLE roles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    role_name TEXT UNIQUE NOT NULL,  -- 角色名称
    description TEXT                 -- 角色描述
);

-- 权限表：存储权限信息
CREATE TABLE permissions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    permission_name TEXT UNIQUE NOT NULL,  -- 权限名称
    description TEXT                       -- 权限描述
);

-- 用户角色关联表：用户与角色的多对多关系
CREATE TABLE user_roles (
    user_id INTEGER,  -- 用户ID
    role_id INTEGER,  -- 角色ID
    PRIMARY KEY (user_id, role_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE
);

-- 角色权限关联表：角色与权限的多对多关系
CREATE TABLE role_permissions (
    role_id INTEGER,       -- 角色ID
    permission_id INTEGER, -- 权限ID
    PRIMARY KEY (role_id, permission_id),
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE,
    FOREIGN KEY (permission_id) REFERENCES permissions(id) ON DELETE CASCADE
);
```

## 设计说明

- `users` 表 用于存储系统中的用户。每个用户有一个唯一的 `id` 和 `username`。
- `roles` 表 用于定义不同的角色，例如管理员、编辑者、普通用户等。
- `permissions` 表 用于定义各种权限，如读、写、删除等。
- `user_roles` 表 是用户和角色的多对多关系表，通过 `user_id` 和 `role_id` 连接 `users` 和 `roles` 表。
- `role_permissions` 表 是角色和权限的多对多关系表，通过 `role_id` 和 `permission_id` 连接 `roles` 和 `permissions` 表。

## 使用场景

- 当一个用户登录时，可以通过查询 `user_roles` 表获取用户的所有角色。
- 通过 `role_permissions` 表可以查出该角色的所有权限，从而实现基于角色的权限控制。
- 这样设计的 `RBAC` 系统结构简单且灵活，适用于多种应用场景。需要扩展时，也可以方便地添加新的角色或权限。
