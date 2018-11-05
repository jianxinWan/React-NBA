import React,{Component} from 'react';
import './datum.less';
import Score from './score';
class Datum extends Component{
    constructor(props){
        super(props);
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
            const playerList = gameInfo.stats[3].basketballBestPlayers.map((item,index)=>{
                return (
                    <tr key={index} className="player-tr">
                        <th width="40%" className="left">
                            <img src={item.leftPlayer.icon} />
                            <div className="num-and-name" style={{'textAlign':'left'}}>
                                <span >{item.leftPlayer.jerseyNum}</span>
                                <span>{item.leftPlayer.name}</span>
                            </div>
                            <span>{item.leftVal}</span>
                        </th>
                        <th width="20%" className="center">{item.text}</th>
                        <th width="40%" className="right">
                            <span>{item.rightVal}</span>
                            <div className="num-and-name" style={{'textAlign':'right'}}>
                                <span >{item.rightPlayer.jerseyNum}</span>
                                <span>{item.rightPlayer.name}</span>
                            </div>
                            <img src={item.rightPlayer.icon} />
                        </th>
                    </tr>
                )
            })
            mvpPlayer = (
                <div className="mvp-player">
                    <h3>本场最佳</h3>
                    <table className="mvp-player-table">
                        <thead>
                            <tr>
                                <th className="left" width="40%"><img src={gameInfo.teamInfo.leftBadge} /><span>{gameInfo.teamInfo.leftName}</span></th>
                                <th width="20%" className="center">vs</th>
                                <th className="right" width="40%"><span>{gameInfo.teamInfo.rightName}</span><img src={gameInfo.teamInfo.rightBadge} /></th>
                            </tr>
                        </thead>
                        <tbody>
                            {playerList}
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