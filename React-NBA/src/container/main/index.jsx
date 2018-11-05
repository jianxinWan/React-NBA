import React,{Component} from 'react';
import {connect} from 'react-redux';

import {
    setPageInfo
} from '../../actions/index';

import Main from  './main';
class Index extends Component{
    componentWillUnmount(){
        this.setState = (state,callback) =>{
            return;
        }
    }
    render(){
        const {Nba,setNowPage} = this.props;
        return (
            <Main setNowPage={setNowPage} nowPage={Nba.nowPage}>
                {this.props.children}
            </Main>
        )
    }
}
let mapState = (state) => {
    return state;
}
let mapDispatch = (dispatch) =>{
    return {
        setNowPage:(...args) => dispatch(
            setPageInfo(...args)
        )
    }
}
export default connect(mapState,mapDispatch)(Index);
