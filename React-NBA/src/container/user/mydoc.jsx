import React,{Component} from 'react';
import {Redirect,NavLink} from 'react-router-dom';
import axios from 'axios';
import {connect} from 'react-redux';
import msg from '../../components/message';

import {setUserState} from '../../actions/index';

import './mydoc.less';

class Mydoc extends Component{
    constructor(props){
        super(props);
        this.state = {
            toLogin:false
        }
        this.getUserInfo = this.getUserInfo.bind(this);
    }
    getUserInfo(){
        const token = sessionStorage.getItem('token');
        axios.get('http://localhost:8000/user/getUserInfo',{
            headers: {Authorization:`Bearer ${token}`}
        }).then((res)=>{
            //通过redux存储用户登录状态
            const {setUserInfo}  = this.props;
            setUserInfo(true);
        }).catch((err)=>{
            const {setUserInfo}  = this.props;
            setUserInfo(false);
            msg.msgOpen({
                msgType:'fail',
                msg:'身份认证失败，请重新登录！'
            })
            new Promise((resolve,reject)=>{
                setTimeout(()=>{
                    msg.msgClose(msg.msgOpen.container);
                    resolve();
                },2000)
            }).then(()=>{
                this.setState({
                    toLogin:true
                })
            })
        })
    }
    componentDidMount(){
        this.getUserInfo();
    }
    render(){
        let redirectToLogin = null;
        if(this.state.toLogin){
            redirectToLogin = (<Redirect to="/login"></Redirect>)
        }
        return (
            <React.Fragment>
                {redirectToLogin}
                <p className="back">
                    <NavLink to="/home">
                        <i className="iconfont icon-fanhui back"></i>
                    </NavLink>
                </p>
                <div className="mydoc-warp">
                    <div className="top-card-warp">
                        <div className="user-picture-warp">
                            <img src="https://mat1.gtimg.com/sports/nba/logo/1602/10.png" width="100%" height="100%" />
                        </div>
                    </div>
                    <div className="list">
                        <ul>
                            <li>我喜欢的球星</li>
                        </ul>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

let mapState = (state) => {
    return state;
}
let mapDispatch = (dispatch) =>{
    return {
        setUserInfo:(...args) => dispatch(
            setUserState(...args)
        )
    }
}

export default connect(mapState,mapDispatch)(Mydoc);