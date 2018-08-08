const nodemailer = require('nodemailer');
const config = {
    host: 'smtp.126.com', 
    port: 25,
    auth: {
        user: 'origin_wan@126.com', //刚才注册的邮箱账号
        pass: 'WJX520DY'  //邮箱的授权码，不是注册时的密码
    }
}
const transporter = nodemailer.createTransport(config);

module.exports.send = (mail)=>{
    let sendEmail = new Promise((resolve,reject)=>{
        transporter.sendMail(mail,(err,info)=>{
            if(err){
                console.log(err);
                console.log("发送失败");
                resolve(false);
            }else{
                console.log("发送成功！");
                resolve(true);
            }
        });
    }).then((data)=>{
        return data;
    })
}
