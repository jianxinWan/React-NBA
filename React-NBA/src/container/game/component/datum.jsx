import React,{Component} from 'react';
import './datum.less';
import Score from './score';
class Datum extends Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
        console.log(this.props.gameInfo);
    }
    render(){
        let gameDatum = null;
        let goalsTable = null;
        let mvpPlayer = null;
        const matchInfo = this.props.matchResult.data.matchInfo;
        const gameInfo = this.props.gameInfo;
        if(matchInfo.goals){
            goalsTable=(
                <div className="match-result">
                        <h3>赛况</h3>
                        <table className="match-result-tab">
                            <thead>
                                <tr>
                                    <th width="40%" style={{textAlign:'left'}}>球队</th>
                                    <th width="12%">1st</th>
                                    <th width="12%">2st</th>
                                    <th width="12%">3st</th>
                                    <th width="12%">4st</th>
                                    <th width="12%">总分</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th className="team"><img src={matchInfo.leftBadge} /><span>{matchInfo.leftName}</span></th>
                                    <th>{matchInfo.goals["1"].awayGoal}</th>
                                    <th>{matchInfo.goals["2"].awayGoal}</th>
                                    <th>{matchInfo.goals["3"].awayGoal}</th>
                                    <th>{matchInfo.goals["4"].awayGoal}</th>
                                    <th>{matchInfo.goals["9"].awayGoal}</th>
                                </tr>
                                <tr>
                                    <th className="team"><img src={matchInfo.rightBadge} /><span>{matchInfo.rightName}</span></th>
                                    <th>{matchInfo.goals["1"].homeGoal}</th>
                                    <th>{matchInfo.goals["2"].homeGoal}</th>
                                    <th>{matchInfo.goals["3"].homeGoal}</th>
                                    <th>{matchInfo.goals["4"].homeGoal}</th>
                                    <th>{matchInfo.goals["9"].homeGoal}</th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
            )
        }
        if(gameInfo){
            mvpPlayer = (
                <div className="mvp-player">
                    <h3>本场最佳</h3>
                    <p>哈哈哈</p>
                    <table className="mvp-player-table">
                        <thead>
                            <tr>
                                <th><img src={gameInfo.teamInfo.leftBadge} /><span>{gameInfo.teamInfo.leftName}</span></th>
                                <th>222222</th>
                                <th><img src={gameInfo.teamInfo.rightBadge} /><span>{gameInfo.teamInfo.rightName}</span></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th></th>
                                <th></th>
                                <th></th>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )
        }
        if(this.props.gameInfo){
            gameDatum = (
                <div className="game-datum-warp">
                    <Score  matchInfo={matchInfo} ></Score>
                    {goalsTable}
                    {mvpPlayer}
                </div>
            )
        }
        return (
            <React.Fragment>
                {gameDatum}
            </React.Fragment>   
        )
    }
}
export default Datum;