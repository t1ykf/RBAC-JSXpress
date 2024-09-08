include("/common/response.jsx+");

const main = () => {
  const method = ctx.getMethod();
  const database = db.open("/rbac.db");
  if (database == null) {
    return fail("连接数据库失败", null);
  }
  if (method == "POST") {
    const permission_name = ctx.postForm("permission_name"); // 权限名称
    const description = ctx.postForm("description"); // 权限描述
    if (permission_name == "" || description == "") {
      return fail("必填参数不能为空");
    }
    if (
      !database.exec(
        `INSERT INTO permissions (permission_name, description) VALUES ('${permission_name}', '${description}');`
      )
    ) {
      return fail("添加失败", null);
    }
    database.close();
    return success("添加成功", null);
  }
  if (method == "DELETE") {
    // TODO: 删除权限
    database.close();
    return success("删除成功", null);
  }
  if (method == "PUT") {
    // TODO: 修改权限
    database.close();
    return success("修改成功", null);
  }
  if (method == "GET") {
    // TODO: 查询权限
    database.close();
    return success("查询成功", {});
  }
  return "404 Not Found!";
};
