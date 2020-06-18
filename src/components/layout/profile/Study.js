import React from 'react'

const Study = ({signature, isUserProfile, institute, period, description, id, deleteStudy}) => {
    return (
        <div className="card text-white mb-3" style={{backgroundColor: '#84a9ac'}}>
            <div className="card-header">{signature} course</div>
            <div className="card-body">
            <p className="card-text"><i class="fas fa-school"></i> Taken in: {institute} </p>
            <p className="card-text"><i class="fas fa-user-clock"></i> {period} </p>
            <p className="card-text border border-white p-1 rounded">{description} </p>
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