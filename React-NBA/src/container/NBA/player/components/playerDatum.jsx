import React,{Component} from 'react';
import $ from 'jquery';

import './playerDatum.less';
class PlayerDatum extends Component{
    constructor(props){
        super(props);
        this.state = {
            playerBaseInfo:{},
            getInfoFlag:false
        }
    }
    getDatum(){
        const url = 'http://matchweb.sports.qq.com/player/profile?playerId='+ this.props.playerId+'&from=h5&_=1535504572047&callback=?';
        $.getJSON(url,(res)=>{
            if(res.data){
                this.setState({
                    playerBaseInfo:res.data,
                    getInfoFlag:true
                })
            }
        })
    }
    componentDidMount(){
        this.getDatum();
    }
    render(){
        let dayumWarp = null;
        let careerList = null;
        let honorList = null;
        const datum = this.state.playerBaseInfo;
        if(this.state.getInfoFlag){
            careerList = datum.career.teams.map((item,index)=>{
                return (
                    <span key={index}>{item}</span>
                )
            })
            honorList = datum.honor.map((item,index)=>{
                return (
                    <p key={index}>
                        <span>-</span>
                        <span>{item.name}</span>
                        <span>{item.times}次</span>
                        <span>{item.desc}</span>
                    </p>
                )
            })
            dayumWarp = (
                <div className='datum-warp'>
                    <p>基本信息</p>
                    <div className="base-warp">
                        <table>
                            <thead>
                                <tr>
                                    <th width="15%">{datum.baseInfo.height}</th>
                                    <th width="20%">{datum.baseInfo.weight}</th>
                                    <th width="20%">{datum.baseInfo.arm}cm</th>
                                    <th width="20%">{datum.baseInfo.jerseyNum}号</th>
                                    <th width="25%">{datum.baseInfo.age}岁</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th>身高</th>
                                    <th>体重</th>
                                    <th>臂长</th>
                                    <th>{datum.baseInfo.position}</th>
                                    <th>{datum.baseInfo.birthDate}</th>
                                </tr>
                            </tbody>
                        </table>
                        <hr/>
                        <div className="description">
                            {datum.baseInfo.description}
                        </div>
                    </div>
                    <p>生涯信息</p>
                    <div className="career-warp">
                        <table width="100%">
                            <tbody>
                            <tr>
                                <td width="30%"><span>高中</span></td>
                                <td width="70%"><span>{datum.career.cnHighSchool}</span></td>
                            </tr>
                            <tr>
                                <td><span>大学</span></td>
                                <td><span>{datum.career.cnCollege}</span></td>
                            </tr>
                            <tr>
                                <td><span>选秀</span></td>
                                <td><span>{datum.career.draft}</span></td>
                            </tr>
                            <tr>
                                <td><span>职业生涯</span></td>
                                <td>
                                    {careerList}
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <p>荣誉</p>
                    <div className="honor-warp">
                        {honorList}
                    </div>
                </div>
            )
        }
        return (
            <React.Fragment>
                {dayumWarp}
            </React.Fragment>
        )
    }
}

export default PlayerDatum;