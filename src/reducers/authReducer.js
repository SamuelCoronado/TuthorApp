const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    loading: true,
    user: null
}

export default function(state = initialState, action){
    const {type, payload} = action

    switch(type){
        case 'USER_LOADED':
            return{
                ...state,
                user: {...payload},
                isAuthenticated: true,
                loading: false
            }
        case 'REGISTER_SUCCESS':
        case 'LOGIN_SUCCESS':
            localStorage.setItem('token', payload.token)
            return{
                ...state,
                ...payload,
                isAuthenticated:true,
                loading: false
            }
        case 'REGISTER_FAIL':
        case 'AUTH_ERROR':
        case 'LOGIN_FAIL':
        case 'LOGOUT':
            localStorage.removeItem('token');
            return{
                ...state,
                token: null,
                isAuthenticated: false,
                loading:false
            }
        case 'SET_ABOUT_SUCCESS':
            console.log(payload.about);
            
            return{
                ...state,
                user: {...state.user, user:{...state.user.user, about: payload.about}}
            }
        case 'ADD_STUDY_SUCCESS':
            return{
                ...state,
                user: {...state.user, user:{...state.user.user, studies: [...payload]}}
            }
        case 'DELETE_STUDY_SUCCESS':
            return{
                ...state,
                user: {...state.user, user:{...state.user.user, studies:[...payload]}}
            }
        case 'ADD_TUTORING_SUCCESS':
            return{
                ...state,
                user: {...state.user, userTutorings:[...state.user.userTutorings, payload] }
            }
        case 'UPDATE_SESSIONS_TO_TAKE':
            return{
                ...state,
                user: {...state.user, sessions:{sessionsToGive:[...state.user.sessions.sessionsToGive], sessionsToTake:[...payload]}}
            }
        case 'UPDATE_SESSIONS_TO_GIVE':{
            return{
                ...state,
                user: {...state.user, sessions:{sessionsToGive:[...payload], sessionsToTake:[...state.user.sessions.sessionsToTake]}}
            }
        }
        case 'SET_PROFILE_IMAGE':
            return{
                ...state,
                user: {...state.user, user:{...state.user.user, profileImage: payload}}
            }
        default:
            return state
    }
}