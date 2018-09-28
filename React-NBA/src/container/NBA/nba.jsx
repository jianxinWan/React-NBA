import React,{Component} from 'react';

import {connect} from 'react-redux';
import {setPageInfo} from '../../actions/index';


import $ from 'jquery';
import './nba.less';
import NowDayGame from './game/component/nowDayGame';
class NBA extends Component{
    constructor(props){
        super(props);
        this.state = ({
            getInfoFinished:false,
            gameInfo:{},
            ST:"",
            EN:""
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
    getDate(date){
        const dateObj = new Date(date);
        return dateObj.getFullYear()+'-'+(dateObj.getMonth()+1)+'-'+dateObj.getDate();
    }
    setInitDate(){
        let mydata = new Date();
        const month = new Date().getMonth();
        if(month===6 ||month === 7||month===8){
            this.setState({
                ST:"2018-07-18",
                EN:"2018-10-01"
            })
        }else{
            this.setState({
                ST:this.getDate(mydata.setDate(mydata.getDate()-2)),
                EN:this.getDate(mydata.setDate(mydata.getDate()+2))
            })
        }
    }
    getDateStr(dateStr,day,type){
        //1代表向前，0代表向后
        let startStr = dateStr+' 00:00:00';
        let formatTimeS = new Date(startStr).getTime();
        let newStartDate,newStartStr;
        if(type===1){
            newStartDate = new Date(formatTimeS-day*24*60*60*1000);
            if(newStartDate.getMonth()===8 || newStartDate.getMonth()===7){
                this.setState({
                    ST:'2018-07-18'
                })
                return '2018-07-18';
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
        const {setNowPage}  = this.props;
        $.getJSON("http://matchweb.sports.qq.com/kbs/list?columnId=100000&startTime="+ this.state.ST+"&endTime="+ this.state.EN+"&_=1533819150895&callback=?", (res)=> {
            setNowPage();
            this.setState({
                gameInfo:res.data,
                getInfoFinished:true
            })
        });
    }
    componentDidMount(){
        window.onscroll = ()=>{
            this.isTopOrBottom(); 
        }
        const promise = new Promise((resolve,reject)=>{
            this.setInitDate();
            resolve();
        }).then(()=>{
            this.getGameList();
        }).catch((err)=>{
            console.log(err);
        })
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
const mapState = (state)=>{
    return state;
}
const mapDispatch = (dispatch)=>{
    return {
        setNowPage:()=>dispatch(
            setPageInfo('NBA')
        )
    }
}
export default connect(mapState,mapDispatch)(NBA);