import axios from 'axios';

export const getTutorings = (searchTerm) => async(dispatch) => {

    try {    
        const res = await  axios.get(
            "https://tuthor-app.herokuapp.com/api/tutorings/search/"+searchTerm
        );
        dispatch({
            type: 'GET_TUTORINGS',
            payload: res.data
        })
    } catch (err) {
        console.log(err);
    }
}

export const setSearchTerm = (term) => (dispatch) => {
    dispatch({
        type: 'SET_SEARCH_TERM',
        payload: term
    })
}