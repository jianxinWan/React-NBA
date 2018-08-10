import React,{Component} from 'react';

import Swiper from 'swiper/dist/js/swiper'
import 'swiper/dist/css/swiper.min.css'

import './login.less';

class Login extends Component{
    constructor(props){
        super(props);
        this.state = ({
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
    componentDidMount(){
        this.createLogoSlide();
    }
    render(){
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
                        <input type="text" placeholder="QQ号码/手机号/邮箱" />
                        <input type="password" placeholder="请输入你的密码" />
                        <div className="login-btn">登录</div>
                        <div className="login-by-more">更多方式</div>
                    </div>
                    <div className="swith-warp">
                        <span>忘了密码？</span>
                        <span>注册新账号</span>
                    </div> 
                </div>
            </div>
        )
    }
}
export default Login;