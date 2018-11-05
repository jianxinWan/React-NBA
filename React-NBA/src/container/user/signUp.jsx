import React, { Component } from 'react';
import './signUp.less';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import msg from './../../components/message/index';

class SignUp extends Component{
    constructor(props){
        super(props);
        this.state = {
            showForm:false,
            passFlag:false,
            phoneFlag:false,
            toLogin:false
        }
        this.regPhone = this.regPhone.bind(this);
        this.checkPass = this.checkPass.bind(this);
        this.showForm = this .showForm.bind(this);
        this.checkLen = this.checkLen.bind(this);
        this.signUp = this.signUp.bind(this);
    }
    signUp(){
        const inputCheck =  this.refs.userName.value.trim() !== '' && this.refs.emailCode.value.trim().length === 6 && this.state.phoneFlag && this.state.passFlag;
        if(!inputCheck){
            msg.msgOpen({
                msgType:'fail',
                msg:'请检查你的输入'
            })
        }else{
            axios({
                url:'http://www.wvue.com.cn:8000/user/signUp',
                method:'post',
                data:{
                    userName:this.refs.userName.value.trim(),
                    phoneNum:this.refs.phoneNum.value.trim(),
                    password:this.refs.firstPass.value.trim(),
                    emailCode:this.refs.emailCode.value.trim()
                },
                withCredentials: true
            }).then((res)=>{
                if(res.data.success){
                    msg.msgOpen({
                        msgType:'success',
                        msg:'注册成功'
                    })
                    setTimeout(()=>{
                        msg.msgClose(msg.msgOpen.container);
                        this.setState({
                            toLogin:true
                        })
                    },2000);
                }else{
                    msg.msgOpen({
                        msgType:'fail',
                        msg:res.data.msg
                    })
                }
            }).catch((err)=>{
                console.log(err);
            })
        }
    }
    showForm(){
        this.setState({
            showForm:true
        })
    }
    checkLen(e){
        if(e.currentTarget.value.trim().length<6){
            e.currentTarget.classList.add('fail-style');
        }else{
            e.currentTarget.classList.remove('fail-style');
        }
    }
    checkPass(e){
        if(e.currentTarget.value.trim().length<6){
            e.currentTarget.classList.add('fail-style');
        }else{
            if(e.currentTarget.value.trim() !== this.refs.firstPass.value.trim()){
                e.currentTarget.classList.add('fail-style');
            }else{
                e.currentTarget.classList.remove('fail-style');
                this.setState({
                    passFlag:true
                })
            }
        }
    }
    regPhone(e){
        const target = e.currentTarget;
        let value = target.value.trim();
        let regPhone = /^[1][3,4,5,6,7,8][0-9]{9}$/;
        if(!regPhone.test(value)){
            target.classList.add('fail-style');
        }else{
            target.classList.remove('fail-style');
            this.setState({
                phoneFlag:true
            })
        }
    }
    render(){
        let toLogin = null;
        if(this.state.toLogin){
            toLogin = (
                <Redirect to="/login" />
            )
        }
        return (
            <div className="sign-warp">
                <div className="top-logo">
                    <img src="http://mat1.gtimg.com/sports/nba/logo/black/9.png"  className="logo-enter" onAnimationEnd={this.showForm}/>
                </div>
                <div className="form-warp" style={{'opacity':this.state.showForm?'1':'0'}}>
                    <input type="text" placeholder="用户名" ref="userName" />
                    <input type="text" placeholder="手机号" onKeyUp={this.regPhone} ref='phoneNum' />
                    <input type="password" placeholder="第一次输入密码"  onKeyUp={this.checkLen} ref="firstPass"/>
                    <input type="password" placeholder="第二次输入密码" onKeyUp={this.checkPass}/>       
                    <input type="text" placeholder="请输入邮箱中的验证码" onKeyUp={this.checkLen} ref="emailCode" />
                    <div className="signUp-btn" onClick = {this.signUp}>
                        注册
                    </div>
                </div>
                {toLogin}
            </div>
        )
    }
}
export default SignUp;
