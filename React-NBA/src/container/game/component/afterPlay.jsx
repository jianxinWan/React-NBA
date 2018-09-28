import React,{Component} from 'react';
import AfterPlayCard from './afterPlayCard';
import {NavLink} from 'react-router-dom';
import './afterPlay.less';
class AfterPlay extends Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
        console.log(this.props.gameInfo);
    }
    render(){
        const gameInfo = this.props.gameInfo;
        let afterWarp = null;
        let afterPlayCard  = null;
        let datumWarp = null;
        let futureGame = null;
        if(this.props.gameInfo){
            const gameItem = gameInfo.stats[1].teamMatches.map((item,index)=>{
                let date = Number(item.startTime.slice(5,7))+'月'+ Number(item.startTime.slice(8,10)) +'日';
                let hour = item.startTime.slice(11,16);
                return (
                    <NavLink to={`/game/${item.mid}`} key={index}>
                        <div className="future-item" >
                            <div className="left logo">
                                <img src={item.leftBadge} />
                                <span>{item.leftName}</span>                       
                            </div>
                            <div className="center">
                                <p className="date">
                                    <span>{date}</span>
                                    <span>{hour}</span>
                                </p>
                                <h4>vs</h4>
                                <p>{item.competitionName}</p>
                            </div>
                            <div className="right logo">
                                <img src={item.rightBadge} />
                                <span>{item.rightName}</span> 
                            </div>
                        </div>
                    </NavLink>
                )
            })
            afterPlayCard = ( 
                <AfterPlayCard teamInfo={this.props.gameInfo.teamInfo}></AfterPlayCard>
            )
            datumWarp = (
                <div className="after-datum">
                    <h3>数据</h3>
                    <div className="datum">
                        {gameInfo.stats[0].vs[0].title}
                        <div>
                            <span>{gameInfo.stats[0].vs[0].item.win}</span>
                            <span>{gameInfo.stats[0].vs[0].item.loss}</span>
                        </div>
                    </div>
                </div>
            )
            futureGame = (
                <div className="future-game-warp">
                    <h3>未来场次</h3>
                    {gameItem}
                </div>
            )
            afterWarp = (
                <div className="after-all">
                    {afterPlayCard}
                    {datumWarp}
                    {futureGame}
                </div>
            )
        }
        return(
            <React.Fragment>
                {afterWarp}
            </React.Fragment>
        )
    }
}
export default AfterPlay;