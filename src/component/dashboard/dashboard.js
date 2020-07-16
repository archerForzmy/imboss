import React from 'react'
import {connect} from 'react-redux'
import {NavBar} from 'antd-mobile'
import {Switch, Route} from 'react-router-dom'
import NavLinkBar from '../navlink/NavLinkBar'

function Msg(){
    return <h2>消息列表页面</h2>
}
function User(){
    return <h2>个人中心页面</h2>
}
function Boss(){
    return <h2>boss列表页面</h2>
}
function Genius(){
    return <h2>牛人列表页面</h2>
}


@connect(
    state=>state
)
class Dashboard extends React.Component{
    render(){
        //获取当前访问的路径
        const {pathname} = this.props.location
        //获取是否存在用户信息
        const user = this.props.user

        //主页要路由的数据
        const navList = [
            {
                path:'/boss',
                text:'牛人',
                icon:'boss',
                title:'牛人列表',
                component:Genius,
                hide:user.type=='genius'
            },
            {
                path:'/genius',
                text:'boss',
                icon:'job',
                title:'BOSS列表',
                component:Boss,
                hide:user.type=='boss'
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
        ]

        const title = navList.find(v=>v.path==pathname).title;

        return (
            <div>
                <NavBar className='fixd-header' mode='dard'>{title}</NavBar>
                <div style={{marginTop:45}}>
                    <Switch>
                        {navList.map(v=>(
                            <Route key={v.path} path={v.path} component={v.component}></Route>
                        ))}
                    </Switch>
                </div>
                <NavLinkBar data={navList}></NavLinkBar>
            </div>
        )


    }

}

export default Dashboard