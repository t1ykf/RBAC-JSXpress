include("/common/response.jsx+");

const main = () => {
  const method = ctx.getMethod();
  const database = db.open("/rbac.db");
  if (database == null) {
    return fail("连接数据库失败", null);
  }
  if (method == "POST") {
    const username = ctx.postForm("username"); // 用户名
    const password = ctx.postForm("password"); // 密码
    const email = ctx.postForm("email"); // 邮箱
    if (username == "" || password == "" || email == "") {
      return fail("必填参数不能为空");
    }
    if (
      !database.exec(
        `INSERT INTO users (username, password, email) VALUES ('${username}', '${password}', '${email}');`
      )
    ) {
      return fail("添加失败", null);
    }
    database.close();
    return success("添加成功", null);
  }
  if (method == "DELETE") {
    // TODO: 删除用户
    database.close();
    return success("删除成功", null);
  }
  if (method == "PUT") {
    // TODO: 修改用户
    database.close();
    return success("修改成功", null);
  }
  if (method == "GET") {
    // TODO: 查询用户
    database.close();
    return success("查询成功", {});
  }
  return "404 Not Found!";
};
