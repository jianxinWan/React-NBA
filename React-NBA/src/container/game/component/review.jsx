import React,{Component} from 'react';

class Review extends Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
        console.log(this.props.gameId);
    }
    render(){
        return (
            <div>我是Review</div>
        )
    }
}
export default Review;