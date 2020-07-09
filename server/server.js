const  express = require("express");
const  mongoose = require("mongoose");

//链接mongodb
mongoose.connect("mongodb://localhost:27017/imboss");
mongoose.connection.on('connected',function () {
   console.log("connection mongodb");
});

//创建mongdb model
const user  =mongoose.model('user',new mongoose.Schema({
    user:{type:String,require:true},
    age:{type:Number,require:true}
}));

//创建app
const  app = express();

app.get('/',function (req,res) {
    res.send('<h1>hello server</h1>')
})

app.get('/data',function (req,res) {
    res.json({name:"zmy",age:18})
})

//监听端口
app.listen("9093",function () {
    console.log("server started")
});