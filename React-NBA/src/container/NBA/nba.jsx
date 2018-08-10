import React,{Component} from 'react';
import $ from 'jquery';

import NowDayGame from './component/nowDayGame';


class NBA extends Component{
    constructor(props){
        super(props);
        this.state = ({
            getInfoFinished:false,
            gameInfo:{}
        })
    }
    getGameList(){
        $.getJSON("http://matchweb.sports.qq.com/kbs/list?columnId=100000&startTime=2018-07-14&endTime=2018-08-04&_=1533819150895&callback=?", (res)=> {
            this.setState({
                gameInfo:res.data,
                getInfoFinished:true
            })
        });
    }
    componentDidMount(){
        this.getGameList();
    }
    render(){
        let  gameList = [];
        let gameDom = null;
        if(this.state.getInfoFinished){
            for(let key in this.state.gameInfo){
                gameList.push(this.state.gameInfo[key]);
            }
            gameDom = gameList.map((item,index)=>{
                return (
                    <NowDayGame nowDayInfo = {item} key={index} />
                )
            })
        }
        return(
            <div>{gameDom}</div>
        )
    }
}
export default NBA;