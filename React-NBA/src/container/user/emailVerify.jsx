import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import Loading from '../../components/loading/loading';
import msg from '../../components/message';
import axios from 'axios';
import './emailVerify.less';
class EmailVerify extends Component{
    constructor(props){
        super(props);
        this.state = {
            showCode:false,
            regEmail:false,
            showLoading:false,
            toSignUp:false
        }
        this.checkNumFun = this.checkNumFun.bind(this);
        this.getSvgCode = this.getSvgCode.bind(this);
        this.getEmailVerify = this.getEmailVerify.bind(this);
    }
    getSvgCode(){
        axios({
            url:'http://www.wvue.com.cn:8000/user/getSvgCode',
            method:'get',
            withCredentials: true
        }).then((res)=>{
            if(res.data){
                this.refs.codeWarp.innerHTML = res.data;
            }else{
                this.refs.codeWarp.innerHTML = '点击刷新验证码';
            }
        }).catch((err)=>{
            this.refs.codeWarp.innerHTML = '验证码出错啦';
        })
    }
    getEmailVerify(){
        if(this.state.showCode && this.refs.code.value!=''){
            this.setState({showLoading:true});
            axios({
                url:'http://www.wvue.com.cn:8000/user/getEmailVerify',
                method:'post',
                data:{
                    email:this.refs.email.value,
                    code:this.refs.code.value
                },
                withCredentials: true
            }).then((res)=>{
                this.setState({showLoading:false});
                if(res.data.success){
                    msg.msgOpen({
                        msgType:'success',
                        msg:'请在邮箱及时查看验证码'
                    });
                    setTimeout(()=>{
                        msg.msgClose(msg.msgOpen.container);
                    },2000);
                    this.setState({
                        toSignUp:true
                    })
                }else{
                    msg.msgOpen({
                        msgType:'fail',
                        msg:res.data.msg
                    });
                    new Promise((resolve,reject)=>{
                        this.getSvgCode();
                        resolve();   
                    }).then(()=>{
                        this.refs.email.value = "";
                        this.refs.code.value = "";
                    })
                }
            }).catch((err)=>{
                msg.msgOpen({
                    msgType:'fail',
                    msg:'请检查你的输入'
                });
            })
        }else{
            msg.msgOpen({
                msgType:'fail',
                msg:'请检查你的输入'
            });
        }
    }
    checkNumFun(){
        let numInput = this.refs.email;
        let regPhone = /^[1][3,4,5,6,7,8][0-9]{9}$/;
        let regEmail = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
        if(regEmail.test(numInput.value)){
            this.setState({
                regEmail:false,
                showCode:true
            })   
        }else{
            this.setState({
                regEmail:true,
            })
        }
        if(numInput.value === ''){
            this.setState({
                regEmail:false,
                showCode:false
            })
        }
    }
    componentDidMount(){
        this.getSvgCode();
    }
    render(){
        let toSignUp = null;
        if(this.state.toSignUp){
            toSignUp = (
                <Redirect to="/signUp" />
            )
        }
        return(
            <React.Fragment>
                <Loading isShow = {this.state.showLoading}></Loading>
                {toSignUp}
                <div className="verify-warp">
                   <div className="logo-warp">
                        <img src="http://mat1.gtimg.com/sports/nba/logo/1602/10.png" />
                   </div>
                   <div className="form-warp">
                        <input type="text" placeholder="请输入你的邮箱" onKeyUp={this.checkNumFun} ref="email" onKeyUp = {this.checkNumFun} />
                        <div className="code-warp" style={{'display':this.state.showCode?'block':'none'}}>
                            <input type="text" placeholder="请输入验证码"  onKeyUp={this.checkNumFun} ref="code"/>
                            <div className="code" ref="codeWarp" onClick={this.getSvgCode}></div>
                        </div>
                        <div className="getEmailCode" onClick = {this.getEmailVerify}>
                            获取邮箱验证
                        </div>
                   </div>
                   <div className="error-warp" style={{'display':this.state.regEmail?'block':'none'}}>
                        <p style={{'display':this.state.checkNum?'none':'block','color':'red'}}>请输入正确格式的邮箱</p>
                   </div>
                </div>
            </React.Fragment>
        )
    }
}
export default EmailVerify;