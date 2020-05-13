import React from 'react'
import Rating from '@material-ui/lab/Rating'

export const StudentComment = ({profileImage, student, studentName, session, sessionName, opinion, rating, date}) => {
  
    return (
        <div className="card my-3" style={{width: '800px'}}>
        <div className="card-body">
          <img src="https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-4.png" style={{width: '50px', height: '50px'}} className="rounded float-left" alt="" />
          <p>&nbsp;<strong>{studentName}</strong>&nbsp; at {new Date(date).toDateString()}</p><br />
          <p>&nbsp;<strong>{sessionName}</strong>&nbsp; <Rating name="stars" value={rating} precision={1} readOnly/></p>
          <p className="p-2 border border-white rounded">{opinion}</p>
        </div>
      </div>
    )
}

export const TutorComment = ({profileImage, tutor, tutorName, session, sessionName, opinion, rating, date}) => {
  
  return (
    <div className="card my-3" style={{width: '800px'}}>
    <div className="card-body">
      <img src={profileImage} style={{width: '50px', height: '50px'}} className="rounded float-left" alt="" />
      <p>&nbsp;<strong>{tutorName}</strong>&nbsp;{date}</p><br />
      <p>&nbsp;<strong>{sessionName}</strong>&nbsp;{rating}</p>
      <p>{opinion}</p>
    </div>
  </div>
)
}


export default StudentComment