import  React,{Component} from 'react';
import PlayerCard from  './components/playerCard';
import SelectTable from './components/selectTable';
import './playerCount.less';
class PlayerDetail extends Component{
    constructor(props){
        super(props);
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