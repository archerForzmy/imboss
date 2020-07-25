import React from "react";
import Logo from '../../component/logo/logo'
import {List, InputItem, Radio, WingBlank, WhiteSpace, Button} from 'antd-mobile'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {regisger} from '../../redux/user.redux'

import myForm from '../../component/my-form/myFrom.js';
const RadioItem = Radio.RadioItem;

@connect(
    state=>state.user,
    {regisger}
)
@myForm
class Register extends React.Component {
    constructor(props) {
        super(props);
        //绑定注册事件
        this.handleRegister = this.handleRegister.bind(this)
    }
    componentDidMount(){
        this.props.handleChange('type','genius')
    }
    //执行注册
    handleRegister() {
        //发送注册信息，获取服务器响应通过user.redux赋值到this.props,渲染到界面上
        this.props.regisger(this.props.state);
    }

    render() {
        return (
            <div>
                {this.props.redirectTo? <Redirect to={this.props.redirectTo} />:null}
                <Logo/>
                <WingBlank>
                    <List>
                        {this.props.msg?<p className='error-msg'>{this.props.msg}</p>:null}
                        <InputItem onChange={v=>this.props.handleChange('user',v)}>用户名</InputItem>
                        <WhiteSpace/>
                        <InputItem type='password' onChange={v=>this.props.handleChange('pwd',v)}>密码</InputItem>
                        <WhiteSpace/>
                        <InputItem type='password' onChange={v=>this.props.handleChange('repeatpwd',v)}>确认密码</InputItem>
                        <WhiteSpace/>
                        <RadioItem checked={this.state.type === 'genius'} onChange={()=>this.props.handleChange('type','genius')}>
                            牛人
                        </RadioItem>
                        <RadioItem checked={this.state.type === 'boss'} onChange={()=>this.props.handleChange('type','boss')}>
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
