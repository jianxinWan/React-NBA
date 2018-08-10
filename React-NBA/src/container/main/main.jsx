import React,{Component} from 'react';
import {NavLink} from 'react-router-dom'
import './main.less';
class Index extends Component{
    constructor(props){
        super(props);
        this.showMenu = this.showMenu.bind(this);
        this.state = {
            nowPage:'NBA',
            loginState:false,
            showMenuList:false
        }
    }
    showMenu(){
        this.setState({
            showMenuList:this.state.showMenuList?false:true
        })
    }
    render(){
        let loginWarp = null;
        if(this.state.loginState){
            <div></div>
        }else{
            loginWarp = (
                <NavLink to="/login">
                    <span>登录</span>
                </NavLink>
            )
        }
        let menuList = null;
        if(this.state.showMenuList){
            menuList = (
                <ul>
                    <li>NBA</li>
                    <li>CBA</li>
                    <li>电竞</li>
                    <li>英超</li>
                    <li>社区</li>
                    <li>更多</li>
                </ul>
            )
        }
        return(
            <div className="main-warp">
                <div className="main-header-warp">
                    <div className="header-left-logo">
                        <img src="http://mat1.gtimg.com/sports/sportAppWeb/kbsshare/statics/icon-logo40x40_6cc48e.png" alt="top-logo" />
                        <span>腾讯体育</span>
                    </div>
                    <div className="header-right-warp">
                        <div className="shwo-page-warp">
                            {this.state.nowPage}
                        </div>
                        <div className="login-and-menu">
                            <div className="login-warp">
                                {loginWarp}
                            </div>
                            <i className={['iconfont','icon-caidan-copy',this.state.showMenuList?'rotateTo':'rotateBack'].join(" ")}  onClick={this.showMenu} >
                            </i>
                        </div>
                    </div>
                </div>
                <div  className={['menu-list',this.state.showMenuList?'moveFromTop':' '].join(" ")}>
                    {menuList}
                </div>
                {this.props.children}
            </div>
        )
    }
}
export default Index;