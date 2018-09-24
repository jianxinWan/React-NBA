import React,{Component} from 'react';
import $ from 'jquery';
import {NavLink} from 'react-router-dom';
import './style/game.less';
import TabList from './component/tabList';
import Video from './component/video';
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
            this.setState({
                gameInfo:res[1],
                getInfoFinished:true,
                vid:res[1].stats[0].list[0].vid
            })
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
        if(this.state.getInfoFinished  || this.state.videoUrlChanged){
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
            videoWarp = (
                <Video vid = {this.state.vid}></Video>
            )
            GameInfoWarp = (
                <TabList gameId = {this.props.match.params.mid} gameInfo={this.state.gameInfo} changeVideo={this.changeVideo.bind(this)}></TabList>
            )
        }
        return (
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
    }
}

export default Game;