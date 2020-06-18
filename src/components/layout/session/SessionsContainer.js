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
                <h4 className="text-center p-2 rounded">Sessions to take</h4>
                <hr/>
                {
                    user.sessions.sessionsToTake.length > 0?
                    getChunks(user.sessions.sessionsToTake)
                    .map((array) => {
                        return(
                            <div className="row">
                                {array.map((session) => <div className="col-md-4"><Session sessionInfo={session} toTake={true} userImage={user.user.profileImage}/></div>)}
                            </div>
                        )
                    })
                    :
                    <h3>You have no sessions to take</h3>
                }
                <br/>
                <h4 className="text-center p-2 rounded">Sessions to give</h4>
                <hr/>
                {
                    user.sessions.sessionsToGive.length > 0?
                    getChunks(user.sessions.sessionsToGive)
                    .map((array) => {
                        return(
                            <div className="row">
                                {array.map((session) => <div className="col-md-4"><Session sessionInfo={session} userImage={user.user.profileImage}/></div>)}
                            </div>
                        )
                    })
                    :
                    <h3>You have no sessions to give</h3>
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
