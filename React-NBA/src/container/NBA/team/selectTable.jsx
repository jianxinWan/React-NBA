import React,{Component} from 'react';
import TeamData from './teamData';
import TeamDatum from './teamDatum';
class SelectTable extends Component{
    constructor(props){
        super(props);
        this.state = ({
            nowNav:"数据"
        })
        this.setNowNav = this.setNowNav.bind(this);
    }
    setNowNav(e){
        switch(e.target.innerHTML){
            case '数据':
                this.setState({
                    nowNav:'数据'
                })
                break;
            case '资料':
                this.setState({
                    nowNav:'资料'
                })
                break;
            default:
                this.setState({
                    nowNav:'数据'
                })
                break;
        }
    }
    showComponet(){
        let component = null;
        switch(this.state.nowNav){
            case '数据':
                component = (<TeamData teamId={this.props.teamId} />)
                break;
            case '资料':
                component = (<TeamDatum teamId={this.props.teamId} />)
                break;
            default:
                component = (<TeamData teamId={this.props.teamId} />)
                break;
        }
        return component;
    }
    render(){
        let componentContent = this.showComponet();
        return (
            <React.Fragment>
                <div className="componentNav">
                    <ul onClick={this.setNowNav}>
                        <li className={['base',this.state.nowNav==='数据'?'activeNav':''].join(" ")}>数据</li>
                        <li className={['base',this.state.nowNav==='数据'?'':'activeNav'].join(" ")}>资料</li>
                    </ul>
                </div>
                <div className="componetContent">
                    {componentContent}
                </div>
            </React.Fragment>
        )
    }
}

export default SelectTable;