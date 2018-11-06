import {combineReducers} from 'redux';
import Nba from './nba';
import Video from './video';
import User from './user';
const allReducer = combineReducers({
    Nba,
    Video,
    User
})
export default allReducer;