import React from "react";
import Logo from '../../component/logo/logo'
import {List, InputItem, WingBlank, WhiteSpace, Button} from 'antd-mobile'
import { connect } from 'react-redux'
import {Redirect} from 'react-router-dom'
import {login} from '../../redux/user.redux'

import myForm from '../../component/my-form/myFrom.js';

@connect(
    state=>state.user,
    {login}
)
@myForm
class Login extends React.Component{
    constructor(props) {
        super(props);
        //绑定按钮事件
        this.register = this.register.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }
    //跳转到注册页面
    register(){
        this.props.history.push('/register')
    }
    //执行注册
    handleLogin(){
        //将登录信息发送到服务端，获取服务端返回的信息通过user.reduce.state赋值到this.props上
        this.props.login(this.props.state)
    }
    render() {
        return (
            <div>
                {(this.props.redirectTo&&this.props.redirectTo!=='/login')? <Redirect to={this.props.redirectTo} />:null}
                <Logo/>
                <WingBlank>
                    <List>
                        {this.props.msg?<p className='error-msg'>{this.props.msg}</p>:null}
                        <InputItem onChange={v=>this.props.handleChange('user',v)}>用户</InputItem>
                        <WhiteSpace />
                        <InputItem onChange={v=>this.props.handleChange('pwd',v)}>密码</InputItem>
                    </List>
                    <WhiteSpace />
                    <Button onClick={this.handleLogin} type='primary'>登录</Button>
                    <WhiteSpace />
                    <Button onClick={this.register} type='primary'>注册</Button>
                </WingBlank>
            </div>
        );
    }
}

export default Login;
