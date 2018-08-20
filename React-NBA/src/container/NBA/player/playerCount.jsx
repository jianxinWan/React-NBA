import React,{Component} from 'react';
import {NavLink} from 'react-router-dom';
import './playerCount.less';

import {connect} from 'react-redux';
import {setPageInfo} from '../../../actions/index';


class PlayerCount extends Component{
    componentDidMount(){
    }
    render(){
        const playerInfo = this.props.playerInfo;
        const {setNowPage}  = this.props;
        let head,body = null
        if(playerInfo){
            head = playerInfo.rank[0].head.map((item)=>{
                return (
                    <th key={item.index} style={{width:item.width}}>{item.desc}</th>
                )
            });
            body = playerInfo.rank[0].rows.map((item,index)=>{
                return ( 
                    <tr key={index}>
                        <th  onClick={setNowPage}>
                            <NavLink to={`/home/playerDetail/${item.config.id}`} >
                                <div style={{backgroundColor:item.config.color==='0'?'red':'#fff',color:item.config.color==='0'?'#fff':'#000'}}>{index+1}</div>
                                <img src={item.config.icon} />
                                {item.config.name}
                            </NavLink>
                        </th>
                        <th>{item.data.team}</th>
                        <th>{item.data.value}</th>                   
                    </tr>
                )
            })
        }
        return (
            <div className="player-warp">
                <p className="player-title">{playerInfo.title}</p>
                <table>
                    <thead>
                        <tr>{head}</tr>
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
            setPageInfo('Player')
        )
    }
}

export default connect(mapState,mapDispatch)(PlayerCount);