import React, {useState} from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {setAboutInfo} from '../../../actions/profileActions';
import {connect} from 'react-redux';

const About = ({about, isUserProfile, setAboutInfo}) => {

    const [aboutInput, setAboutInput] = useState('');

    const onChange = (e) => {
        setAboutInput(e.target.value);
        console.log(aboutInput);
        
    }

    const onSubmit = (e) => {
        e.preventDefault();
        setAboutInfo(aboutInput);
    }

    return (
        <div className="container mb-5 row">
         <h4>About me</h4>
         <br /><br />
         {
             about?
             <div className="container">
                 <p>{about}</p>
             </div>
             :
             isUserProfile?
             <div className="container">
                 <p>This user has not writen anything about him</p>
             </div>
             :
             <div className="container">
                <Form onSubmit={(e) => onSubmit(e)}>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Tell us something about you</Form.Label>
                        <Form.Control onChange={(e) => onChange(e)} as="textarea" rows="3"  />
                    </Form.Group>
                    <Button type="submit" className="btn btn-primary">Save</Button>
                </Form>
             </div>
         }
         
      </div> 
    )
}



export default connect(null, {setAboutInfo})(About)