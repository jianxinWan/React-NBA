export const SET_NOWPAGE = 'SET_NOWPAGE';
export const GET_NOWPAGE = 'GET_NOWPAGE';
export const SET_VIDEO = 'SET_VIDEO';
export const GET_VIDEO ='GET_VIDEO';
export function setPageInfo(text){
    return {
        type:SET_NOWPAGE,
        text
    }
}
export function setVideo(url){
    return {
        type:SET_VIDEO,
        url
    }
} 