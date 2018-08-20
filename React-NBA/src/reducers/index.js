import {
    SET_NOWPAGE,
    GET_NOWPAGE
} from '../actions/index';


function nowPage(state = {nowPage:""},action){
    let stroage = window.localStorage;
    console.log(stroage);
    switch(action.type){
        case SET_NOWPAGE:
            stroage.nowPage = action.text;
            state.nowPage = action.text;
            return state;
        case GET_NOWPAGE:
            return state.nowPage
        default:
            if(stroage.nowPage){
                return {
                    nowPage:stroage.nowPage
                }
            }else{
                return {
                    nowPage:'NBA'
                }
            }
    }
}
export default nowPage;