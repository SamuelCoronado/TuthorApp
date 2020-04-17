import {setAlert} from './alertActions';
import axios from 'axios';

export const setAboutInfo = (info) => async (dispatch) =>{

    const config = {
        headers:{
            "Content-Type": "application/json"
        }
    };

    const body = JSON.stringify({
        about:info
    })

    try {
        
        const res = await axios.put('http://localhost:3000/api/users/about',body, config);
        dispatch({
            type: 'SET_ABOUT_SUCCESS',
            payload: res.data
        })
        dispatch(setAlert('success','Update info successful'))

    } catch (err) {
        console.log(err);
    }
}

export const addStudy = (newStudyInfo) => async (dispatch) => {

    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    const body = JSON.stringify({
        institute: newStudyInfo.institute,
        period: newStudyInfo.period,
        signature: newStudyInfo.signature,
        description: newStudyInfo.description

    });

    try {
        
        const res = await axios.put('http://localhost:3000/api/users/studies',body, config);
        console.log(res.data.studies);
        dispatch({
            type: 'ADD_STUDY_SUCCESS',
            payload: res.data.studies
        })
        dispatch(setAlert('success','Study successfully added'))

    } catch (err) {
        
        console.log(err);
        

    }
}

export const deleteStudy = (studyId) => async (dispatch) => {

    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    try {

        const res = await axios.delete('http://localhost:3000/api/users/studies/'+studyId,config);
        dispatch({
            type: 'DELETE_STUDY_SUCCESS',
            payload: res.data.studies
        })
        dispatch(setAlert('success','Study successfully deleted'))
        
    } catch (err) {

        console.log(err);
        
    }


}