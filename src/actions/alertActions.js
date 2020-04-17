export const setAlert = (type, message) => (dispatch) => {
    const alert = {
        id: Math.round(Math.random()*1000),
        type,
        message
    }
    console.log(alert);
    
    dispatch({
        type: 'SET_ALERT',
        payload: alert
    });

    setTimeout(() => {
        dispatch({
            type: 'REMOVE_ALERT',
            payload: alert.id
        })
    }, 2500);
}