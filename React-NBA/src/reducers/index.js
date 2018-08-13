import {
    SET_NOWPAGE,
    GET_NOWPAGE
} from '../actions/index';
function nowPage(nowPage = "",action){
    switch(action.type){
        case SET_NOWPAGE:
            nowPage = action.text;
            return nowPage;
        case GET_NOWPAGE:
            return nowPage;
    }
}
export default nowPage;