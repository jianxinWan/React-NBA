import React,{Component} from 'react';

class App extends Component{
    disableMouseWheel(){
        if(document.addEventListener){
            document.addEventListener('DOMMouseScroll',this.scrollFun,false);
        }
        window.onmousewheel = document.onmousewheel = this.scrollFun;
    }
    scrollFun(event){
        event = event || window.event;
        if(event.preventDefault){
            event.preventDefault();
            event.stopPropagation();
        }else{
            event.cancelBubble = true;
            event.returnValue = false;
        }
        return false;
    }
    componentDidMount(){
        this.disableMouseWheel();
    }
    render(){
        return (
            <React.Fragment>
                {this.props.children}
            </React.Fragment>
        )
    }
}
export default App;