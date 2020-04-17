const initialState = {
    alerts: []
}

export default function(state = initialState, action){
    const {type, payload} = action
    switch(type){
        case 'SET_ALERT':
            return{
                ...state,
                alerts: [...state.alerts, payload]
            }
        case 'REMOVE_ALERT':
            const tempAlerts = [...state.alerts];
            const alertIndex = tempAlerts.findIndex((alert) => alert.id === payload);
            console.log(alertIndex);
            
            tempAlerts.splice(alertIndex,1);
            return{
                ...state,
                alerts: tempAlerts
            }
        default:
            return state
    }
}