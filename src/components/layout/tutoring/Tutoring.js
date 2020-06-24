import React from 'react'
import {Link} from 'react-router-dom';

const Tutoring = (props) => {

    const colors = ['primary', 'secondary','success', 'danger', 'warning', 'dark'];
    
    const {
        signature,
        price,
        tags,
        days,
        from,
        to,
        description,
        _id
    } = props.tutoringInfo

    const tutoringId = _id

    return (
        <div className="card rounded">
        <div className="card-header text-white text-center mt-2 mx-2" style={{backgroundColor: '#275DAD'}}>
          {signature}
        </div>
        <div className="card-body">
          <h4 className="text-center"><i className="fas fa-dollar-sign"></i></h4>
         <h4 className="text-center">{price}</h4><hr/>
         <h4 className="text-center">
         <i className="fas fa-calendar-week"></i>
         </h4>
          <ul className="list-group">
              {
                days.map((day) => <li className="list-group-item text-center">{day}</li>)
              }
          </ul>
          <br/>
            <p className="text-center font-weight-bold"><i class="far fa-clock "></i> {from}-{to}</p>
            <hr/>
            <p className="card-text">{description}</p>
          <div className="mb-3">
              {
                tags.map((tag) => <span className={`text-white mx-1 rounded p-1 bg-${colors[Math.floor(Math.random() * colors.length)]}`}>{tag}</span>)
              }
          </div>
          <Link to={`/tutoring/${tutoringId}/newSession`} className="btn btn-info btn-block">Agend tutoring</Link>
        </div>
      </div>
    )
}

export default Tutoring
