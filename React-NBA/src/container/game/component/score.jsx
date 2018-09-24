import React,{Component} from 'react';
import './score.less';
class Score extends Component{
    constructor(props){
        super(props);
    }
    render(){
        const matchInfo = this.props.matchInfo;
        return(
            <React.Fragment>
            <div className="scoer-warp">
                    <div className="left team">
                        <img src={matchInfo.leftBadge} />
                        <span>{matchInfo.leftName}</span>
                    </div>
                    <div className="center">
                        <p className="startTime">{matchInfo.startTime}</p>
                        <p>
                            <span>{matchInfo.leftGoal}</span> - <span>{matchInfo.rightGoal}</span>
                        </p>
                        <p className="desc">{matchInfo.matchDesc}</p>
                    </div>
                    <div className="right team">
                        <img src={matchInfo.rightBadge} />
                        <span>{matchInfo.rightName}</span>
                    </div>
                </div>
            </React.Fragment>
        )
        
    }
}
export default Score;