import React from "react";
import Logo from '../../component/logo/logo'
import {List, InputItem, Radio, WingBlank, WhiteSpace, Button} from 'antd-mobile'

const RadioItem = Radio.RadioItem;

class Register extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: '',
            pwd: '',
            repeatpwd: '',
            type: 'genius' // 或者boss
        }
        this.handleRegister = this.handleRegister.bind(this)
    }

    //执行注册
    handleRegister() {

    }

    render() {
        return (
            <div>
                <Logo/>
                <WingBlank>
                    <List>
                        <InputItem>用户名</InputItem>
                        <WhiteSpace/>
                        <InputItem type='password'>密码</InputItem>
                        <WhiteSpace/>
                        <InputItem type='password'>确认密码</InputItem>
                        <WhiteSpace/>
                        <RadioItem checked={this.state.type == 'genius'}>
                            牛人
                        </RadioItem>
                        <RadioItem checked={this.state.type == 'boss'}>
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