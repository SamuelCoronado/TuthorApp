const initialState = {
    tutorings: [],
    searchTerm: ''
}

export default function(state = initialState, action){
    const {type, payload} = action;

    switch(type){
        case 'GET_TUTORINGS':{
            return{
                ...state,
                tutorings: [...payload]
            }
        }
        case 'SET_SEARCH_TERM':{
            return{
                ...state,
                searchTerm: payload
            }
        }
        default:{
            return state
        }
    }
}