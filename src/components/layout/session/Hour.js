import React from 'react'
import {connect} from 'react-redux';
import {addSession} from '../../../actions/sessionActions'

const Hour = ({hour, location, selectedLocation, available, addSession, sessions }) => {
    return(
        <>
    {
      available ?
        <div className="row p-2 bg-dark text-white rounded text-center mb-3">
            <div className="col">{hour}</div>
            <div className="col"></div>
            <div className="col">Available</div>
            <div className="col"> <button className="btn btn-primary" onClick={(e) => addSession(hour, selectedLocation, sessions)}>Agend</button></div>
        </div>
    :
        <div className="row p-2 bg-danger text-white rounded text-center mb-3">
               <div className="col">{hour}</div>
               <div className="col">{location}</div>
               <div className="col">Not available</div>
               <div className="col"></div>
        </div>
     }
      </> 
    )

  /*   return (
            <div className="row p-2 bg-dark text-white rounded text-center mb-3">
                    <div class="col">{hour}</div>
                    <div class="col">{location}</div>
                    <div class="col">{available? 'Available': 'Not available'}</div>
                    <div class="col">{available? <button className="btn btn-primary" onClick={(e) => addSession(hour, location, sessions)}>Agend</button>: null}</div> 
                </div>
    ) */
}

const mapStateToProps = (state) => ({
    selectedLocation: state.newSessionReducer.location
})

export default connect(mapStateToProps, {addSession})(Hour)
