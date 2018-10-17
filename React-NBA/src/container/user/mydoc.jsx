import React,{Component} from 'react';
import axios from 'axios';
// import $ from 'jquery';
import './mydoc.less';
class Mydoc extends Component{
    constructor(props){
        super(props);
        this.getUserInfo = this.getUserInfo.bind(this);
    }
    getUserInfo(){
        const token = sessionStorage.getItem('token');
        console.log(token);
        axios.get('http://localhost:8848/user/getUserInfo',{
            headers: {'Authorization': token}
        }).then((res)=>{
            console.log(res);
        }).catch((err)=>{
            console.log(err);
        })
    }
    componentDidMount(){
        this.getUserInfo();
    }
    render(){
        return (
            <React.Fragment>
                <div className="mydoc-warp">
                    <div className="top-card-warp">
                        <div className="user-picture-warp" onClick={this.getUserInfo}></div>
                    </div>
                    <div className="list">
                        <ul>
                            <li>我喜欢的球星</li>
                        </ul>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
export default Mydoc;