import React from "react";
import Logo from '../../component/logo/logo'
import {List, InputItem, Radio, WingBlank, WhiteSpace, Button} from 'antd-mobile'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {regisger} from '../../redux/user.redux'

const RadioItem = Radio.RadioItem;

@connect(
    state=>state.user,
    {regisger}
)
class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            pwd: '',
            repeatpwd: '',
            type: 'genius' // 或者boss
        };
        //绑定注册事件
        this.handleRegister = this.handleRegister.bind(this)
    }
    //输入框事件
    handleChange(key,val){
        this.setState({
            [key]:val
        })
    }

    //执行注册
    handleRegister() {
        //发送注册信息，获取服务器响应通过user.redux赋值到this.props,渲染到界面上
        this.props.regisger(this.state);
    }

    render() {
        return (
            <div>
                {this.props.redirectTo? <Redirect to={this.props.redirectTo} />:null}
                <Logo/>
                <WingBlank>
                    <List>
                        {this.props.msg?<p className='error-msg'>{this.props.msg}</p>:null}
                        <InputItem onChange={v=>this.handleChange('user',v)}>用户名</InputItem>
                        <WhiteSpace/>
                        <InputItem type='password' onChange={v=>this.handleChange('pwd',v)}>密码</InputItem>
                        <WhiteSpace/>
                        <InputItem type='password' onChange={v=>this.handleChange('repeatpwd',v)}>确认密码</InputItem>
                        <WhiteSpace/>
                        <RadioItem checked={this.state.type == 'genius'} onChange={()=>this.handleChange('type','genius')}>
                            牛人
                        </RadioItem>
                        <RadioItem checked={this.state.type == 'boss'} onChange={()=>this.handleChange('type','boss')}>
                            老板
                        </RadioItem>
                        <WhiteSpace/>
                        <Button type='primary' onClick={this.handleRegister}>注册 </Button>
                    </List>
                </WingBlank>
            </div>
        );
    }
}

export default Register;
