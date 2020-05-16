import {combineReducers} from 'redux';
import authReducer from './authReducer';
import alertReducer from './alertReducer'
import newSessionReducer from './newSessionReducer';
import searchReducer from './searchReducer';

const appReducer = combineReducers({
    authReducer,
    alertReducer,
    newSessionReducer,
    searchReducer
});

const rootReducer = (state, action) => {
    if(action.type === 'LOGOUT'){
        state = {}
    }
    return appReducer(state, action)
}

export default rootReducer