import React, {useState, useEffect} from 'react'
import Rating from '@material-ui/lab/Rating'
import axios from 'axios';

export const getDays = (date) => {
  const now = new Date(Date.now());
  const commentDate = new Date(date);
  const timeDifference = Math.abs(now.getTime() - commentDate.getTime());
  const dayDifference = Math.ceil(timeDifference/ (1000*60*60*24));
  return dayDifference
}

const getProfileImage = async(id) => {
  const res = await axios.get(`https://tuthor-app.herokuapp.com/api/users/${id}/profileImage`);
  return res.data;
}

export const StudentComment = ({profileImage, student, studentName, session, sessionName, opinion, rating, date}) => {

  const [profileImg, setProfileImg] = useState(null);

  const days = getDays(date);
  
  useEffect(() => {
    const getImage = async(studentId) => {
      const res = await getProfileImage(studentId);
      console.log(res.profileImage);
      setProfileImg(res.profileImage);
    }
    getImage(student);
  }, [])
  

    return (
        <div className="card my-3 bg-muted" style={{width: '800px'}}>
        <div className="card-body">
          <img src={profileImg == null ? null : `https://tuthor-app.herokuapp.com/images/${profileImg}`} style={{width: '50px', height: '50px'}} className="rounded float-left" alt="" />
          <p>&nbsp;<strong>{studentName}</strong>&nbsp;  {days === 0? 'today': days === 1? 'a day ago': `${days} days ago` }</p><br />
          <p>&nbsp;<strong>{sessionName}</strong>&nbsp; <Rating name="stars" value={rating} precision={1} readOnly/></p>
          <p className="p-2 border border-white rounded">{opinion}</p>
        </div>
      </div>
    )
}

export const TutorComment = ({profileImage, tutor, tutorName, session, sessionName, opinion, rating, date}) => {

  const [profileImg, setProfileImg] = useState(null);

  useEffect(() => {
    const getImage = async(tutorId) => {
      const res = await getProfileImage(tutorId);
      console.log(res.profileImage);
      setProfileImg(res.profileImage);
    }
    getImage(tutor);
  }, [])
 
  const days = getDays(date);
  
  return (
    <div className="card my-3 bg-muted" style={{width: '800px'}}>
    <div className="card-body">
      <img src={profileImg == null ? null : `https://tuthor-app.herokuapp.com/images/${profileImg}`} style={{width: '50px', height: '50px'}} className="rounded float-left" alt="" />
      <p>&nbsp;<strong>{tutorName}</strong>&nbsp;  {days === 0? 'today': days === 1? 'a day ago': `${days} days ago` }</p><br />
      <p>&nbsp;<strong>{sessionName}</strong>&nbsp; <Rating name="stars" value={rating} precision={1} readOnly/></p>
      <p className="p-2 border border-white rounded">{opinion}</p>
    </div>
  </div>
)
}


export default StudentComment