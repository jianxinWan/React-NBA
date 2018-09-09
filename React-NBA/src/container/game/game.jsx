import React,{Component} from 'react';
import $ from 'jquery';
import {NavLink} from 'react-router-dom';
import './style/game.less';

import Video from './component/video';
class Game extends Component{
    constructor(props){
        super(props);
        this.state = {
            gameInfo:[],
            getInfoFinished:false
        }
    }
    getGameInfo(){
        let url="http://matchweb.sports.qq.com/html/matchStatV37?mid="+this.props.match.params.mid+"&callback=?";
        $.getJSON(url,(res)=>{
            console.log(res);
            this.setState({
                gameInfo:res[1],
                getInfoFinished:true
            })
        })
    }
    componentDidMount(){
        console.log(this.props.match.params.mid);
        this.getGameInfo();
    }
    render(){
        const gameInfo = this.state.gameInfo;
        let title = null;
        let videoWarp = null;
        if(this.state.getInfoFinished){
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
                <Video vid = {gameInfo.stats[0].list[0].vid}></Video>
            )
        }
        return (
            <div className="game-warp">
                {title}
                {videoWarp}
            </div>
        )
    }
}

export default Game;