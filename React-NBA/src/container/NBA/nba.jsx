import React,{Component} from 'react';
import $ from 'jquery';
import './nba.less';
import NowDayGame from './game/component/nowDayGame';


class NBA extends Component{
    constructor(props){
        super(props);
        this.state = ({
            getInfoFinished:false,
            gameInfo:{},
            ST:"2018-07-16",
            EN:"2018-08-04"
        })
    }
    isTopOrBottom(){
        const a = window.innerHeight || document.documentElement.clientHeight ||document.body.clientHeight;
        const b = document.documentElement.scrollTop === 0? document.body.scrollTop :document.documentElement.scrollTop;
        const c = document.documentElement.scrollTop === 0? document.body.scrollHeight:document.documentElement.scrollHeight;
        if(document.body.scrollTop ===0 && document.documentElement.scrollTop === 0){
            this.reachTheTop();
        }
        if(a+Math.floor(b) === c || a+Math.ceil(b) === c){
            this.reachTheBottom();
        } 
    }
    setInitDate(){
        this.setState({

        })
    }
    getDateStr(dateStr,day,type){
        //1代表向前，0代表向后
        let startStr = dateStr+' 00:00:00';
        let formatTimeS = new Date(startStr).getTime();
        let newStartDate,newStartStr;
        if(type===1){
            newStartDate = new Date(formatTimeS-day*24*60*60*1000);
            if(newStartDate.getMonth()===8){
                console.log("1111");
                this.setState({
                    ST:'2018-08-04'
                })
                return '2018-08-04';
            }
            newStartStr = newStartDate.getFullYear()+'-'+(newStartDate.getMonth()+1)+ '-' +newStartDate.getDate();
            this.setState({
                ST:newStartStr
            })
        }else{
            newStartDate = new Date(formatTimeS+day*24*60*60*1000);
            if(newStartDate.getMonth()===8 || newStartDate.getMonth()===7){
                this.setState({
                    EN:'2018-10-17'
                })
                return '2018-10-17';
            }
            newStartStr = newStartDate.getFullYear()+'-'+(newStartDate.getMonth()+1)+ '-' +newStartDate.getDate();
            this.setState({
                EN:newStartStr
            })
        } 
        return newStartStr;
    }
    reachTheTop(){
        let newStr = this.getDateStr(this.state.ST,3,1);
        const url1 = "http://matchweb.sports.qq.com/kbs/list?columnId=100000&startTime="+ newStr +"&endTime="+ this.state.ST+"&_=1533819150895&callback=?";
        $.getJSON(url1, (res)=> {
            const topInfo = res.data;
            const nowInfo = this.state.gameInfo;
            this.setState({
                gameInfo:{...topInfo,...nowInfo}
            })
        });
    }
    reachTheBottom(){
        let nowStr = this.state.EN;
        let newStr = this.getDateStr(this.state.EN,3,0);
        const url2 = "http://matchweb.sports.qq.com/kbs/list?columnId=100000&startTime="+ nowStr +"&endTime="+ newStr +"&_=1533819150895&callback=?";
        $.getJSON(url2, (res)=> {
            let bottomInfo = res.data;
            let nowInfo = this.state.gameInfo;
            this.setState({
                gameInfo:{...nowInfo,...bottomInfo}
            })
        });
    }
    getGameList(){
        $.getJSON("http://matchweb.sports.qq.com/kbs/list?columnId=100000&startTime=2018-07-16&endTime=2018-08-04&_=1533819150895&callback=?", (res)=> {
            this.setState({
                gameInfo:res.data,
                getInfoFinished:true
            })
        });
    }
    componentDidMount(){
        this.getGameList();
        window.onscroll = ()=>{
            this.isTopOrBottom(); 
        }
    }
    render(){
        let  gameList = [];
        let gameDom = null;
        if(this.state.getInfoFinished){
            for(let key in this.state.gameInfo){
                gameList.push(this.state.gameInfo[key]);
            }
            gameDom = gameList.map((item,index)=>{
                return (
                    <NowDayGame nowDayInfo = {item} key={index} />
                )
            })
        }
        return(
            <div className="nba-warp">
                {gameDom}
            </div>
        )
    }
}
export default NBA;