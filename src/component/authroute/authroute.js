import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { loadData } from '../../redux/user.redux'
import { connect } from 'react-redux'

//这个注解的作用是给props初始化router信息，作用相当于这个组件被route标签包裹了一样
@withRouter
@connect(
    null,
    {loadData}
)
class AuthRoute extends React.Component {
    //组件挂载完
    componentDidMount() {
        //如果当前访问的是登陆或者注册就不用去加载用户星系
        const publicList = ['/login','/register'];
        const pathname = this.props.location.pathname;
        if (publicList.indexOf(pathname)>-1) {
            return null
        }

        // 获取用户信息
        axios.get("/user/info").then(res=>{
            if(res.status===200){
                if(res.data.code===0){
                    // 有登录信息,更新客户端用户信息
                    this.props.loadData(res.data.data)
                }else{
                    //没有用户信息就跳转到登陆页面
                    this.props.history.push('/login')
                }
            }
        });
        // 是否登录
        // 现在的url地址  login是不需要跳转的

        // 用户的type 身份是boss还是牛人
        // 用户是否完善信息（选择头像 个人简介）
    }
    //这个组件没有界面
    render(){
        return null
    }
}
export default AuthRoute
