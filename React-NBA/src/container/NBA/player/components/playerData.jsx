import React,{Component} from 'react';
import $ from 'jquery';
import './playerData.less';


class PlayerData extends Component{
    constructor(props){
        super(props);
    }
    componentWillUnmount(){
        this.setState = (state,callback) =>{
            return ;
        }
    }
    getPlayerData(){
        const url="http://matchweb.sports.qq.com/player/stats?playerId="+ this.props.playerId+"&seasonId=2017&seasonType=2&from=h5&_=1535595102247&callback=?"
        $.getJSON(url,(res)=>{
            console.log(res.data);
        })
    }
    componentDidMount(){
        this.getPlayerData();
    }
    render(){
        return (
            <div>我是运动员数据</div>
        )
    }
}

export default PlayerData;