import React,{Component} from 'react';
import {NavLink} from 'react-router-dom';
import './main.less';

class Index extends Component{
    constructor(props){
        super(props);
        this.showMenu = this.showMenu.bind(this);
        this.setPages = this.setPages.bind(this);
        this.state = {
            loginState:false,
            showMenuList:false,
            showHead:true
        }
    }
    setPages(e){
        new Promise((reslove,reject)=>{
            this.props.setNowPage(e.target.innerHTML);
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

      //add 滑动判断
    getSlideAngle(dx,dy){
        //计算角度
        return Math.atan2(dy,dx)*180/Math.PI;
    }
    getSlideDirection(sx,sy,ex,ey){
        let dy = ey-sy;
        let dx = ex-sx;
        let result = 0;
        if(Math.abs(dx) < 2 && Math.abs(dy) < 2){
            return result;
        }
        let angle = this.getSlideAngle(dx,dy);
        if(angle >= -45 && angle < 45) { 
            result = 4; 
        }else if (angle >= 45 && angle < 135) { 
            result = 1; 
        }else if (angle >= -135 && angle < -45) { 
            result = 2; 
        } 
        else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) { 
            result = 3; 
        } 
        return result; 
    }
    addTouch(){
        let sx,sy;
        let that = this;
        document.addEventListener('touchstart',(e)=>{
            sx = e.changedTouches[0].pageX;
            sy = e.changedTouches[0].pageY;
        },false);
        document.addEventListener('touchend',(e)=>{
            let ex,ey;
            ex = e.changedTouches[0].pageX;
            ey = e.changedTouches[0].pageY;
            let direction = this.getSlideDirection(sx,sy,ex,ey);
            switch(direction) { 
                case 0: 
                    break; 
                case 1: 
                    this.setState({
                        showHead:true
                    })
                    //展示
                    break; 
                case 2:
                    //收起 
                    this.setState({
                        showHead:false
                    }) 
                    break; 
                case 3: 
                    break; 
                case 4: 
                    break; 
                default:
                    break;            
            } 
        })
    }
    componentDidMount(){
        this.setState({
            nowPage:this.props.nowPage
        }) 
        this.addTouch();
    }
    render(){
        let loginWarp = null;
        if(this.props.userState.userState !== "false"){
            loginWarp = (
                <NavLink to="/mydoc">
                    <div className="mydoc">
                        <img src="https://mat1.gtimg.com/sports/nba/logo/1602/10.png" width="100%" height="100%" />
                    </div>
                </NavLink>
            )
        }else{
            loginWarp = (
                <NavLink to="/login">
                    <span className="toLogin">登录</span>
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
        switch(this.props.nowPage){
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
                        <NavLink activeClassName="activeLi" to="/home/nba">
                            <li>赛程</li>
                        </NavLink>
                        <NavLink activeClassName="activeLi" to="/home/nbaTeam">
                            <li>球队榜</li>
                        </NavLink>
                        <NavLink activeClassName="activeLi" to="/home/nbaPlayer">
                            <li>球员榜</li>
                        </NavLink>
                    </ul>
                )
                break;
            case '英超':
                // navGroup2 = (
                //     <ul className="nav2 nav2-soccer">
                //         <NavLink activeClassName="activeLi">
                //             <li>赛程</li>
                //         </NavLink>
                //         <NavLink activeClassName="activeLi">
                //             <li>积分榜</li>
                //         </NavLink>
                //         <NavLink activeClassName="activeLi">
                //             <li>射手榜</li>
                //         </NavLink>
                //         <NavLink activeClassName="activeLi">
                //             <li>助攻榜</li>
                //         </NavLink>
                //     </ul>
                // )
                break;
            default:
                break;
        }
        return(
            <div className="main-warp">
                <div className={['header',this.state.showHead?'moveFromTop':'backTop'].join(" ")}>
                    <div className = {['main-header-warp'].join(" ")} >
                        <div className="header-left-logo">
                            <img src="http://mat1.gtimg.com/sports/sportAppWeb/kbsshare/statics/icon-logo40x40_6cc48e.png" alt="top-logo" />
                            <span>今日看点</span>
                        </div>
                        <div className="header-right-warp">
                            <div className="shwo-page-warp">
                                {this.props.nowPage}
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
                </div>
                <div className="main-content">
                    {this.props.children}
                </div>
            </div>
        )
    }
}
export default Index;