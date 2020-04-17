import React from 'react'
import MainInfo from './MainInfo';
import StudiesContainer from './StudiesContainer';
import InfoContainer from './InfoContainer';
import {connect} from 'react-redux';


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
        opinions
    } = user
    

    return (
        <>
            <MainInfo name={name} state={state} city={city} rating={rating} birthdate={birthdate} />
            <div className="container">
             <hr />
            </div>
            <div className="container p-4">
                <div className="row">
                    <StudiesContainer studies={studies} />
                    <InfoContainer about={about} comments={opinions} />
                </div>
            </div>

        </>
    )
}

const mapStateToProps = (state) => ({
    user: state.authReducer.user
})

export default connect(mapStateToProps,null)(ProfileContainer)