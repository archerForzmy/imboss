import React from 'react'
import {List, InputItem, NavBar, Icon, Grid,Card,WingBlank,WhiteSpace} from 'antd-mobile';
import {connect} from 'react-redux';
import {getMsgList,sendMsg,recvMsg} from '../../redux/chat.redux';
import {getChatId} from '../../util';
@connect(
    state=>state,
    {getMsgList,sendMsg,recvMsg}
)
class Chat extends React.Component{
    constructor(props) {
        super(props);
        this.state = {text: '',msg: []}
    }
    componentDidMount() {
        //防止充dashboard组件进入重新获取一次消息
        if(this.props.chat.chatMsg.length) {
            //获取消息列表
            this.props.getMsgList();
            //接受所有消息
            this.props.recvMsg();
        }
    }
    //发送消息
    handlerSubmit(){
        const from= this.props.user._id;
        const to = this.props.match.params.user;
        const msg = this.state.text;
        this.props.sendMsg({from, to ,msg});
        this.setState({text:''});
    }

    render() {
        const userid = this.props.match.params.user;
        const users = this.props.chat.users;
        //表示没有获取到用户信息
        if(!users[userid]){
            return null;
        }
        //获取chatid实现消息过滤(获取对方发过来的消息)
        const chatid = getChatId(userid, this.props.user._id);
        const chatMsg = this.props.chat.chatMsg.filter(v=>v.chatid===chatid);
        return (<div className="chat-page">
            <NavBar
                mode="dark"
                icon={<Icon type="left"/>}
                onLeftClick={()=>{
                    //返回dashboard
                    this.props.history.goBack();
                }}>
                {users[userid].name}
            </NavBar>
            {chatMsg.map(v=>{
                const avatar = require(`../img/${users[v.from].avatar}.png`);
                return (
                    <WingBlank key={v._id} size="lg">
                        <WhiteSpace size="lg"/>
                        <Card>
                            <Card.Header title={users[v.from].name} thumb={avatar}/>
                            <Card.Body>
                                {v.from===userid?(<div>对方发来的：{v.content}</div>):(<div>我发出去的：{v.content}</div>)}
                            </Card.Body>
                        </Card>
                        <WhiteSpace size="lg"/>
                    </WingBlank>
                )
            })}
            <div className="stick-footer">
                <List>
                    <InputItem
                        placeholder="请输入。。。"
                        value={this.state.text}
                        onChange={v=>{
                            this.setState({text:v})
                        }}
                        extra={<span onClick={()=>this.handlerSubmit()}>发送</span>}
                    >信息</InputItem>
                </List>
            </div>
        </div>)
    }
}
export default Chat
