import {combineReducers} from 'redux';
import authReducer from './authReducer';
import alertReducer from './alertReducer'
import newSessionReducer from './newSessionReducer';

export default combineReducers({
    authReducer,
    alertReducer,
    newSessionReducer
});