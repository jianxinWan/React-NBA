import React,{Component} from 'react';
import axios from 'axios';
import Qs from 'querystring';

class Login extends Component{
    constructor(props){
        super(props);
        this.getVcode = this.getVcode.bind(this);
        this.userLogin = this.userLogin.bind(this);
      }
      getVcode(){
        axios.get('http://localhost:8888/vcode',{
          withCredentials: true
        })
        .then(function (res) {
          this.refs.codeWarp.innerHTML = res.data.data;
        }.bind(this))
        .catch(function (error) {
          alert("验证码获取出错");
        });
      }
      userLogin(){
        axios({
          url:'http://localhost:8888/user/loginTo',
          method:'post',
          data:Qs.stringify({
            username:this.refs.username.value,
            password:this.refs.pass.value,
            vcode:this.refs.vcode.value
          }),
          withCredentials: true
        }).then((res)=>{
          console.log(res);
        }).catch((err)=>{
          console.log(err);
        })
      }
      componentDidMount(){
        this.getVcode();
      }
      render() {
        return (
          <div className="Login">
            <p>账号：</p>
            <input  type="text" ref="username" />
            <p>密码：</p>
            <input  type="password" ref="pass" />
            <br />
            验证码：<div onClick={this.getVcode} ref="codeWarp"></div>
            <input  type="text" ref="vcode" />
            <p></p>
            <input  type="submit" value="login" onClick={this.userLogin} />
          </div>
        );
      }
}
export default Login;