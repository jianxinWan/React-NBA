import React,{Component} from 'react';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';

import '../style/gameItem.less';

class GameItem extends Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
    }
    render(){
        const gameInfo = this.props.itemInfo;
        const startTime = this.props.itemInfo.startTime.slice(11,16);
        let startMonth = this.props.itemInfo.startTime.slice(5,7);
        let startDay = this.props.itemInfo.startTime.slice(8,10);
        let todyDate = new Date();
        let month = todyDate.getMonth()+1;
        let tody  = todyDate.getDate();
        let scoreWarp = null;
        if(startMonth<month){
            scoreWarp = (
                <div className="game-status">
                    <p>
                        <span>{gameInfo.leftGoal}</span>
                        :
                        <span>{gameInfo.rightGoal}</span>
                    </p>
                    <div className="game-icon">
                        <i className="iconfont icon-iconfontshipin"></i>
                        <span>集锦</span>
                    </div>
                </div>
            )
        }else{
            if(tody<startDay){
                scoreWarp = (
                    <div className="game-status">
                        <div className="live-type">
                            <i className="iconfont icon-iconfontshipin"></i>
                            <span>视频直播</span>
                        </div>
                        <div className="order-btn">
                            <i className="iconfont icon-naozhong"></i>
                            <span>预约</span>
                        </div>
                    </div>
                )
            }else{
                scoreWarp = (
                    <div className="game-status">
                        <p>
                            <span>{gameInfo.leftGoal}</span>
                            :
                            <span>{gameInfo.rightGoal}</span>
                        </p>
                        <div className="game-icon">
                            <i className="iconfont icon-iconfontshipin"></i>
                            <span>集锦</span>
                        </div>
                    </div>
                )
            }
        }
        return (
            <div className="game-item">
                <NavLink to={`/game/${gameInfo.mid}`}>
                    <p className="game-desc">
                        <span>{startTime}</span>
                        {gameInfo.matchDesc}
                    </p>
                    <div className="game-info">
                        <div className="left">
                            <img src={gameInfo.leftBadge} />
                            <h3>{gameInfo.leftName}</h3>
                        </div>
                        {scoreWarp}
                        <div className="right">
                            <img src={gameInfo.rightBadge} />
                            <h3>{gameInfo.rightName}</h3>
                        </div>
                    </div>
                </NavLink>
            </div>
        )
    }
}
GameItem.propTypes = {
    itemInfo:PropTypes.object
}
GameItem.defaultProps = {
    itemInfo:{}
}
export default GameItem;