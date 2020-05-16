import axios from 'axios';
import {setAlert} from './alertActions';

export const setViewport = (viewport) =>(dispatch) => {

    dispatch({
        type: 'SET_VIEWPORT',
        payload: viewport
    })
}

export const getCurrentPosition = () => async(dispatch) => {
    
    navigator.geolocation.getCurrentPosition(position => {
        dispatch({
            type: 'GET_CURRENT_POSITION',
            payload: position
        })
    })
}

export const updateMarker = (e) => async(dispatch) => {
    try {
        const lngLat = e.lngLat;
        const coords = {
            longitude: lngLat[0],
            latitude: lngLat[1]
        }
        dispatch({
            type: 'UPDATE_MARKER',
            payload: coords
        })
    } catch (err) {
        console.log(err);
    }
}

export const zoomIn = () => async(dispatch) => {
    dispatch({
        type: 'ZOOM_IN'
    })
}

export const zoomOut = () => async(dispatch) => {
    dispatch({
        type: 'ZOOM_OUT'
    })
}

export const updateLocation = (lat, long) => async(dispatch) => {
    try {
        
        const response = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${long},${lat}.json?access_token=pk.eyJ1Ijoic2FtdWVsY29yb25hZG8iLCJhIjoiY2p4MjZiMzAwMDR2djQzcHlyNWs2MXNjdiJ9.wbogdv9262vjvpvif6mvIQ`) 
        const location = response.data.features[0].place_name.split(',')[0]+','+ response.data.features[0].place_name.split(',')[1]
        dispatch({
            type: 'UPDATE_LOCATION',
            payload: location
        })  

    } catch (err) {
        console.log(err);
    }
   
}

export const getTutoringInfo = (tutoringId) => async(dispatch) => {
    try {
        console.log('entra');
        
        const response = await axios.get('https://tuthor-app.herokuapp.com/api/tutorings/'+tutoringId);
        dispatch({
            type: 'GET_TUTORING_INFO',
            payload: response.data
        })
        console.log(response.data);
        

    } catch (err) {
        console.log(err);
        
    }
}

export const setSessionsToFalse = () => (dispatch) => {
    dispatch({
        type: 'SET_SESSIONS_TO_FALSE'
    })
}

export const setSessions = (sessions) => (dispatch) => {
    dispatch({
        type: 'SET_SESSIONS',
        payload: sessions
    })
}

export const addSession = (hours, location, sessions) => (dispatch) => {
    const newSession = {
        location,
        hours
    }

    console.log(newSession);
    

    const sessionIndex = sessions.findIndex((session) => session.hours? session.hours === hours : hours === session);
    if(sessionIndex !== -1){
        sessions[sessionIndex] = newSession
    }else{
        sessions.push(newSession)
    }

    console.log(sessions);
    
    dispatch({
        type: 'ADD_SESSION',
        payload: [...sessions]
    })
    
    dispatch({
        type: 'ADD_TO_SELECTED_SESSIONS',
        payload: {...newSession}
    })
}

export const createTutoringSession = ({tutoringId, studentId, sessionName, tutorName, studentName, profileImage, description, tags, tutorId, amountToPay, location, selectedHoursArray, date}) => async(dispatch) => {
    const config = {
        headers:{
            "Content-Type": "application/json"
        }
    };

    console.log(selectedHoursArray);
    
    const body = JSON.stringify({
        tutoring: tutoringId,
        sessionName,
        tutorName,
        studentName,
        description,
        profileImage,
        tags,
        student: studentId,
        tutor: tutorId,
        totalPrice: amountToPay, 
        location, 
        hours: selectedHoursArray, 
        date
    });

    console.log(body);
    
    try {
        
        const res = await axios.post('https://tuthor-app.herokuapp.com/api/tutorings/'+tutoringId+'/session', body, config);
        console.log(res.data);
        dispatch({
            type: 'CREATE_TUTORING_SESSION_SUCCESS',
            payload: res.data
        })
        dispatch(setAlert('success', 'Session successfully created!'))

        console.log(res);
        


    } catch (err) {
        console.log(err);
        
    }
}

export const updateSessionsToTake = (sessions) => (dispatch) => {
    dispatch({
        type: 'UPDATE_SESSIONS_TO_TAKE',
        payload: sessions
    })
    dispatch(setAlert('success','Opinion submited. Session was moved to your record'))
}

export const updateSessionsToGive = (sessions) => (dispatch) => {
    dispatch({
        type: 'UPDATE_SESSIONS_TO_GIVE',
        payload: sessions
    })
    dispatch(setAlert('success','Opinion submited. Session was moved to your record'))
}