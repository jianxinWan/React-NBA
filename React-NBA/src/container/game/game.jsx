import React,{Component} from 'react';
import $ from 'jquery';
import {NavLink} from 'react-router-dom';
import './style/game.less';
import TabList from './component/tabList';
import Video from './component/video';
import AfterPlay from './component/afterPlay';
class Game extends Component{
    constructor(props){
        super(props);
        this.state = {
            gameInfo:[],
            getInfoFinished:false,
            vid:"",
            videoUrlChanged:false
        }
    }
    getGameInfo(){
        let url="http://matchweb.sports.qq.com/html/matchStatV37?mid="+this.props.match.params.mid+"&callback=?";
        $.getJSON(url,(res)=>{
            if(res[1].stats.length === 5){
                this.setState({
                    gameInfo:res[1],
                    getInfoFinished:true,
                    vid:res[1].stats[0].list[0].vid
                })
            }else{
                this.setState({
                    gameInfo:res[1],
                    getInfoFinished:true
                })
            }
            
        })
    }
    changeVideo(item){
        this.setState({
            vid:item.vid,
            videoUrlChanged:true
        })
    }
    componentDidMount(){
        this.getGameInfo();
    }
    render(){
        const gameInfo = this.state.gameInfo;
        let title = null;
        let videoWarp = null;
        let GameInfoWarp = null;
        let nowPlay = null;
        let afterPlay = null;
        if((this.state.getInfoFinished || this.state.videoUrlChanged)){
            title = ( 
                <p className="game-title">
                    <NavLink to="/home/nba">
                        <i className="iconfont icon-fanhui back"></i>
                    </NavLink>
                    <span>{gameInfo.teamInfo.leftName}</span>
                        VS
                    <span>{gameInfo.teamInfo.rightName}</span>
                </p>
            )
            if(gameInfo.stats.length === 5){
               
                videoWarp = (
                    <Video vid = {this.state.vid}></Video>
                )
                GameInfoWarp = (
                    <TabList 
                        gameId = {this.props.match.params.mid} 
                        gameInfo={this.state.gameInfo} 
                        changeVideo={this.changeVideo.bind(this)}
                    >
                    </TabList>
                ) 
                nowPlay = (
                    <div className="game-warp">
                        <div className="game-top-warp">
                            {title}
                            {videoWarp}
                        </div>
                        <div className="game-bottom-warp">
                            {GameInfoWarp}
                        </div>
                    </div>
                )
            }else{
                afterPlay = (
                    <div className="afterPlay">
                        {title}
                        <AfterPlay gameInfo={this.state.gameInfo}></AfterPlay>
                    </div>
                )
            }
        }
        return (
            <React.Fragment>
                {nowPlay}
                {afterPlay}
            </React.Fragment>
        )
    }
}

export default Game;