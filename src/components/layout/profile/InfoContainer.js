import React from 'react'
import About from './About';
import CommentsContainer from './CommentsContainer'

const InfoContainer = ({about, isUserProfile, comments}) => {
    return (
        <div className="col-md-9">
            <About about={about} isUserProfile={isUserProfile} />
            <CommentsContainer comments={comments} />
        </div>
    )
}

export default InfoContainer