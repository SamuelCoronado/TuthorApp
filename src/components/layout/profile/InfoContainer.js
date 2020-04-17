import React from 'react'
import About from './About';
import CommentsContainer from './CommentsContainer'

const InfoContainer = ({about, comments}) => {
    return (
        <div className="col-md-9">
            <About about={about} />
            <CommentsContainer comments={comments} />
        </div>
    )
}

export default InfoContainer