import React,{Component} from 'react';
import './loading.less';
class Loading extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className="loading-bar">我是加载进度条</div>
        )
    }
}

export default Loading; 