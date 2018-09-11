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
            showControlFlag:false
        })
        this.pasePlay  = this.pasePlay.bind(this);
        this.showControl = this.showControl.bind(this);
    }
    showControl(){
        this.setState({
            showControlFlag:this.state.showControlFlag ? false:true
        })
    }
    pasePlay(){
        const video = this.refs.video;
        if (video.paused) 
            video.play(); 
        else 
            video.pause()
    }
    getVideoUrl(){
        const url = "http://h5vv.video.qq.com/getinfo?callback=?&platform=11001&charge=0&otype=json&ehost=http%3A%2F%2Fsports.qq.com&sphls=1&sb=1&nocache=0&_rnd=1536484898&guid=094fb994538cb2bce6416a71264523c7&appVer=V2.0Build9500&vids="+ this.props.vid +"&defaultfmt=auto&&_qv_rmt=JmrCi+j3A13449HOL=&_qv_rmt2=g61U6tlp156888yhw=&sdtfrom=v5010&callback=?";
        $.getJSON(url,(res)=>{
            const videoUrl = "http://117.34.59.30/sports.tc.qq.com/A811j1pG6Zg_OjiB-VYjLg_nwfPoBqBGA-C134ruJ9kM/"+res.vl.vi[0].fn+"?vkey=" +res.vl.vi[0].fvkey+"&guid=094fb994538cb2bce6416a71264523c7";
            this.setState({
                videoUrl:videoUrl,
                getUrlFinish:true
            })
        })
    }
    componentDidMount(){
        this.getVideoUrl();
    }
    render(){
        let urlWarp = null;
        if(this.state.getUrlFinish){
            urlWarp = (
                <div className="video-warp">
                    <div className="video-show">
                        <video ref="video" name="media" autoPlay="autoPlay" width="100%" height="auto" onClick={this.showControl}>
                            <source src={this.state.videoUrl} type="video/mp4" />
                        </video>
                    </div>
                    <div className="video-play-btn" onClick={this.pasePlay}>
                        <span className="btn-play-icon">
                        </span>  
                    </div>
                    <div className={['video-control-warp',this.state.showControlFlag?'slideInBottom':'slideOutBottom'].join(' ')}>
                        <div className="control-pase-btn"></div>
                        <div className="control-time-bar"></div>
                        <div className="control-full-screen"></div>
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