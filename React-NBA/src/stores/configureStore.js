import {createStore} from 'redux';
import allReducer from '../reducers/index';
export default function configureStore(){
    const store = createStore(allReducer);
    return store;
}