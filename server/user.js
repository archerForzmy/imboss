const express = require('express');
const utils = require('utility');
const Router = express.Router();

//获取模型对象
const model = require('./model');
const User = model.getModel('user');

//完善用户信息
Router.post('/update',function(req,res){
    //获取cookies中的数据
    const userid = req.cookies.userid;
    if (!userid) {
        return res.json({code:1})
    }
    const body = req.body;
    User.findByIdAndUpdate(userid,body,function(err,doc){
        //将返回的数据和参数数据进行合并
        const data = Object.assign({},{
            user:doc.user,
            type:doc.type
        },body);
        return res.json({code:0,data})
    })
})

//检查cookie是否存在用户信息
Router.get('/info',function(req, res){
    const {userid} = req.cookies;
    if (!userid) {
        return res.json({code:1})
    }
    User.findOne({_id:userid} ,{'pwd':0,'__v':0} , function(err,doc){
        if (err) {
            return res.json({code:1, msg:'后端出错了'})
        }
        if (doc) {
            return res.json({code:0,data:doc})
        }
    })
    // 用户有没有cookie
});

//用户登录
Router.post('/login', function(req,res){
    const {user, pwd} = req.body;
    //认证密码，并且不给客户端返回密码字段
    User.findOne({user,pwd:md5Pwd(pwd)},{'pwd':0,'__v':0},function(err,doc){
        if (!doc) {
            return res.json({code:1,msg:'用户名或者密码错误'})
        }
        //将信息保存在cookie中
        res.cookie('userid', doc._id);
        return res.json({code:0,data:doc})
    })
})

//获取用户列表
Router.get('/list',function(req, res){
    const { type } = req.query;
    // User.remove({},function(e,d){})
    User.find({type},function(err,doc){
        return res.json({code:0,data:doc})
    })
});

//注册
Router.post('/register', function(req, res){
    //获取提交上来的数据
    const {user, pwd, type} = req.body;
    //判断用户是否注册
    User.findOne({user},function(err,doc){
        if (doc) {
            //返回重复注册信息
            return res.json({code:1,msg:'用户名重复'})
        }
        //将用户插入到数据库中
        const userModel = new User({user,type,pwd:md5Pwd(pwd)});
        userModel.save(function(e,d){
            if (e) {
                return res.json({code:1,msg:'后端出错了'})
            }
            const {user, type, _id} = d;
            //将注册后的用户写入到cookie中
            res.cookie('userid', _id);
            //返回数据给客户端
            return res.json({code:0,data:{user, type, _id}})
        })
    })
});

//加密
function md5Pwd(pwd){
    const salt = 'imooc_is_good_3957x8yza6!@#IUHJh~~';
    return utils.md5(utils.md5(pwd+salt))
}


module.exports = Router;
