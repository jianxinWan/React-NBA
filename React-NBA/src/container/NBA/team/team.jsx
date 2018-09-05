import React,{Component} from 'react';
import $ from 'jquery';

import AreaTeam from './area';
class Team extends Component{
    constructor(props){
        super(props);
        this.state = ({
            teamArray:[],
            getInfoFinished:false
        })
    }
    getTeamInfo(){
        $.getJSON("http://matchweb.sports.qq.com/html/rank?competitionId=100000&tabType=1&from=kbsh5&_=1534163895546&callback=?",(res)=>{
            this.setState({
                teamArray:res[1],
                getInfoFinished:true
            })
        })
    }
    componentDidMount(){
        this.getTeamInfo();
    }
    render(){
        let areaList = null;
        if(this.state.getInfoFinished){
            areaList = this.state.teamArray.map((item,index)=>{
                return (
                    <AreaTeam key={index} areaInfo={item}></AreaTeam>   
                )
            })
        }
        return (
            <div style={{marginTop:'40px',backgroundColor:'#ebf0f5'}}>
                {areaList}
            </div>
        )
    }
}
export default Team;