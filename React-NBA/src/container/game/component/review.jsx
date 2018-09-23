import React,{Component} from 'react';
import './review.less';
class Review extends Component{
    constructor(props){
        super(props);
        this.state = {
            current:0
        }
        this.collectionList = this.collectionList.bind(this);
    }
    collectionList(item){
        this.props.changeVideo(item);
    }
    componentDidMount(){
        console.log(this.props.changeVideo);
        console.log(this.props.gameInfo);
    }
    nowVideo = (index)=>{
        return index === this.state.current ? 'collection-item collection-active' :'collection-item';
    }
    render(){
        const scoreInfo = this.props.gameInfo.teamInfo;
        const collectionList = this.props.gameInfo.stats[0].list.map((item,index)=>{
            return (
                <div className={this.nowVideo(index)} key={index} onClick={()=>{
                    this.setState({current:index});
                    this.collectionList(item)
                }}>
                    <p className="text">
                        {item.title}
                    </p>
                    <span className="tag">{item.tag}</span>
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