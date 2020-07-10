const express = require('express')

const Router = express.Router();

//开始编辑和用户相关的请求响应

Router.get('/info',function(req, res){
    return res.json({code:1, msg:'后端出错了'})
})

module.exports = Router