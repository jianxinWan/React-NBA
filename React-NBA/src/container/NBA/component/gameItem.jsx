import React,{Component} from 'react';
import PropTypes from 'prop-types';

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
        return (
            <div className="game-item">
                <p className="game-desc">
                    <span>{startTime}</span>
                    {gameInfo.matchDesc}
                </p>
                <div className="game-info">
                    <div className="left">
                        <img src={gameInfo.leftBadge} />
                        <h3>{gameInfo.leftName}</h3>
                    </div>
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
                    <div className="right">
                        <img src={gameInfo.rightBadge} />
                        <h3>{gameInfo.rightName}</h3>
                    </div>
                </div>
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