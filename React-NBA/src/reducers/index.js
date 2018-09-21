import {combineReducers} from 'redux';
import Nba from './nba';
import Video from './video';

const allReducer = combineReducers({
    Nba,
    Video
})
export default allReducer;