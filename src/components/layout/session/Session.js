import React, { useState } from "react";
import {useLocation} from 'react-router-dom';
import axios from 'axios';
import {connect} from 'react-redux';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Rating from '@material-ui/lab/Rating'
import {getDays} from '../profile/Comment';
import {updateSessionsToTake, updateSessionsToGive} from '../../../actions/sessionActions';

const Session = (props) => {

 

  const path = useLocation().pathname.split('/')[3];

    const {
        tutoring,
        _id,
        sessionName,
        tutorName,
        description,
        tags,
        student,
        studentName,
        tutor,
        totalPrice,
        location,
        hours,
        date,
        ratedByTutor,
        ratedByStudent
      } = props.sessionInfo;


      const {updateSessionsToTake, updateSessionsToGive} = props
      const {toTake} = props
      const {userImage} = props

      console.log(userImage);
      
  
    const colors = [
    "primary",
    "secondary",
    "success",
    "danger",
    "warning",
    "dark",
  ];

 

  const [formData, setFormData] = useState({
    opinion: '',
    rating: 0
  });

  const [show, setShow] = useState(false);

  const handleShow = (e) =>{
       e.preventDefault();
       setShow(true)
    };

  const handleClose = () => {
    setShow(false);
  };


  const handleRating = (e) => setFormData({...formData, rating: e.target.value})

  const submitStudentOpinion = async(e) => {
    e.preventDefault();
    const config = {
      headers:{
          "Content-Type": "application/json"
      }
  }

  const body = JSON.stringify({
      tutor,
      session: _id,
      profileImage: userImage,
      sessionName,
      opinion: formData.opinion,
      rating: formData.rating
  })

  console.log(body);
  try {
        
    const res = await axios.post('https://tuthor-app.herokuapp.com/api/users/'+tutor+'/opinionsAsTutor', body, config);
    updateSessionsToTake(res.data)
    setFormData({
        opinion: '',
        rating: 0
    });
    handleClose()


  } catch (err) {
      console.log(err)
  }

}

const submitTutorOpinion = async(e) => {
  e.preventDefault();
  
  const config = {
    headers:{
        "Content-Type": "application/json"
    }
  }

  const body = JSON.stringify({
    student,
    session:_id,
    profileImage: userImage,
    sessionName,
    opinion: formData.opinion,
    rating: formData.rating
  })

  try {

    const res = await axios.post('https://tuthor-app.herokuapp.com/api/users/'+student+'/opinionsAsStudent', body, config);
    console.log(res.data);
    updateSessionsToGive(res.data)
    setFormData({
      opinion: '',
      rating: 0
  })
  handleClose()

    
  } catch (err) {
    console.log(err);
    
  }
}


  return (
    <>
      <Modal show={show} onHide={handleClose} animation={true}>
        <Modal.Header closeButton>
          <Modal.Title>Leave an opinion for {sessionName} session</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {
            toTake?
            <Form onSubmit={(e) => submitStudentOpinion(e)}>
            <Form.Group controlId="Write your opinion">
              <Form.Label>Your opinion</Form.Label>
              <Form.Control as="textarea" rows="3" placeholder="Write your opinion" onChange={(e) => setFormData({...formData, opinion: e.target.value})}/>
            </Form.Group>
            <p>Rating</p>
            <Rating name="stars" value={formData.rating} precision={1} onChange={(e) => handleRating(e)} /> <br/><br/>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
          :
          <Form onSubmit={(e) => submitTutorOpinion(e)}>
            <Form.Group controlId="Write your opinion">
              <Form.Label>Your opinion</Form.Label>
              <Form.Control as="textarea" rows="3" placeholder="Write your opinion" onChange={(e) => setFormData({...formData, opinion: e.target.value})}/>
            </Form.Group>
            <p>Rating</p>
            <Rating name="stars" value={formData.rating} precision={1} onChange={(e) => handleRating(e)} /> <br/><br/>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
          }
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="card rounded">
        <div className="card-header text-white text-center mt-2 mx-2" style={{backgroundColor: '#275DAD'}}>
          {sessionName} session
        </div>
        <div className="card-body">
          <h3 className="text-center">
            <i className="fas fa-user"></i>
          </h3>
            {
              toTake?
              <h5 className="text-center font-weight-bold"> {tutorName}</h5>
              :
              <p className="text-center font-weight-bold"> {studentName}</p>
            }
            <h3 className="text-center">
            <i className="fas fa-map-marker-alt"></i>
            </h3>
            <p className="text-center font-weight-bold" > {location}</p>
            <h3 className="text-center">
              <i className="fas fa-calendar-day"></i>
            </h3>
          <p className="text-center font-weight-bold"> {new Date(date).toDateString()}</p>
            <h3 className="text-center">
              <i className="fas fa-clock"></i>
            </h3>
          {hours.map((hour) => (
            <h5 className="p-2 border border-info text-center rounded">{hour}</h5>
          ))}
          <br/>
          {
            toTake && <p className="card-text text-secondary mb-3">{description}</p>
          }
          {
            toTake?
            path === 'active' ?
            <p className="card-text text-center font-weight-bold mb-3">To pay: <span className="p-2 border border-success rounded">${totalPrice}</span></p>
            :
            <p className="card-text text-center font-weight-bold mb-3">You paid: <span className="p-2 border border-success rounded">${totalPrice}</span></p>
            :
            path === 'active' ?
            <p className="card-text text-center font-weight-bold mb-3">To be paid: <span className="p-2 border border-success rounded">${totalPrice}</span></p>
            :
            <p className="card-text text-center font-weight-bold mb-3">Paid: <span className="p-2 border border-success rounded">${totalPrice}</span></p>
          }

          {
            toTake?
            <div className="mb-3">
            {tags.map((tag) => (
              <span
                className={`text-white mx-1 rounded p-1 bg-${
                  colors[Math.floor(Math.random() * colors.length)]
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
          :
            null
          }

          
          
          {/* {new Date(Date.now()) > new Date(date) ? (
            <button
              className="btn btn-block btn-primary"
              onClick={(e) => handleShow()}
            >
              Leave an opinion
            </button>
          ) : (
            <button className="btn btn-block btn-primary" disabled>
              Leave an opinion
            </button>
          )}  */}
          {
            path === 'active' ?
            new Date(Date.now()) < new Date(date) ?
            (
            <button className="btn btn-block btn-danger" disabled>
              in {getDays(date)} day(s)
            </button>
            )
            :
            <button className="btn btn-block btn-info" onClick={(e) => handleShow(e)}>
              Leave an opinion
            </button>
            :
            null  
          }
         
        </div>
      </div>
    </>
  );
};

export default connect(null,{updateSessionsToTake, updateSessionsToGive})(Session);
