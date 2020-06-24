import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom';
import Tutoring from '../tutoring/Tutoring';
import {getChunks} from '../tutoring/TutoringsContainer';
import axios from 'axios';

const UserTutorings = () => {

    const [tutorings, setTutorings] = useState(null);

    const {userId} = useParams();

    console.log(userId);

    useEffect(() => {
        const getUserTutorings = async(userId) => {
            setTutorings(null);
            try {
                const res = await axios.get('https://tuthor-app.herokuapp.com/api/users/'+userId+'/tutorings');
                console.log(res.data);
                setTutorings(res.data)
            } catch (err) {
                console.log(err);
            }
        }

        getUserTutorings(userId)
    }, [userId]);

    if(tutorings === null) return null; 
    
    return (
        <div className="container">
            {
                getChunks(tutorings)
                .map((array) => {
                    return(
                        <div className="row my-4">
                             {array.map((tutoring) => <div className="col-md-4 mb-3"><Tutoring tutoringInfo={tutoring}/></div>)}
                        </div>
                    )
                })
            }
        </div>
    )
}

export default UserTutorings
