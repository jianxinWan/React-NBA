import React,{Component} from 'react';
import './gameTab.less';
class GameTabs extends Component{
    constructor(props){
        super(props);
        this.state = {
            current:0
        }
    }
    itemNav = (index) => {
        return index === this.state.current ? 'tab-li tab-nav-active' : 'tab-li';
    }
    itemCon = (index) => {
        return index === this.state.current ? 'tab-con tab-con-active' : 'tab-con';
    }
    render(){
        return (
            <div className="tab-warp">
                <ul className="tabList">
                    {
                        React.Children.map(this.props.children,(element,index) => {
                            return (
                                <li onClick={ () => { this.setState({ current: index }) }} className={this.itemNav(index)}>
                                    { element.props.name }
                                </li>
                            )
                        })
                    }
                </ul>
                <div className="tabCont" >
                    {
                        React.Children.map(this.props.children, (element,index) => {
                            return (
                                <div onClick={ () => { this.setState({ current: index }) } } className={this.itemCon(index)}>
                                    { element }
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}
export default GameTabs;