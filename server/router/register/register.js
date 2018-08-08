const express = require("express");
const getRandom = require('./helper/getRandom');
const mysql = require('mysql');
const dbSqlConfig = require('../../mysql/dbConfig');
const url = require('url');



const db = mysql.createPool(dbSqlConfig.mysql);

const sendEmail = require('./helper/emailConf');
module.exports = ()=>{
    const router = express.Router();
    router.use('/',(req,res)=>{
        let action = req.body.actions;
        let username = req.body.username;
        let password = req.body.password;
        let emailAddress = req.body.email;
        if(action === ''|| username ==='' || emailAddress === ''){
            res.json({err:true,msg:'the param is null or error'});
        }else{
            if(action === 'email'){
                let emailCode  = getRandom.getRandom(6); //验证码为6位随机数
                let email = {
                        title: '验证码',
                        htmlBody:
                        `<div style="margin: 80px auto 0; width: 580px; background: #FFF; box-shadow: 0 0 10px #333; text-align:left;">
                            <div style="margin: 0 40px; color: #999; border-bottom: 1px dotted #DDD; padding: 20px 0 20px; font-size: 13px; text-align: center;">
                                <h2>Hello Friend!</h2>
                            </div>
                            <div style="padding: 30px 40px 40px;">`
                                + username +
                                `您好，请在 2 小时内点击此链接以完成激活
                                <br />
                                <a style="color: #009A61; text-decoration: none;" href="`+'http://localhost:8888/user/register/checkCode?name=origin_wan&code='+emailCode+`" rel="noopener" target="_blank">` 
                                + 'http://localhost:8888/user/register/checkCode?username='+ username +'&code='+emailCode + '&email='+ emailAddress +
                                `</a>
                                <br>
                                完成激活后，如需设置密码
                                <a href="#" rel="noopener" target="_blank" style="color:#009A61">请点击</a>
                                <br>
                                激活遇到问题？请联系我们
                            </div>
                            <div style="text-align: center;">
                                <a href="#" style="display: block;height: 160px;" rel="noopener" target="_blank">
                                </a>
                            </div>
                            <div style="background: #EEE; border-top: 1px solid #DDD; text-align: center; height: 90px; line-height: 90px;">
                                <a href="#" style="padding: 8px 18px; background: #009A61; color: #FFF; text-decoration: none; border-radius: 3px;" rel="noopener" target="_blank">完成激活 ➔</a>
                            </div>
                        </div>
                        `
                }
                let mailOptions = {
                    from: 'origin_wan@126.com', // 发件人地址
                    to: emailAddress, // 收件人地址，多个收件人可以使用逗号分隔
                    subject: email.title, // 邮件标题
                    html: email.htmlBody // 邮件内容
                };
                let checkInfo = {
                    username:username,
                    password:password,
                    code:emailCode,
                    email:emailAddress,
                    date:new Date().getTime(),
                    isActive:0
                }
                console.log(checkInfo);
                function isertToMysql(){
                    const insert = 'INSERT INTO user (username,password,email,code,date,isActive) VALUE(?,?,?,?,?,?)';
                    db.query(insert,[checkInfo.username,checkInfo.password,checkInfo.email,checkInfo.code,checkInfo.date,checkInfo.isActive],(err,info)=>{
                        if(err){
                            console.log(err);
                        }else{
                            console.log("插入成功");
                            return ;
                        }
                    })
                }
                const send = new Promise((reslove,reject)=>{
                    isertToMysql();
                    reslove();
                }).then(()=>{
                    console.log("发送邮件");
                    sendEmail.send(mailOptions);
                }).then(()=>{
                    res.json({err:false,msg:"email  send succeed"});
                }).catch(()=>{
                    res.json({err:true,msg:'have an error'});
                })
            }else{
        
            }
        }
    });
    // router.use('/checkCode',(req,res)=>{
    //     let  param = url.parse(decodeURI(request.url),true).query;
    //     console.log(req);
    //     res.json({err:false,msg:'check  Is Ok'});
    // })
    return router;
}