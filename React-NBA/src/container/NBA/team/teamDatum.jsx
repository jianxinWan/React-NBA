import React,{Component} from 'react';
import {NavLink} from 'react-router-dom';
import './teamDatum.less';
import $ from 'jquery';

class TeamDatum extends Component{
    constructor(props){
        super(props);
        this.state = ({
            baseInfo:{},
            getBaseInfoFlag:false,
            playerMakeup:{},
            getPlayerFlag:false
        })
    }
    getBase(){
        const url = 'http://matchweb.sports.qq.com/team/baseInfo?teamId='+ this.props.teamId +'&competitionId=100000&from=h5&_=1536058876632&callback=?';
        $.getJSON(url,(res)=>{
            this.setState({
                baseInfo:res.data,
                getBaseInfoFlag:true
            })
        })
    }
    getPlaerMakeup(){
        const url = 'http://matchweb.sports.qq.com/team/players?teamId='+ this.props.teamId+'&competitionId=100000&_=1536059260690&callback=?';
        $.getJSON(url,(res)=>{
            this.setState({
                playerMakeup:res.data,
                getPlayerFlag:true
            })
        })
    }
    componentDidMount(){
        this.getBase();
        this.getPlaerMakeup();
    }
    render(){
        let baseWarp = null;
        let playerMakeup = null;
        if(this.state.getBaseInfoFlag){
            const base  = this.state.baseInfo.baseInfo;
            baseWarp = (
                <div className="base-warp">
                    <p className="title">基本信息</p>
                    <p className="team-introduce">{base.brief}</p>
                    <hr />
                    <div className="game-abstract">
                        <table>
                            <tbody><tr><td width="20%"><span>现任教练：</span></td>
                                <td width="35%">{base.coach}</td>
                                <td width="15%"><span>城市：</span></td>
                                <td width="40%">{base.city}</td>
                            </tr>
                            <tr>
                                <td width="20%"><span>联盟排名：</span></td>
                                <td width="35%"><span>第<em>1</em>名</span></td>
                                <td width="15%"><span>场馆：</span></td>
                                <td width="40%">{base.venue}</td>
                            </tr>
                        </tbody>
                    </table>
                    </div>
                </div>
            )
        }
        
        if(this.state.getPlayerFlag){
            const playerList = this.state.playerMakeup.map((item,index)=>{
                return (
                    <tr key={index}>
                        <td className="playerLogo">
                            <NavLink to={`/home/playerDetail/${item.playerId}`}>
                                <span className="jerNum">{item.jerseyNum}</span>
                                <img src={item.logo} />
                            </NavLink>
                        </td>
                        <td><NavLink to={`/home/playerDetail/${item.playerId}`}><span>{item.cnName}</span></NavLink>
                        </td>
                        <td><span>{item.position}</span></td>
                        <td><span>{item.wage}</span></td>
                    </tr>
                )
            })
            playerMakeup = (
                <div className="player-makeup">
                    <p className="title">球员阵容</p>
                    <table>
                        <thead>
                            <tr>
                                <th width="18%">号码</th>
                                <th width="37%">名字</th>
                                <th width="26%">位置</th>
                                <th width="19%" class="salary-head">薪资(万$)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {playerList}
                        </tbody>
                    </table>
                </div>
            )
        }
        return (
            <div className="team-datum">
                {baseWarp}
                {playerMakeup}
            </div>
        )
    }
}

export default TeamDatum;