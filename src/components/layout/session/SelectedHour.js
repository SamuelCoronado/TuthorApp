import React from 'react'

const SelectedHour = ({location, hours}) => {
    return (
        <div className="row p-2 bg-info text-white rounded text-center mb-3">
            <div className="col">{hours}</div>
            <div className="col">{location}</div>
            <div className="col">selected</div>
            <div className="col"><button className="btn btn-primary">Cancel</button></div>
        </div>
    )
}

export default SelectedHour
