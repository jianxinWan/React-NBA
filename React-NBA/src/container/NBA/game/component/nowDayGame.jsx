import React,{Component} from 'react';
import PropTypes from 'prop-types';
import GameItem from './gameItem';

import '../style/nowDayGame.less';
class NowDayGame extends Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
    }
    render(){
        let dataString = this.props.nowDayInfo[0].startTime.slice(5,7)+'月'+this.props.nowDayInfo[0].startTime.slice(8,10)+'日';
        const gameList = this.props.nowDayInfo.map((item,index)=>{
            return (
                <div className="game-item-warp" key={index} >
                    <GameItem itemInfo={item} />
                </div>
            )
        })
        return (
            <div className="nowDayGames-warp">
                <p>{dataString}</p>
                {gameList}
            </div>
        )
    }
}
NowDayGame.propTypes = {
    nowDayInfo:PropTypes.array
}
NowDayGame.defaultProps = {
    nowDayInfo:[]
}
export default NowDayGame;