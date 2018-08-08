import React, { Component } from 'react';

import Regist from './components/register/index';
import Login from './components/login/index';
class App extends Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <div className="login-and-regist">
        <Regist />
        <hr />
        <Login />
      </div>
    );
  }
}

export default App;
