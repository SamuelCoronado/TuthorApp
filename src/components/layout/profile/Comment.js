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
        <div className="card my-3 text-white" style={{width: '800px', backgroundColor: '#84a9ac'}}>
        <div className="card-body">
          <img src={profileImg == null ? 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAM1BMVEXk5ueutLfn6eqrsbTp6+zg4uOwtrnJzc/j5earsbW0uby4vcDQ09XGyszU19jd3+G/xMamCvwDAAAFLklEQVR4nO2d2bLbIAxAbYE3sDH//7WFbPfexG4MiCAcnWmnrzkjIRaD2jQMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMw5wQkHJczewxZh2lhNK/CBOQo1n0JIT74/H/qMV0Z7GU3aCcVPuEE1XDCtVLAhgtpme7H0s1N1U7QjO0L8F7llzGeh1hEG/8Lo7TUmmuSrOfns9xnGXpXxsONPpA/B6OqqstjC6Ax/0ujkNdYQQbKNi2k64qiiEZ+ohi35X+2YcZw/WujmslYewiAliVYrxgJYrdwUmwXsU+RdApUi83oNIE27YvrfB/ZPg8+BJETXnqh9CVzBbTQHgojgiCvtqU9thFJg/CKz3VIMKMEkIXxIWqIpIg2SkjYj+xC816mrJae2aiWGykxRNsW0UwiJghJDljYI5CD8GRiCtIsJxizYUPQ2pzItZy5pcisTRdk/a9m4amtNNfBuQkdVhSaYqfpNTSFGfb9GRIakrE2Pm+GFLaCQPqiu0OpWP+HMPQQcgQMiQprWXNmsVwIjQjYi/ZrhAqNTCgr2gu0Jnz85RSSjso0HkMFZ0YZjKkc26a/jlmh9JiDyDxi9oeorTYAzZkwwoMz19pzj9bnH/GP/+qbchjSGflneWYhtTuKdMOmNKZcJ5TjInQKcYXnESd/jQxy0ENpULTNGOGgxpap/oyw9pbUAqhfx2Dbkhovvfgz4iUzoM9+GlK6/Mh4q29hyC1mwro30hpVVLPF9wYQr71RazOeM5/cw81iBRD+A03aM9/C/obbrKjbYSpCmIVG3qT/Q8oeUo3Rz0IL7vI1tEbCB9pSiu8I/aV8x3Kg/BGWrWp4ZVs0nZfmAoEG4h/61yHYIJiFSl6Q0Vk6tTW1N8kYp8hdOkfHYYMXd2Qft+8CYwqYDSKvqIh+MCF8Wgca2u/cwdgeW3TtuVn6+1oBs3yLo5C2JpK6CvQzGpfUkz9UG/87gCsi5o2LIXolxN0FbwAsjOLEr+YJmXn7iR6N0BCt5p5cMxm7eAsfS+/CACQf4CTpKjzgkvr2cVarVTf96372yut7XLJ1sa7lv6VcfgYrWaxqr3Wlo1S6pvStr22sxOtTNPLzdY3nj20bPP+ejFdJYkLsjGLdtPBEbe/mr2bQKiXWJDroA+vtzc0p9aahuwqHMDYrQEXHEw9jwQl3drMpts9JBU1SdktPe5FBRdJQ6bwXBpa57ib2A8kukQDzMjh++Uo7Fo6Wd02Pkf4fknqoo4HtvAIjsqUcjx6DIPgWCaOML9rKI/oqD9/lgNrn+eF+p7j8tnzHBiR7+kdUGw/+V1Kzkc75mMy6U+FMaxjPibiM1U1uGM+puInHpmALZCgP4pt7i840MV8+0R1zPsRB6UTcqpizncYwZ89syDydfyWCwXB1l8/zRNGWbTG/GHKUm9AkxHMc/EGSk3z2+ArEhPEV5TUBLEvUGFcjEUH80J/jveTGOAJEljJbILWGQT3zRYiwuKsUXN1EEJAzBhRJFll7mBUG7KD8EqPkKekBREaL8hMDZLQSG6AQjtHPYmvTQnX0TtpC1SYCe2YdkkyLP3jj5BSbKiuR585eQhTgoje6yIb0Yb0C+mV6EYvebqw5SDy2WmubogZiF2AVxPC2FpDf8H2Q9QWo6IkjUxTWVEI3WY/wrCeSuqJ+eRWzXR/JXwgVjUMozbCOfoEZiSiKVGepqv5CJ8RyR4D7xBeamqa7z3BJ/z17JxuBPdv93d/a2Ki878MMAzDMAzDMAzDMAzDMF/KP09VUmxBAiI3AAAAAElFTkSuQmCC' : `https://tuthor-app.herokuapp.com/images/${profileImg}`} style={{width: '50px', height: '50px'}} className="rounded float-left" alt="" />
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