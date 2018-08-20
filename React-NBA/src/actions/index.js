export const SET_NOWPAGE = 'SET_NOWPAGE';
export const GET_NOWPAGE = 'GET_NOWPAGE';

export function setPageInfo(text){
    return {
        type:SET_NOWPAGE,
        text
    }
}