import React from "react";
import Logo from '../../component/logo/logo'
import {List, InputItem, WingBlank, WhiteSpace, Button} from 'antd-mobile'
import { connect } from 'react-redux'
import {Redirect} from 'react-router-dom'
import {login} from '../../redux/user.redux'

@connect(
    state=>state.user,
    {login}
)
class Login extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            user:'',
            pwd:''
        };
        //绑定按钮事件
        this.register = this.register.bind(this)
        this.handleLogin = this.handleLogin.bind(this)
    }
    //输入框内容改变
    handleChange(key,val){
        this.setState({
            [key]:val
        })
    }
    //跳转到注册页面
    register(){
        this.props.history.push('/register')
    }
    //执行注册
    handleLogin(){
        //将登录信息发送到服务端，获取服务端返回的信息通过user.reduce.state赋值到this.props上
        this.props.login(this.state)
    }
    render() {
        return (
            <div>
                {this.props.redirectTo? <Redirect to={this.props.redirectTo} />:null}
                <Logo/>
                <WingBlank>
                    <List>
                        {this.props.msg?<p className='error-msg'>{this.props.msg}</p>:null}
                        <InputItem onChange={v=>this.handleChange('user',v)}>用户</InputItem>
                        <WhiteSpace />
                        <InputItem onChange={v=>this.handleChange('pwd',v)}>密码</InputItem>
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
