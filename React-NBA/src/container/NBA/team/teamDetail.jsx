import React,{Component} from 'react';
import $ from 'jquery';
import './teamDetail.less';
class TeamDetail extends Component{
    constructor(props){
        super(props);
        this.state = ({
            teamBaseInfo:{},
            getInfoFinished:false
        })
    }
    getTeamInfo(){
        const url = 'http://matchweb.sports.qq.com/team/baseInfo?teamId='+ this.props.match.params.teamId +'&competitionId=100000&from=h5&_=1535617381819&callback=?';
        $.getJSON(url,(res)=>{
            this.setState({
                teamBaseInfo:res.data,
                getInfoFinished:true
            });
        })
    }
    componentDidMount(){
        this.getTeamInfo();
    }
    render(){
        let topCard  = null;
        const baseInfo  = this.state.teamBaseInfo.baseInfo;
        if(this.state.getInfoFinished){
            topCard = (
                <div className="top-card">
                    <img src={baseInfo.logo} />
                </div>
            )
        }
        return (
            <div className="team-detail">
                <div className="top-card">
                    {topCard}
                </div>
            </div>
        )
    }
}

export default TeamDetail;