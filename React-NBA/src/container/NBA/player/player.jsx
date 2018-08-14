import React,{Component} from 'react';
import $ from 'jquery';
import PlayerCount from './playerCount';


class Player extends Component{
    constructor(props){
        super(props);
        this.state = ({
            playerArray:[],
            getInfoFinished:false
        })
    }
    getPlayInfo(){
        const url = "http://matchweb.sports.qq.com/html/rank?competitionId=100000&tabType=20&from=kbsh5&_=1534208461344&callback=?"
        $.getJSON(url,(res)=>{
            this.setState({
                playerArray:res[1],
                getInfoFinished:true
            })
        })
    }
    componentDidMount(){
        this.getPlayInfo();
    }
    render(){
        let playerCount = null
        if(this.state.getInfoFinished){
            playerCount = this.state.playerArray.map((item,index)=>{
                return (
                    <PlayerCount key={index} playerInfo = {item}></PlayerCount>
                )
            })
        }
        return (
            <div style={{marginTop:'40px'}}>{playerCount}</div>
        )
    }
}
export default Player;