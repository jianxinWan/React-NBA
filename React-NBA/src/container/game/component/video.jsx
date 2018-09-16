import React,{Component} from 'react';
import $  from 'jquery';
import './video.less';
class Video extends Component{
    constructor(props){
        super(props);
        this.state = ({
            videoUrl : "",
            getUrlFinish:false,
            showPase:false,
            showControlFlag:false,
            currentTime:"00:00",
            duration:"00:00"
        })
        this.pasePlay  = this.pasePlay.bind(this);
        this.showControl = this.showControl.bind(this);
        this.getPlayTime = this.getPlayTime.bind(this);
        this.showFullScren = this.showFullScren.bind(this);
        this.onEnded = this.onEnded.bind(this);
        this.changePlayTime = this.changePlayTime.bind(this);
    }
    showControl(){
        this.setState({
            showControlFlag:this.state.showControlFlag ? false:true
        })
    }
    changeTimeStr(time){
        let secondNum = Math.round(time);
        let second = secondNum % 60;
        let minute = Math.round(secondNum/60);
        second = second>10 ? second : '0' + second;
        minute = minute>10 ? minute :'0'+ minute;
        return minute + ':' + second ;
    }
    pasePlay(){
        const video = this.refs.video;
        if (video.paused){
            video.play(); 
            this.setState({
                showPase:false
            })
        } 
        else{
            video.pause();
            this.setState({
                showPase:true
            })
        } 
    }
    getPlayTime(){
        let video = this.refs.video;
        this.setState({
            duration:video.duration
        })
        setInterval(()=>{
            this.setState({
                currentTime:video.currentTime
            })
        },1000);
    }
    onEnded(){
        this.setState({
            showPase:true
        })
    }
    showFullScren(){
        const video = this.refs.video;
        video.webkitRequestFullScreen();
    }
    getVideoUrl(resolve){
        const url = "http://h5vv.video.qq.com/getinfo?callback=?&platform=11001&charge=0&otype=json&ehost=http%3A%2F%2Fsports.qq.com&sphls=1&sb=1&nocache=0&_rnd=1536484898&guid=094fb994538cb2bce6416a71264523c7&appVer=V2.0Build9500&vids="+ this.props.vid +"&defaultfmt=auto&&_qv_rmt=JmrCi+j3A13449HOL=&_qv_rmt2=g61U6tlp156888yhw=&sdtfrom=v5010&callback=?";
        $.getJSON(url,(res)=>{
            const videoUrl = "http://117.34.59.30/sports.tc.qq.com/A811j1pG6Zg_OjiB-VYjLg_nwfPoBqBGA-C134ruJ9kM/"+res.vl.vi[0].fn+"?vkey=" +res.vl.vi[0].fvkey+"&guid=094fb994538cb2bce6416a71264523c7";
            resolve();
            this.setState({
                videoUrl:videoUrl,
                getUrlFinish:true
            })
        })
    }
    changePlayTime(e){
        const playBar = e.target;
        console.log(e.clientX,e.clientY);
        console.log(playBar.offsetLeft);
    }
    componentDidMount(){
        const promise  = new Promise((resolve,reject)=>{
            this.getVideoUrl(resolve);
        }).then(()=>{
        }).catch((err)=>{
            console.log(err);
        })
    }
    render(){
        let urlWarp = null;
        if(this.state.getUrlFinish){
            urlWarp = (
                <div className="video-warp">
                    <div className="video-show">
                        <video ref="video" name="media" autoPlay="autoPlay" width="100%" height="auto" onClick={this.showControl} onPlay={this.getPlayTime} onEnded={this.onEnded}>
                            <source src={this.state.videoUrl} type="video/mp4" />
                        </video>
                    </div>
                    {   this.state.showPase ? 
                        <div className="video-play-btn" onClick={this.pasePlay}>
                            <span className="btn-play-icon"></span>  
                        </div> :
                        " "
                    }
                    <div className={['video-control-warp',this.state.showControlFlag?'slideInBottom':'slideOutBottom'].join(' ')}>
                        <div className="control-pase-btn" onClick={this.pasePlay}>
                            {
                                this.state.showPase ? 
                                <div className="pase">
                                </div> : 
                                <div className="playing">
                                    <div className="play-bar"></div>
                                    <div className="play-bar"></div>
                                </div>
                            }
                        </div>
                        <div className="control-time-bar">
                            <div className="play-all-bar" onClick={this.changePlayTime}>
                                <div className="play-actual-bar" style={{width:(this.state.currentTime/this.state.duration)*100+'%'}}></div>
                                <span style={{left:(this.state.currentTime/this.state.duration)*100+'%'}}></span>
                            </div>
                            <div className="play-time">
                                <p>
                                    <span>{this.changeTimeStr(this.state.currentTime)}</span>/<span>{this.changeTimeStr(this.state.duration)}</span>
                                </p>
                            </div>
                        </div>
                        <div className="control-full-screen" onClick={this.showFullScren}>
                            <i className="iconfont icon-quanping"></i>
                        </div>
                    </div>
                </div>
            )
        }
        return (
            <React.Fragment>
                {urlWarp}
            </React.Fragment>
        )
    }
}
export default Video;