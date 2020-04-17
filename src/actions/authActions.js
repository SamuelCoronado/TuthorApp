import {setAlert} from './alertActions';
import axios from 'axios';


const setAuthToken = (token) => {
    if(token){
        axios.defaults.headers.common['x-auth-token'] = token;
    }else{
        delete axios.defaults.headers.common['x-auth-token']
    }
}

export const loadUser = () => async (dispatch) => {
    if(localStorage.token){
        setAuthToken(localStorage.token)
    }

    try{
        const res = await axios.get('http://localhost:3000/api/auth')
        dispatch({
            type: 'USER_LOADED',
            payload: res.data
        });
        

    }catch(err){
        console.log(err);
        
        dispatch({
            type: 'AUTH_ERROR'
        })
    }
}

export const register = ({
    name,
    email,
    password,
    birthdate,
    city,
    state,
}) => async(dispatch) => {
   
    
    const config = {
        headers:{
            "Content-Type":"application/json"
        }
    };

    const body = JSON.stringify({
        name,
        email,
        password,
        birthdate,
        city,
        state
    });

    try {
        console.log(body);
        
        
        const res = await axios.post('http://localhost:3000/api/users', body, config);
        dispatch({
            type: 'REGISTER_SUCCESS',
            payload: res.data
        });
        dispatch(setAlert('success','registration successful'))
        dispatch(loadUser());

    } catch (err) {
        console.log(err);
        dispatch({
            type: 'REGISTER_FAIL'
        })
    }
}