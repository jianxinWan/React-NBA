import {
    SET_USER,
    GET_USER
} from '../actions/index';

const userState = (state = {userState:false},action)=>{
    let sessionStorageUser = sessionStorage.getItem('userState');
    switch(action.type){
        case SET_USER:
            sessionStorage.setItem('userState',action.state);
            state.userState = action.state;
            return state;
        case GET_USER:
            if(sessionStorage && typeof sessionStorageUser === "Object"){
                return state;
            }else{
                return {userState:sessionStorageUser};
            }
        default:
            //默认返回未登录的状态
            if(sessionStorage && typeof sessionStorageUser === "Object"){
                return state;
            }else{
                return {userState:sessionStorageUser};
            }
    }
}
export default userState;