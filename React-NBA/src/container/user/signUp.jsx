import React, { Component } from 'react';
import './signUp.less';
class SignUp extends Component{
    constructor(props){
        super(props);
        this.regVerify = this.regVerify.bind(this);
    }
    regVerify(e){

    }
    render(){
        return (
            <div className="sign-warp">
                <div className="top-logo">
                    我是注册头部logo
                </div>
                <div className="form-warp">
                    <input type="text" placeholder="用户名" onKeyUp={this.regVerify}  />
                    <input type="text" placeholder="手机号" onKeyUp={this.regVerify}  />
                    <input type="text" placeholder="第一次输入密码" onKeyUp={this.regVerify} />
                    <input type="text" placeholder="第二次输入密码" onKeyUp={this.regVerify} />
                    <div className="code-warp" >
                        <input type="text" placeholder="请输入邮箱中的验证码" />
                        <div className="code"></div>
                    </div>
                    <div className="signUp-btn">
                        注册
                    </div>
                </div>
            </div>
        )
    }
}
export default SignUp;
