import React, {useState} from 'react'

const Tutoring = (props) => {

    const colors = ['primary', 'secondary','success', 'danger', 'warning', 'dark'];
    
    const {
        signature,
        price,
        tags,
        days,
        from,
        to,
        description
    } = props.tutoringInfo



    return (
        <div className="card">
        <div className="card-header bg-dark text-white mt-2 mx-2">
          {signature} Tutoring
        </div>
        <div className="card-body">
         <h4>Price per hour: ${price}</h4><br />
          <ul>
              {
                days.map((day) => <li>{day}</li>)
              }
          </ul>
            <p>from: {from} &nbsp;&nbsp;&nbsp;&nbsp; to: {to}</p>
            <p className="card-text">{description}</p>
          <div className="mb-3">
              {
                tags.map((tag) => <span className={`text-white mx-1 rounded p-1 bg-${colors[Math.floor(Math.random() * colors.length)]}`}>{tag}</span>)
              }
          </div>
          
        </div>
      </div>
    )
}

export default Tutoring
