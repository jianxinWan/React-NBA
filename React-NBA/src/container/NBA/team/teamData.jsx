import React,{Component} from 'react';
import $ from 'jquery';
class TeamData extends Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
        console.log(this.props.teamId);
    }
    render(){
        return (
            <div>
                我是球队基本信息
            </div>
        )
    }
}

export default TeamData;