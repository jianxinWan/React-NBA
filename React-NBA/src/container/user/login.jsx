import React,{Component} from 'react';
import axios from 'axios';
import {Redirect,NavLink} from 'react-router-dom';
import Swiper from 'swiper/dist/js/swiper'
import 'swiper/dist/css/swiper.min.css'

import './login.less';

class Login extends Component{
    constructor(props){
        super(props);
        this.state = ({
            checkNum:true,
            signIned:false,
            teamLogoList:[
                {
                    logoLink:"http://mat1.gtimg.com/sports/nba/logo/1602/10.png",
                    name:'火箭队',
                    theme:"#CF0037",
                    player:""
                },
                {
                    logoLink:"http://mat1.gtimg.com/sports/nba/logo/1602/13.png",
                    name:'湖人队',
                    theme:"#CF0037",
                    player:""
                },
                {
                    logoLink:"http://mat1.gtimg.com/sports/nba/logo/black/9.png",
                    name:'勇士队',
                    theme:"#CF0037",
                    player:""
                }
            ]
        })
        this.checkNumFun = this.checkNumFun.bind(this);
        this.login = this.login.bind(this);
    }
    createLogoSlide(){
        const mySwiper1 = new Swiper('.swiper-container',{
            autoplay: {
                delay:3000 //1.5秒切换一次
            },
            loop:true,
            speed:1000,
            effect : 'fade'
        })
    }
    checkNumFun(){
        let numInput = this.refs.num;
        let regPhone = /^[1][3,4,5,6,7,8][0-9]{9}$/;
        let regEmail = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
        if(!regEmail.test(numInput.value)){
            this.setState({
                checkNum:false
            })   
        }else{
            this.setState({
                checkNum:true
            })
        }
        if(numInput.value === ''){
            this.setState({
                checkNum:true
            })
        }
    }
    login(){
        const isNull = this.refs.num.value.trim() !=='' && this.refs.pass.value.trim() !=='';
        if(this.checkNumFun && isNull){
            axios({
                url:'http://localhost:8848/user/signIn',
                method:'post',
                data:{
                    email:this.refs.num.value,
                    password:this.refs.pass.value
                },
                withCredentials: true
            }).then((res)=>{
                const data = res.data;
                if(data.result.success){
                    sessionStorage.setItem('token',`${data.token}`);
                    this.setState({
                        signIned:true
                    })
                }else{
                    alert("登录失败，请检查密码与邮箱重试");
                }
            }).catch((err)=>{
                console.log(err);
            })
        }else{
            alert("请检查你输入内容");
        }
    }
    componentDidMount(){
        this.createLogoSlide();
    }
    render(){
        if(this.state.signIned){
            return (
                <Redirect to="/mydoc" />
            )
        }
        const slidelogoList = this.state.teamLogoList.map((slide,index)=>{
            return (
                <div className="swiper-slide" key={index}>
                    <a href={slide.url} target="_blank">
                        <img src={slide.logoLink} alt="slide-images" />
                    </a>
                </div>  
            )
        })
        return (
            <div className="login-warp">
                <div className="login">
                    <div className="top-logo">
                        <div className="swiper-container">
                            <div className="swiper-wrapper">
                                {slidelogoList}
                            </div>
                        </div>
                    </div>
                    <div className="login-form-warp">
                        <input type="text" placeholder="请输入你的邮箱" onKeyUp={this.checkNumFun} ref="num"/>
                        <input type="password" placeholder="请输入你的密码" ref="pass"/>
                        <div className="login-btn" onClick={this.login}>登录</div>
                        <div className="login-by-more">更多方式</div>
                    </div>
                    <div className="swith-warp">
                        <span>忘了密码？</span>
                        <NavLink to="/signUp">
                            <span>注册新账号</span>
                        </NavLink>
                    </div> 
                    <div className="reg-warp">
                        <span style={{'display':this.state.checkNum?'none':'block','color':'red'}}>请输入正确格式的邮箱</span>
                    </div>
                </div>
            </div>
        )
    }
}
export default Login;