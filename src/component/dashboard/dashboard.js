import React from 'react'
import {connect} from 'react-redux'
import {NavBar} from 'antd-mobile'
import {Switch, Route} from 'react-router-dom'
import NavLinkBar from '../navlink/NavLinkBar'

import Boss from '../../component/boss/boss'
import Genius from '../../component/genius/genius'
import User from '../../component/user/user'

import {getMsgList,sendMsg,recvMsg} from '../../redux/chat.redux';

function Msg(){
    return <h2>消息列表页面</h2>
}
@connect(
    state=>state,
    {getMsgList,sendMsg,recvMsg}
)
class Dashboard extends React.Component{

    componentDidMount() {
        //防止充dashboard和chat组件来回切换导致socket接受消息事件重复绑定
        if(this.props.chat.chatMsg.length) {
            //获取消息列表
            this.props.getMsgList();
            //接受所有消息
            this.props.recvMsg();
        }
    }
    render(){
        //获取当前访问的路径
        const pathname = this.props.location.pathname==='/'?('/'+this.props.user.type):this.props.location.pathname;
        //获取是否存在用户信息
        const user = this.props.user;


        //主页要路由的数据
        const navList = [
            {
                path:'/boss',
                text:'牛人',
                icon:'boss',
                title:'牛人列表',
                component:Boss,
                hide:user.type==='genius'
            },
            {
                path:'/genius',
                text:'boss',
                icon:'job',
                title:'BOSS列表',
                component:Genius,
                hide:user.type==='boss'
            },
            {
                path:'/msg',
                text:'消息',
                icon:'msg',
                title:'消息列表',
                component:Msg
            },
            {
                path:'/me',
                text:'我',
                icon:'user',
                title:'个人中心',
                component:User
            }
        ];
        //navList.find(v=>v.path===pathname).title
        return (
            <div>
                <NavBar className='fixd-header' mode='dard'>{pathname}</NavBar>
                <div style={{marginTop:45}}>
                    <Switch>
                        {navList.map(v=>(
                            <Route key={v.path} path={v.path} component={v.component}/>
                        ))}
                    </Switch>
                </div>
                <div>
                    <NavLinkBar data={navList}/>
                </div>
            </div>
        )
    }
}
export default Dashboard
