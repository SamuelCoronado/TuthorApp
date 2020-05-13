import {combineReducers} from 'redux';
import authReducer from './authReducer';
import alertReducer from './alertReducer'
import newSessionReducer from './newSessionReducer';
import searchReducer from './searchReducer'

export default combineReducers({
    authReducer,
    alertReducer,
    newSessionReducer,
    searchReducer
});