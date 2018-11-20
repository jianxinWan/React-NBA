import {
    SET_USER,
    GET_USER
} from '../actions/index';

const userState = (state = {userState:false},action)=>{
    let localStorageUser = localStorage.getItem('userState');
    switch(action.type){
        case SET_USER:
            localStorage.setItem('userState',action.state);
            state.userState = action.state;
            return state;
        case GET_USER:
            if(localStorageUser && typeof localStorageUser === "Object"){
                return state;
            }else{
                return {userState:localStorageUser};
            }
        default:
            //默认返回未登录的状态
            if(localStorageUser && typeof localStorageUser === "Object"){
                return state;
            }else{
                return {userState:localStorageUser};
            }
    }
}
export default userState;