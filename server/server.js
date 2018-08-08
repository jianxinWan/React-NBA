const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const url = require('url');
const svgCaptch = require('svg-captcha');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const dbSqlConfig  = require('./mysql/dbConfig');


const server = express();
const db = mysql.createPool(dbSqlConfig.mysql);

server.use(bodyParser.urlencoded({extended:false}));
server.use(cookieParser());
(function(){
    let keys = [];
    for(let i=0;i<10000;i++){
        keys[i] = 'a'+Math.random();
    }
    server.use(cookieSession({
        name:'sess_id',
        keys:keys,
        maxAge:20*60*1000  //20 min
    }));
})();

server.listen(8888);
server.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});
server.get('/vcode',(req,res)=>{
    const captch = svgCaptch.create({
        size:4,
        ignoreChars:'0o1i',
        noise:2,
        color:false
    });
    req.session['captch'] = captch.text;
    res.json({
        err:false,
        data:captch.data
    });
})
server.post('/user/loginTo',(req,res)=>{
    let username = req.body.username;
    let password = req.body.password;
    let vcode = req.body.vcode;
    if(vcode === '' || req.session['captch'] == '' || req.session['captch'].toLowerCase !== vcode.toLowerCase){
        res.json({
            err:true,
            errInfo:"captch  is  error!"
        }) 
    }else{
        const queryUser = 'SELECT password FROM user WHERE username = ?';
        db.query(queryUser,username,(err,data)=>{
            if(err){
                console.log("login-"+err);
                res.json({err:true,msg:'the server is too busy'});
            }else{
                let pass  = JSON.parse(JSON.stringify(data));
                if(pass===password){
                    res.json({err:false,msg:'login succeed!'});
                }else{
                    res.json({err:true,errInfo:'the password is error'});
                }
            }
        })
    }
})
server.get('/user/register/checkCode',(request,res)=>{
    let  param = url.parse(decodeURI(request.url),true).query;
    let code = param.code;
    let email = param.email;
    let promsie = new Promise((reslove,reject)=>{
        const queryDate = 'SELECT date,code FROM user WHERE email=?';
        db.query(queryDate,email,(err,data)=>{
            if(err){
                res.json({err:true,msg:'have  an error'});
            }else{
                let info = JSON.parse(JSON.stringify(data))[0];
                let nowdate = new Date().getTime();
                if(nowdate-info.date>2*60*60*1000){
                    res.json({err:true,msg:'the code is invalid'});
                }else{
                    reslove(info.code);
                }
            }
        })
    }).then((data)=>{
        console.log(data,code);
        if(data === code){
            const changeState = 'UPDATE user SET isActive = 1 WHERE code=? AND email=?';
            db.query(changeState,[code,email],(err,info)=>{
                if(err){
                    console.log(err);
                }else{
                    res.json({err:false,msg:'regist secceed'});
                }
            })
        }else{
            res.json({err:true,msg:'the code is error'});
        }
    })
})
server.use('/user/register',require('./router/register/register')());
server.get('/emilCode',(req,res)=>{})
