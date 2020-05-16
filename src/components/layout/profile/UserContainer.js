import React, {useState, useEffect} from 'react'
import MainInfo from './MainInfo';
import StudiesContainer from './StudiesContainer';
import InfoContainer from './InfoContainer';
import {useParams} from 'react-router-dom';
import axios from 'axios';

export const UserContainer = () => {

    const [user, setUser] = useState(null);

    const {userId} = useParams();

    useEffect(() => {  
        const getUserProfile = async(userId) => {
            try {            
                const res = await axios.get('https://tuthor-app.herokuapp.com/api/users/'+userId);
                setUser((res.data))
                
            } catch (err) {
                console.log(err);
            }
        }
        
        getUserProfile(userId)
        

    }, [])

    if(user == null) return null

    const {
        name,
        city,
        state,
        rating,
        birthdate,
        studies,
        about,
        opinionsAsStudent,
        opinionsAsTutor
    } = user

    const generalComments = {
        opinionsAsStudent,
        opinionsAsTutor
    }

    console.log(user);
    


    return (
        <>
            <MainInfo name={name} state={state} city={city} rating={rating} birthdate={birthdate} />
            <div className="container">
             <hr />
            </div>
            <div className="container p-4">
                <div className="row">
                    <StudiesContainer studies={studies} isUserProfile={true}/>
                    <InfoContainer about={about} comments={generalComments} isUserProfile={true} />
                </div>
            </div>

        </>
    )
}
