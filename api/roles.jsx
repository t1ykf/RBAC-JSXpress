include("/common/response.jsx+");

const main = () => {
  const method = ctx.getMethod();
  const database = db.open("/rbac.db");
  if (database == null) {
    return fail("连接数据库失败", null);
  }
  if (method == "POST") {
    const role_name = ctx.postForm("role_name"); // 角色名称
    const description = ctx.postForm("description"); // 角色描述
    if (role_name == "" || description == "") {
      return fail("必填参数不能为空");
    }
    if (
      !database.exec(
        `INSERT INTO roles (role_name, description) VALUES ('${role_name}', '${description}');`
      )
    ) {
      return fail("添加失败", null);
    }
    database.close();
    return success("添加成功", null);
  }
  if (method == "DELETE") {
    // TODO: 删除角色
    database.close();
    return success("删除成功", null);
  }
  if (method == "PUT") {
    // TODO: 修改角色
    database.close();
    return success("修改成功", null);
  }
  if (method == "GET") {
    // TODO: 查询角色
    database.close();
    return success("查询成功", {});
  }
  return "404 Not Found!";
};
