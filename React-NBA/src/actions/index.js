export const SET_NOWPAGE = 'SET_NOWPAGE';
export const GET_NOWPAGE = 'GET_NOWPAGE';
export const SET_VIDEO = 'SET_VIDEO';
export const GET_VIDEO = 'GET_VIDEO';
export const SET_USER  = "SET_USER";
export const GET_USER = "GET_USER";
export function setPageInfo(text){
    return {
        type:SET_NOWPAGE,
        text
    }
}
export function setUserState(state){
    return {
        type:SET_USER,
        state
    }
}
export function setVideo(url){
    return {
        type:SET_VIDEO,
        url
    }
} 