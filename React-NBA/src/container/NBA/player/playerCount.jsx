import React,{Component} from 'react';

import './playerCount.less';

class PlayerCount extends Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
    }
    render(){
        const playerInfo = this.props.playerInfo;
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
                        <th>
                            <div style={{backgroundColor:item.config.color==='0'?'red':'#fff',color:item.config.color==='0'?'#fff':'#000'}}>{index+1}</div>
                            <img src={item.config.icon} />
                            {item.config.name}
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

export default PlayerCount;