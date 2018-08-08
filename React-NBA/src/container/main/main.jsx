import React,{Component} from 'react';
import './main.less';
class Index extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className="main-warp">
                <div className="main-header-warp">
                    <div className="header-left-logo"></div>
                    <div></div>
                </div>
            </div>
        )
    }
}
export default Index;