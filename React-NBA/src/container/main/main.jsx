import React,{Component} from 'react';
import {NavLink} from 'react-router-dom'
import './main.less';
class Index extends Component{
    constructor(props){
        super(props);
        this.showMenu = this.showMenu.bind(this);
        this.setPages = this.setPages.bind(this);
        this.state = {
            nowPage:'NBA',
            loginState:false,
            showMenuList:false
        }
    }
    setPages(e){
        const promise  = new Promise((reslove,reject)=>{
            this.setState({
                nowPage:e.target.innerHTML
            })
            reslove();
        }).then(()=>{
            this.showMenu();
        }).catch((err)=>{
            console.log(err);
        })
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
        let menuList = null,moduleFun;
        if(this.state.showMenuList){
            menuList = (
                <ul onClick={this.setPages} className="nav1">
                    <NavLink to="/home/nba">
                        <li>NBA</li>
                    </NavLink>
                    <NavLink to="/home/cba">
                        <li>CBA</li>
                    </NavLink>
                    <NavLink to="/home/esports">
                        <li>电竞</li>
                    </NavLink>
                    <NavLink to="/home/soccer">
                        <li>英超</li>
                    </NavLink>
                    <NavLink to="/home/community">
                        <li>社区</li>
                    </NavLink>
                    <NavLink to="/home/more">
                        <li>更多</li>
                    </NavLink>
                </ul>
            )
        }
        let navGroup2 = null;
        switch(this.state.nowPage){
            case 'NBA':
                navGroup2 = (
                    <ul className="nav2">
                        <NavLink to="/home/nba" activeClassName="activeLi">
                            <li>赛程</li>
                        </NavLink>
                        <NavLink to="/home/nbaTeam" activeClassName="activeLi">
                            <li>球队榜</li>
                        </NavLink>
                        <NavLink to="/home/nbaPlayer" activeClassName="activeLi">
                            <li>球员榜</li>
                        </NavLink>
                    </ul>
                )
                break;
            case 'CBA':
                navGroup2 = (
                    <ul className="nav2">
                        <NavLink activeClassName="activeLi">
                            <li>赛程</li>
                        </NavLink>
                        <NavLink activeClassName="activeLi">
                            <li>球队榜</li>
                        </NavLink>
                        <NavLink activeClassName="activeLi">
                            <li>球员榜</li>
                        </NavLink>
                    </ul>
                )
                break;
            case '英超':
                navGroup2 = (
                    <ul className="nav2 nav2-soccer">
                        <NavLink activeClassName="activeLi">
                            <li>赛程</li>
                        </NavLink>
                        <NavLink activeClassName="activeLi">
                            <li>积分榜</li>
                        </NavLink>
                        <NavLink activeClassName="activeLi">
                            <li>射手榜</li>
                        </NavLink>
                        <NavLink activeClassName="activeLi">
                            <li>助攻榜</li>
                        </NavLink>
                    </ul>
                )
                break;
            default:
                break;
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
                    {navGroup2}
                </div>
                <div className="main-content">
                    {this.props.children}
                </div>
            </div>
        )
    }
}
export default Index;