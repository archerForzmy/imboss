const  express = require("express");
const userRouter = require('./user');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

//创建app
const  app = express();
//使得express支持post和cookie
app.use(cookieParser());
app.use(bodyParser.json());

//添加服务器路由
app.use('/user',userRouter);

//监听端口
app.listen("9093",function () {
    console.log("server started")
});
