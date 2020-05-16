import React from 'react'
import Rating from '@material-ui/lab/Rating'

const getDays = (date) => {
  const now = new Date(Date.now());
  const commentDate = new Date(date);
  const timeDifference = Math.abs(now.getTime() - commentDate.getTime());
  const dayDifference = Math.ceil(timeDifference/ (1000*60*60*24));
  return dayDifference
}

export const StudentComment = ({profileImage, student, studentName, session, sessionName, opinion, rating, date}) => {

  const days = getDays(date);
  
    return (
        <div className="card my-3" style={{width: '800px'}}>
        <div className="card-body">
          <img src={`https://tuthor-app.herokuapp.com/images/${profileImage}`} style={{width: '50px', height: '50px'}} className="rounded float-left" alt="" />
          <p>&nbsp;<strong>{studentName}</strong>&nbsp;  {days === 0? 'today': days === 1? 'a day ago': `${days} days ago` }</p><br />
          <p>&nbsp;<strong>{sessionName}</strong>&nbsp; <Rating name="stars" value={rating} precision={1} readOnly/></p>
          <p className="p-2 border border-white rounded">{opinion}</p>
        </div>
      </div>
    )
}

export const TutorComment = ({profileImage, tutor, tutorName, session, sessionName, opinion, rating, date}) => {
 
  const days = getDays(date);
  
  return (
    <div className="card my-3" style={{width: '800px'}}>
    <div className="card-body">
      <img src={`https://tuthor-app.herokuapp.com/images/${profileImage}`} style={{width: '50px', height: '50px'}} className="rounded float-left" alt="" />
      <p>&nbsp;<strong>{tutorName}</strong>&nbsp;  {days === 0? 'today': days === 1? 'a day ago': `${days} ago` }</p><br />
      <p>&nbsp;<strong>{sessionName}</strong>&nbsp; <Rating name="stars" value={rating} precision={1} readOnly/></p>
      <p className="p-2 border border-white rounded">{opinion}</p>
    </div>
  </div>
)
}


export default StudentComment