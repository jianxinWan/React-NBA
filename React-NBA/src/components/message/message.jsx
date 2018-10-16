import React, { Component } from 'react';
import './message.less';
class Message extends Component{
    constructor(props){
        super(props);
        this.state = {
            msgType:'fail',
            msgState:1
        }
        this.close = this.close.bind(this);
        this.flicker = this.flicker.bind(this);
        this.animationEnd = this.animationEnd.bind(this);
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
        if(this.props.msgType){
            this.setState({
                msgType:this.props.msgType
            })
        }else{
            this.setState({
                msgType:'success'
            })
        }
    }
    render(){
        return (
            <div className="message-warp" onClick={this.flicker}>
                <div 
                    className={['message',this.state.msgState?'message-open':'message-close',this.state.msgType==='success'?'msg-success':'msg-fail'].join(' ')}  
                    ref="msgBox"
                    onAnimationEnd = {this.animationEnd}
                >
                    <i className="iconfont icon-guanbi close" onClick = {this.close}></i>
                    <div className="content">
                        <p>
                        <i className={['iconfont',this.state.msgType ==='success'?'icon-xuanzhong':'icon-guanbi'].join(' ')}></i>
                            {this.props.msg}
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}
export default Message;