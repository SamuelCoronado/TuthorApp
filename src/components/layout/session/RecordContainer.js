import React from 'react';
import Session from './Session';
import {connect} from 'react-redux';
import {getChunks} from '../tutoring/TutoringsContainer';

const RecordContainer = ({user}) => {
    return (
      <>
      {
          user == null?
          null
          :
          <div className="container">
              <h4 className="text-center p-2 rounded">
                  Taken sessions
              </h4>
              <hr/>
              {
                  user.sessions.takenSessions.length > 0?
                  getChunks(user.sessions.takenSessions)
                  .map((array) => {
                      return(
                          <div className="row">
                              {array.map((session) => <div className="col-md-4"><Session sessionInfo={session} toTake={true} userImage={user.user.profileImage}/></div>)}
                          </div>
                      )
                  })
                  :
                  <h3 className="text-center">You have not taken any session</h3>
              }
              <br/>
              <h4 className="text-center p-2 rounded">
                  Given sessions
              </h4>
              <hr/>
              {
                  user.sessions.givenSessions.length > 0?
                  getChunks(user.sessions.givenSessions)
                  .map((array) => {
                      return(
                          <div className="row">
                              {array.map((session) => <div className="col-md-4"><Session sessionInfo={session} toTake={false} userImage={user.user.profileImage}/></div>)}
                          </div>
                      )
                  })
                  :
                  <h3 className="text-center">You have not given any session</h3>
              }
          </div>
      }
      </>
    )
}

const mapStateToProps = (state) => ({
    user: state.authReducer.user
})

export default connect(mapStateToProps, null)(RecordContainer)
