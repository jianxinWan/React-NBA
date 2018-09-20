import React,{Component} from 'react';
import './review.less';
class Review extends Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
        console.log(this.props.gameInfo);
    }
    render(){
        const scoreInfo = this.props.gameInfo.teamInfo;
        const collectionList = this.props.gameInfo.stats[0].list.map((item,index)=>{
            return (
                <div className="collection-item" key={index}>
                    <p className="text">
                        {item.title}
                    </p>
                </div>
            )
        });
        return (
            <div className="review-warp">
                <div className="scoer-warp">
                    <div className="left team">
                        <img src={scoreInfo.leftBadge} />
                        <span>{scoreInfo.leftName}</span>
                    </div>
                    <div className="center">
                        <p>
                            <span>{scoreInfo.leftGoal}</span> - <span>{scoreInfo.rightGoal}</span>
                        </p>
                    </div>
                    <div className="right team">
                        <img src={scoreInfo.rightBadge} />
                        <span>{scoreInfo.rightName}</span>
                    </div>
                </div>
                <div className="collection-warp">
                    <h3>集锦</h3>
                    <div className="collection-list">
                        {collectionList}
                    </div>
                </div>
                <div className="game-new">
                    
                </div>
            </div>            
        )
    }
}
export default Review;