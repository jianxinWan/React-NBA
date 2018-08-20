import  React,{Component} from 'react';
import $ from 'jquery';


import PlayerCard from  './components/playerCard';
import SelectTable from './components/selectTable';
import './playerCount.less';
class PlayerDetail extends Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
        console.log(this.props.match.params.playerId);
    }
    render(){
        return (
            <React.Fragment>
                <PlayerCard playerId={this.props.match.params.playerId}></PlayerCard>
                <SelectTable playerId={this.props.match.params.playerId}></SelectTable>
            </React.Fragment>
        )
    }
}

export default PlayerDetail;