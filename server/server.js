const  express = require("express");
const userRouter = require('./user');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const models = require('./model');
const Chat = models.getModel('chat');

//创建app
const  app = express();
// work with express
const server = require('http').Server(app);
const io = require('socket.io')(server);

//监听socket连接
io.on('connection', function (socket) {
    //console.log('user login');
    socket.on('sendMsg', function (data) {
        //接受到发送的消息
        const {from, to, msg} = data;
        //生成聊天id
        const chatid = [from, to].sort().join('_');
        //将消息保存到数据库中
        Chat.create({chatid, from, to, content: msg}, function (err, doc) {
            //将保存到的消息转给所有用户
            io.emit('recvMsg', Object.assign({},doc._doc))
        })
    })
});


//使得express支持post和cookie
app.use(cookieParser());
app.use(bodyParser.json());

//添加服务器路由
app.use('/user',userRouter);

//监听端口
server.listen(9093, function() {
    console.log('node app start at port 9093')
});
