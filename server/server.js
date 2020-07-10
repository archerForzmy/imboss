const  express = require("express");
const userRouter = require('./user')

//创建app
const  app = express();
//添加服务器路由
app.use('/user',userRouter)

//监听端口
app.listen("9093",function () {
    console.log("server started")
});