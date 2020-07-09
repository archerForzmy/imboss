import React from "react";
import Logo from '../../component/logo/logo'
import {List, InputItem, WingBlank, WhiteSpace, Button} from 'antd-mobile'
class Login extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            user:'',
            pwd:''
        }
        //绑定按钮事件
        this.register = this.register.bind(this)
        this.handleLogin = this.handleLogin.bind(this)
    }
    //跳转到注册页面
    register(){
        this.props.history.push('/register')
    }
    //执行注册
    handleLogin(){

    }
    render() {
        return (
            <div>
                <Logo/>
                <WingBlank>
                    <List>
                        <InputItem>用户</InputItem>
                        <WhiteSpace />
                        <InputItem>密码</InputItem>
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