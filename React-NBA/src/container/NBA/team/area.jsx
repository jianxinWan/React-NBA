import React,{Component} from 'react';
import './area.less';
import {NavLink} from 'react-router-dom';

import {connect} from 'react-redux';
import {setPageInfo} from '../../../actions/index';

class AreaTeam extends Component{
    constructor(props){
        super(props);
    }
    render(){
        let teamInfo = this.props.areaInfo;
        const {setNowPage}  = this.props;
        let head = teamInfo.rank[0].head.map((item)=>{
            return (
                <th key={item.index} style={{width:item.width+'%'}}>{item.desc}</th>
            )
        })
        let body = teamInfo.rank[0].rows.map((item,index)=>{
            return (
                <tr key={index}>
                        <th onClick={setNowPage}>
                            <NavLink to={`/home/teamDetail/${item.config.id}`}>
                                <div style={{backgroundColor:item.config.color==='0'?'red':'#fff',color:item.config.color==='0'?'#fff':'#000'}}>{index+1}</div>
                                <img src={item.config.icon} />
                                {item.config.name}
                            </NavLink>
                        </th>
                    <th>{item.data.wins}</th>
                    <th>{item.data.losses}</th>
                    <th>{item.data['wining-percentage']}</th>
                    <th>{item.data['games-back']}</th>
                </tr> 
            )
        })
        return (
            <div className="area-team-warp">
                <p className="title">{teamInfo.title}</p>
                <table>
                    <thead>
                        <tr>
                            {head}
                        </tr>
                    </thead>
                    <tbody>
                        {body}
                    </tbody>
                </table>
            </div>
        )
    }
}
let mapState = (state) =>{
    return state;
}
let mapDispatch = (dispatch)=>{
    return {
        setNowPage:() => dispatch(
            setPageInfo('Team')
        )
    }
}

export default connect(mapState,mapDispatch)(AreaTeam);