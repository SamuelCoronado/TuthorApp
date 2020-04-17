import React from 'react'

const Study = ({signature, isUserProfile, institute, period, description, id, deleteStudy}) => {
    return (
        <div className="card text-white bg-secondary mb-3">
            <div className="card-header">{signature} course</div>
            <div className="card-body">
            <p className="card-text">Taken in: {institute} </p>
            <p className="card-text">{period} </p>
            <p className="card-text">{description} </p>
            {
                isUserProfile? null
                :
                <button className="btn btn-danger btn-block" onClick={() => deleteStudy(id)}>Delete</button>
            } 
            </div>
      </div>
    )
}

export default Study