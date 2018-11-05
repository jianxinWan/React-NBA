import React, { Component } from 'react';
import './afterPlayCard.less';
class AfterPlayCard extends Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
        console.log(this.props.teamInfo);
    }
    render(){
        let afterWarp = null;
        const teamInfo = this.props.teamInfo;
        if(this.props.teamInfo){
            afterWarp = (
                <div className="after-play-card">
                    <div className="background">
                        <div className="gradient"></div>
                        <div className="gradient"></div>
                        <div className="gradient"></div>
                    </div>
                    <div className="content">
                        <div className="card-center">
                            <div className="left logo">
                                <img src={teamInfo.leftBadge} />
                                <span>{teamInfo.leftName}</span>
                            </div>
                            <div className="center">
                                {teamInfo.leftGoal === "0" ? (
                                <React.Fragment>
                                    <h1>VS</h1>
                                </React.Fragment>):(<React.Fragment>
                                    <h2>{teamInfo.leftGoal}</h2>
                                    <h2>:</h2>
                                    <h2>{teamInfo.rightGoal}</h2>
                                </React.Fragment>)}
                                
                            </div>
                            <div  className="right logo">
                                <img src={teamInfo.rightBadge} />
                                <span>{teamInfo.rightName}</span>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        return (
            <React.Fragment>
                {afterWarp}
            </React.Fragment>
        )
    }
}
export default AfterPlayCard;