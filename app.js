// 1.安装 npm install --save koa-router

var Koa = require("koa");
// 2.引入路由并实例化
var Router = require("koa-router");
var app = new Koa();
var router = new Router();

// 路由路径前缀设置
router.prefix("/api");

// 3.配置路由
router.get("/get", async (ctx) => {
  // 路径: /api/get
  // 返回数据给前端
  ctx.body = { data: "dat" };
});

// 4.启动路由(来自于官方文档);
// router.allowedMethods()可以配置也可以不配置。
// 如果之前的没有设置响应头，配置此选项以后可以自动设置响应头。
app
  .use(async (ctx, next) => {
    ctx.set("Access-Control-Allow-Origin", "*");
    ctx.set("Access-Control-Allow-Headers", "content-type");
    ctx.set("Access-Control-Allow-Methods", "OPTIONS,GET,PUT,POST,DELETE");
    await next();
    // 允许所有跨域
    if (ctx.request.method === "OPTIONS") {
      console.log("跨域请求");
      ctx.response.status = 200;
      ctx.response.message = "OK";
    }
  })
  .use(router.routes())
  .use(router.allowedMethods());

// 监听端口
app.listen(80, () => {
  console.log("[demo] route-use-middleware is starting at port " + 80);
});
