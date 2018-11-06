const ip = "www.wvue.com.cn:8000";
const URL = {
    signIn:`http://${ip}/user/signIn`,
    singUp:`http://${ip}/user/signUp`,
    getEmailCode:`http://${ip}/user/getSvgCode`,
    getEmailVerify:`http://${ip}/user/getEmailVerify`,
    getUserInfo:`http://${ip}/user/getUserInfo`
}
export default URL;

