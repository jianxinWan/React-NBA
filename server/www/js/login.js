let username = document.getElementById("username");
let pass = document.getElementById("password");
let code = document.getElementById("vcodeText");
let obtn = document.getElementById("submit");
let codeWarp = document.getElementById('codeWarp');
function getVcode(){
    $.ajax({
        url: 'http://localhost:8888/vcode',
        type: 'GET',
        dataType: 'JSON',
        success: function (res) {
           if(res.err){
               alert("获取验证码错误");
           }else{
               codeWarp.innerHTML=res.data;
           }
        },
        error: function () {
            alert('通信错误！');
        },
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true
    })
}
getVcode();
codeWarp.addEventListener('click',()=>{
    getVcode();
},false);
obtn.addEventListener('click',()=>{
    console.log(username.value,pass.value,code.value);
    $.ajax({
        url: 'http://localhost:8888/user/loginTo',
        type: 'POST',
        dataType: 'JSON',
        data:{
            username:username.value,
            password:pass.value,
            vcode:code.value
        },
        success: function (json) {
           console.log(json);
        },
        error: function () {
            alert('通信错误！');
        },
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true
    })
},false);