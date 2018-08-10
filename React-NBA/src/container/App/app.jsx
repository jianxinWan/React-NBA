import React,{Component} from 'react';

class App extends Component{
    render(){
        return (
            <React.Fragment>
                {this.props.children}
            </React.Fragment>
        )
    }
}
export default App;