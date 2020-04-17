import React from 'react'

const Study = ({signature, institute, period, description}) => {
    return (
        <div className="card text-white bg-secondary mb-3">
            <div className="card-header">{signature} course</div>
            <div className="card-body">
            <p className="card-text">Taken in: {institute} </p>
            <p className="card-text">{period} </p>
            <p className="card-text">{description} </p>
            </div>
      </div>
    )
}

export default Study