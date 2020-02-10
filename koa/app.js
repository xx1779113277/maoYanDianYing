const koa = require('koa')
const bodyParser = require('koa-bodyparser')    //引入post模块
const Router = require('koa-router')    //引入路由模块
const path = require('path')
const static = require('koa-static')   //静态资源服务插件
const staticPath = './static/home/dist'       //根基自己的目录配置文件路径
const cors = require("koa2-cors");//导入跨域模块

// 实例化
const app = new koa()
const router = new Router()

// 定义允许跨域的origin
const allowOrigins = [
    "http://localhost:8080"
];
app.use(cors({
    origin: function(ctx) {
      if (allowOrigins.includes(ctx.header.origin)) {
        return ctx.header.origin;
      }
      return false;
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    withCredentials:true,
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));

app.use(bodyParser());
// 配置静态web服务的中间件
app.use(static(
    path.join( __dirname,  staticPath)
))

// 引入users路由
const usersRouter = require('./router/users')

// 配置路由地址
router.use('/user', usersRouter)

// 配置路由
app.use(router.routes()).use(router.allowedMethods());

// 定义端口号
const port = process.env.POST || 5000

// 监听端口号
app.listen( port, () => {
    console.log(`server started on ${port}`)
})