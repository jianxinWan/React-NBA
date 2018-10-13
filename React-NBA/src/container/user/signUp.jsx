import React, { Component } from 'react';
import './signUp.less';
class SignUp extends Component{
    constructor(props){
        super(props);
        this.state = {
            showCode:false,
            regEmail:false
        }
        this.checkNumFun = this.checkNumFun.bind(this);
    }
    checkNumFun(){
        let numInput = this.refs.regNum;
        let regPhone = /^[1][3,4,5,6,7,8][0-9]{9}$/;
        let regEmail = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
        if(regEmail.test(numInput.value)){
            this.setState({
                regEmail:false
            })   
        }else{
            this.setState({
                regEmail:true
            })
        }
        if(numInput.value === ''){
            this.setState({
                regEmail:false
            })
        }
    }
    componentDidMount(){

    }
    render(){
        let getCodeFlag = this.state.showCode;
        let btnWord = null;
        if(!getCodeFlag){
            btnWord = '获取邮箱验证码';
        }else{
            btnWord = '注册';
        }
        return(
            <React.Fragment>
                <div className="signUp-warp">
                   <div className="logo-warp">
                        <img src="http://mat1.gtimg.com/sports/nba/logo/1602/10.png" />
                   </div>
                   <div className="form-warp">
                        <input type="text" placeholder="请输入你的邮箱" onKeyUp={this.checkNumFun} ref="regNum" onKeyUp = {this.checkNumFun} />
                        <input type="text" placeholder="邮箱验证码" style={{'display':this.state.showCode?'block':'none'}} onKeyUp={this.checkNumFun} ref="num"/>
                        <div className="getEmailCode">{btnWord}</div>
                   </div>
                   <div className="error-warp" style={{'display':this.state.regEmail?'block':'none'}}>
                        <p style={{'display':this.state.checkNum?'none':'block','color':'red'}}>请输入正确格式的邮箱</p>
                   </div>
                </div>
            </React.Fragment>
        )
    }
}
export default SignUp;