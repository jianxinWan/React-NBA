import React,{Component} from 'react';
import $ from 'jquery';
import {NavLink} from 'react-router-dom';
import './style/game.less';
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
        }
        return (
            <div className="game-warp">
                {title}
            </div>
        )
    }
}

export default Game;