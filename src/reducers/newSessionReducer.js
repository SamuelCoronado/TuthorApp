const initialState = {
    tutoring:null,
    location: '',
    sessions: null,
    amountToPay: null,
    selectedSessions: [],
    viewport:{
    width: '700px',
    height: '300px',
    latitude: 0,
    longitude: 0, 
    zoom: 17    
    }
};

const getDisabledDates = (availableDaysArray) => {
    const now = new Date(Date.now())
    let dayNumber = now.getDay()
    const month = now.getMonth();
    const year = now.getFullYear()
    let availableDates = [];

    let date = new Date(year,month,dayNumber);

       while(date.getMonth() < 11){  
        let day = date.toDateString().split(' ')[0];
        if(!availableDaysArray.includes(day)){
            availableDates.push(date)
        }
        dayNumber+=1
        date = new Date(year,month,dayNumber)
      }  
    
    return availableDates; 
}

export default function(state = initialState, action){
    const {type, payload} = action;

    switch(type){
        case 'SET_VIEWPORT':{
            return{
                ...state,
                viewport: {...payload}
            }
        }
        case 'GET_CURRENT_POSITION':{
            return{
                ...state,
                viewport: {...state.viewport, latitude: payload.coords.latitude, longitude: payload.coords.longitude}
            }
        }
        case 'UPDATE_MARKER':{
            return{
                ...state,
                viewport: {...state.viewport, latitude: Number(payload.latitude), longitude: Number(payload.longitude)}
            }
        }
        case 'ZOOM_IN':{
            return{
                ...state,
                viewport: {...state.viewport, zoom: state.viewport.zoom+1}
            }
        }
        case 'ZOOM_OUT':{
            return{
                ...state,
                viewport: {...state.viewport, zoom: state.viewport.zoom-1}
            }
        }
        case 'UPDATE_LOCATION':{
            return{
                ...state,
                location: payload
            }
        }
        case 'GET_TUTORING_INFO':{
            return{
                ...state,
                tutoring: {...payload},
                disabledDates: getDisabledDates(payload.days)
            }
        }
        case 'SET_SESSIONS':{
            return{
                ...state,
                sessions: [...payload]
            }
        }
        case 'SET_SESSIONS_TO_FALSE':{
            return{
                ...state,
                sessions: false
            }
        }
        case 'ADD_SESSION':{  
            return{
                ...state,
                sessions: [...payload]
            }
        }
        case 'ADD_TO_SELECTED_SESSIONS':{
            return{
                ...state,
                selectedSessions: [...state.selectedSessions, payload],
                amountToPay: state.tutoring.price * [...state.selectedSessions, payload].length
            }
        }
        case 'CREATE_TUTORING_SESSION_SUCCESS':{
            return{
                ...state,
                selectedSessions: [],
                amountToPay: null
            }
        }
        default:{
            return state
        }
    }
}