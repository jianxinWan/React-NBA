import React,{Component} from 'react';
import './review.less';
import Score from './score';
class Review extends Component{
    constructor(props){
        super(props);
        this.state = {
            current:0
        }
        this.collectionList = this.collectionList.bind(this);
    }
    componentWillUnmount(){
        this.setState = (state,callback) =>{
            return ;
        }
    }
    collectionList(item){
        this.props.changeVideo(item);
    }
    nowVideo = (index)=>{
        return index === this.state.current ? 'collection-item collection-active' :'collection-item';
    }
    render(){
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
                <Score  matchInfo={this.props.matchResult.data.matchInfo} ></Score>
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