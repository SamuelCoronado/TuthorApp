import React from 'react'
import Session from './Session';
import {connect} from 'react-redux';
import {getChunks} from '../tutoring/TutoringsContainer';

const SessionsContainer = ({user}) => {
 
    return (
        <>
        {
            user == null?
            null
            :
            <div className="container">
                {
                    getChunks(user.sessions.sessionsToTake)
                    .map((array) => {
                        return(
                            <div className="row">
                                {array.map((session) => <div className="col-md-4"><Session sessionInfo={session}/></div>)}
                            </div>
                        )
                    })
                }
            </div>
        }
        </>
    )
}


const mapStateToProps = (state) => ({
    user: state.authReducer.user
})

export default connect(mapStateToProps, null)(SessionsContainer)
