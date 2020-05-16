import React, { useState } from "react";
import axios from 'axios';
import {connect} from 'react-redux';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Rating from '@material-ui/lab/Rating'
import {updateSessionsToTake, updateSessionsToGive} from '../../../actions/sessionActions';

const Session = (props) => {

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
    })
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
      <div className="card">
        <div className="card-header bg-dark text-white mt-2 mx-2">
          {sessionName} session
        </div>
        <div className="card-body">
            {
              toTake?
              <p>With {tutorName}</p>
              :
              <p>With {studentName}</p>
            }
            <p>at {location}</p>
          <p>{new Date(date).toDateString()}</p>
          <p>Schedule:</p>
          {hours.map((hour) => (
            <h5 className="p-2 bg-info text-center text-white">{hour}</h5>
          ))}
          {
            toTake && <p className="card-text">{description}</p>
          }
          {
            toTake?
            <p className="card-text">To pay: ${totalPrice}</p>
            :
            <p className="card-text">To be paid: ${totalPrice}</p>
          }
          
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
          <button className="btn btn-block btn-primary" onClick={(e) => handleShow(e)}>
              Leave an opinion
          </button>
        </div>
      </div>
    </>
  );
};

export default connect(null,{updateSessionsToTake, updateSessionsToGive})(Session);
