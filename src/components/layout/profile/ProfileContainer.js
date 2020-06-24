import React from 'react'
import MainInfo from './MainInfo';
import StudiesContainer from './StudiesContainer';
import InfoContainer from './InfoContainer';
import {connect} from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';

const ProfileContainer = ({user}) => {
  
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
        opinionsAsTutor,
        profileImage,
        _id
    } = user.user
   
    const generalComments = {
        opinionsAsStudent,
        opinionsAsTutor
    }
    
    

    return (
        <>
            <MainInfo name={name} state={state} city={city} rating={rating} birthdate={birthdate} profileImage={profileImage} id={_id} />
            <div className="container">
             <hr />
            </div>
            <div className="container p-4">
                <div className="row">
                    <StudiesContainer studies={studies} />
                    <InfoContainer about={about} comments={generalComments} />
                </div>
            </div>

        </>
    )
}

const mapStateToProps = (state) => ({
    user: state.authReducer.user
   // userTutorings: state.authReducer.user.userTutorings
})

export default connect(mapStateToProps,null)(ProfileContainer)
