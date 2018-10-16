import React, { Component } from 'react';
import './message.less';
class Message extends Component{
    constructor(props){
        super(props);
        this.state = {
            msgState:1
        }
        this.close = this.close.bind(this);
        this.flicker = this.flicker.bind(this);
        this.animationEnd = this.animationEnd.bind(this);
    }
    static defaultProps = {
        msgType:'',
        msgState:-1
    }
    close(){
        this.setState({
            msgState:0
        })
    }
    animationEnd(){
        if(this.state.msgState){
            this.refs.msgBox.classList.remove('message-open');
            this.refs.msgBox.classList.remove('message-flicker');
            this.refs.msgBox.classList.remove('message-close');
        }else{
            this.props.onClose();
        }
    }
    flicker(){
        if(this.state.msgState){
            this.refs.msgBox.classList.add('message-flicker');
        }
    }
    componentDidMount(){
    }
    render(){
        return (
            <div className="message-warp" onClick={this.flicker}>
                <div 
                    className={['message',this.state.msgState?'message-open':'message-close',this.props.msgType==='success'?'msg-success':this.props.msgType === 'fail'?'msg-fail':'msg-default'].join(' ')}  
                    ref="msgBox"
                    onAnimationEnd = {this.animationEnd}
                >
                    <i className="iconfont icon-guanbi close" onClick = {this.close}></i>
                    <div className="content">
                        <p>
                        <i className={['iconfont',this.props.msgType ==='success'?'icon-xuanzhong':this.props.msgType==='fail'?'icon-guanbi':''].join(' ')}></i>
                            {this.props.msg}
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}
export default Message;