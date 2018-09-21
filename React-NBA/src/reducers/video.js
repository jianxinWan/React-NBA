import {
    SET_VIDEO,
    GET_VIDEO
} from '../actions/index';

const nowUrl = (state = {nowUrl:"123"},action)=>{
    switch(action.type){
        case SET_VIDEO:
            state.nowUrl = action.text;
            return state;
        case GET_VIDEO:
            return state.nowUrl;
        default:
            return {
                nowUrl:'123'
            }
    }
}
export default nowUrl;