const main = () => {
  if (os.readFile("/installed") == null) {
    const database = db.open("/rbac.db");
    if (database == null) {
      return "连接数据库失败";
    }
    /*** 初始化数据库表结构 ***/
    if (
      // 用户表：存储用户信息
      !database.exec(`
        CREATE TABLE users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,  -- 用户名
            password TEXT NOT NULL,         -- 密码（建议使用哈希）
            email TEXT UNIQUE,              -- 邮箱
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP  -- 创建时间
        );
        `)
    ) {
      return "创建 users 表失败";
    }
    if (
      // 角色表：存储角色信息
      !database.exec(`
        CREATE TABLE roles (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            role_name TEXT UNIQUE NOT NULL,  -- 角色名称
            description TEXT                 -- 角色描述
        );
        `)
    ) {
      return "创建 roles 表失败";
    }
    if (
      // 权限表：存储权限信息
      !database.exec(`
        CREATE TABLE permissions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            permission_name TEXT UNIQUE NOT NULL,  -- 权限名称
            description TEXT                       -- 权限描述
        );
        `)
    ) {
      return "创建 permissions 表失败";
    }
    if (
      // 用户角色关联表：用户与角色的多对多关系
      !database.exec(`
        CREATE TABLE user_roles (
            user_id INTEGER,  -- 用户ID
            role_id INTEGER,  -- 角色ID
            PRIMARY KEY (user_id, role_id),
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
            FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE
        );
        `)
    ) {
      return "创建 user_roles 表失败";
    }
    if (
      // 角色权限关联表：角色与权限的多对多关系
      !database.exec(`
        CREATE TABLE role_permissions (
            role_id INTEGER,       -- 角色ID
            permission_id INTEGER, -- 权限ID
            PRIMARY KEY (role_id, permission_id),
            FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE,
            FOREIGN KEY (permission_id) REFERENCES permissions(id) ON DELETE CASCADE
        );
        `)
    ) {
      return "创建 role_permissions 表失败";
    }
    /*** 初始化数据库表结构 ***/
    if (!os.writeFile("/installed", "1")) {
      return "写入文件失败";
    }
    database.close();
    return "安装成功";
  } else {
    return "您已经安装过了，如需重新安装，请删除 database 目录下的相关数据库文件及 fs 目录下的 installed 文件，然后重新访问该地址进行安装！";
  }
};
