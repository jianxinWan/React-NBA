import React,{Component} from 'react';
import axios from 'axios';
import Qs from 'querystring';

class Register extends Component{
    constructor(props){
        super(props);
        this.userRegist = this.userRegist.bind(this);
      }
      userRegist(){
        axios({
          url:'http://localhost:8888/user/register',
          method:'post',
          data:Qs.stringify({
            username:this.refs.username.value,
            email:this.refs.phone.value,
            password:this.refs.password.value,
            actions:'email'
          }),
          withCredentials: true
        }).then((res)=>{
          console.log(res);
        }).catch((err)=>{
          console.log(err);
        })
      }
      componentDidMount(){
      }
      render() {
        return (
          <div className="register">
            <p>账号：</p>
            <input  type="text" ref="username" />
            <p>手机号或邮箱:</p>
            <input  type="text" ref="phone" />
            <br />
            <p>密码:</p>
            <input  type="password" ref="password" />
            <p></p>
            <input  type="submit" value="register" onClick={this.userRegist} />
          </div>
        );
      }
}
export default Register;