import React, { Component } from 'react';
import './loading.less';
class Loading extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div style={{'display':this.props.isShow?'block':'none','width':'100%','height':'100%','backgroundColor':'rgba(0,0,0,0.4)','position':'fixed','zIndex':'99'}}>
                <div className="loading-warp">
                    <div className="loading">
                        <i></i>
                        <i></i>
                        <i></i>
                        <i></i>
                        <i></i>
                        <i></i>
                        <i></i>
                        <i></i>
                    </div>
                </div>
            </div>
        )
    }
}
export default Loading;