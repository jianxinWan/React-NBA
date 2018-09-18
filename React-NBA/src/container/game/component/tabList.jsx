import React,{Component} from 'react';
import GameTabs from './gameTab';
import Review from './review';
class TabList extends Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
        console.log(this.props.gameId);
    }
    render(){
        return (
            <React.Fragment>
                <GameTabs>
                    <div name="回顾">
                        <Review gameId = {this.props.gameId}></Review>
                    </div>
                    <div name="赛事">
                        第二部分
                    </div>
                    <div name="数据">
                        第三部分
                    </div>
                    <div name="热议">
                        第四部分
                    </div>
                </GameTabs>
            </React.Fragment>
        )
    }
}
export default TabList;