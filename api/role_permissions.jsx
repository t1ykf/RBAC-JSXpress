include("/common/response.jsx+");

const main = () => {
  const method = ctx.getMethod();
  const database = db.open("/rbac.db");
  if (database == null) {
    return fail("连接数据库失败", null);
  }
  if (method == "POST") {
    const role_id = ctx.postForm("role_id"); // 角色ID
    const permission_id = ctx.postForm("permission_id"); // 权限ID
    if (role_id == "" || permission_id == "") {
      return fail("必填参数不能为空");
    }
    if (
      !database.exec(
        `INSERT INTO role_permissions (role_id, permission_id) VALUES (${role_id}, ${role_id});`
      )
    ) {
      return fail("关联失败", null);
    }
    database.close();
    return success("关联成功", null);
  }
  if (method == "DELETE") {
    // TODO: 删除关联
    database.close();
    return success("删除成功", null);
  }
  if (method == "PUT") {
    // TODO: 修改关联
    database.close();
    return success("修改成功", null);
  }
  if (method == "GET") {
    // TODO: 查询关联
    database.close();
    return success("查询成功", {});
  }
  return "404 Not Found!";
};
