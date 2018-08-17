import React,{Component} from 'react';
import {connect} from 'react-redux';

import Main from  './main';
class Index extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div>
                <Main></Main>
            </div>
        )
    }
}
function mapState(state) {
    console.log(state);
    return { nowPage: state.nowPage }
}
  
function mapDispatch(dispatch) {
    return {
        setNowPage:()=>{
            dispatch(
                
            )
        }
    }
}
export default Index;
