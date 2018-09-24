import React,{Component} from 'react';
import $ from 'jquery';
import GameTabs from './gameTab';
import Review from './review';
import Datum from './datum';
class TabList extends Component{
    constructor(props){
        super(props);
        this.state = {
            matchResult:{},
            getMatchResultFlag:false
        }
    }
    changeVideo(item){
        this.props.changeVideo(item);
    }
    getMatchResult(){
        $.getJSON('http://matchweb.sports.qq.com/kbs/matchDetail?mid='+ this.props.gameId +'&from=sportsh5&callback=?',(res)=>{
            this.setState({
                matchResult:res,
                getMatchResultFlag:true
            })
        })
    }
    componentDidMount(){
        this.getMatchResult();
    }
    render(){
        let gameTabList = null;
        if(this.state.getMatchResultFlag){
            gameTabList =(
                <GameTabs>
                    <div name="回顾">
                        <Review gameInfo={this.props.gameInfo} matchResult={this.state.matchResult} changeVideo={this.changeVideo.bind(this)} ></Review>
                    </div>
                    <div name="赛事">
                        第二部分
                    </div>
                    <div name="数据">
                        <Datum gameInfo={this.props.gameInfo} matchResult={this.state.matchResult}></Datum>
                    </div>
                    <div name="热议">
                        第四部分
                    </div>
                </GameTabs>
            )
        }
        return (
            <React.Fragment>
                {gameTabList}
            </React.Fragment>
        )
    }
}
export default TabList;