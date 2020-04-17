import React, {useState} from 'react';
import {connect} from 'react-redux';
import Study from './Study';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {addStudy,deleteStudy} from '../../../actions/profileActions';


const StudiesContainer = ({studies, isUserProfile, addStudy,deleteStudy}) => {

    console.log(isUserProfile);
    

    const [formData, setFormData] = useState({
        institute: '',
        from: '',
        to: '',
        signature: '',
        description: ''
    });

    const {
        institute,
        from,
        to,
        signature,
        description
    } = formData

    const [show, setShow] = useState(false);

    const handleAddStudy = (e) => {
        e.preventDefault();
        const newStudyInfo = {
            institute,
            period: from+'-'+to,
            signature,
            description

        };

        addStudy(newStudyInfo);
        setShow(false)
    };

    const handleClose = () => {
        setShow(false)
    }

    const onChange = (e) =>{
        setFormData({...formData, [e.target.id]:e.target.value})
        console.log(e.target.id);
        
    }

    const handleShow = () => setShow(true);

    return (
        <>
       

      <Modal show={show} onHide={handleClose} animation={true}>
        <Modal.Header closeButton>
          <Modal.Title>Add new study</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form onSubmit={(e) => handleAddStudy(e)}>
            <Form.Group controlId="institute">
                <Form.Label>Where did you take the course?</Form.Label>
                <Form.Control type="text" placeholder="Type institute" value={institute} onChange={(e) => onChange(e)} />
            </Form.Group>
            <Row>
                <Col>
                    <Form.Group controlId="from">
                        <Form.Label>From year</Form.Label>
                        <Form.Control type="text" placeholder="Start year" value={from} onChange={(e) => onChange(e)}/>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId="to">
                        <Form.Label>To year</Form.Label>
                        <Form.Control type="text" placeholder="Finish year" value={to} onChange={(e) => onChange(e)}/>
                    </Form.Group>
                </Col>
            </Row>
            <Form.Group controlId="signature">
                 <Form.Label>Signature</Form.Label>
                 <Form.Control type="text" placeholder="Signature" value={signature} onChange={(e) => onChange(e)}/>
            </Form.Group>
            <Form.Group controlId="description">
                 <Form.Label>Description</Form.Label>
                 <Form.Control as="textarea" rows="3" placeholder="Description" value={description} onChange={(e) => onChange(e)}/>
            </Form.Group>

            <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
        <div className="col-md-3 border-right border-secundary">
            <h3 className="text-center">Studies</h3>
            {
                studies.length === 0 ?
                isUserProfile? <p>This user has no info about his studies</p>
                :
                <button className="btn btn-block btn-primary" onClick={handleShow}>Add a study</button>
                :
                studies.length === 3 ?
                studies.map((study) => {
                    return(
                        <Study id={study._id} signature={study.signature} institute={study.institute} period={study.period} description={study.description} deleteStudy={deleteStudy} isUserProfile={isUserProfile}/>
                       
                    )
                })
                :
                studies.map((study, index) => {
                    if(index === studies.length-1){
                        return(
                            <>
                                <Study id={study._id} signature={study.signature} institute={study.institute} period={study.period} description={study.description} deleteStudy={deleteStudy} isUserProfile={isUserProfile}/>
                                {
                                    isUserProfile? null
                                    :
                                    <button className="btn btn-block btn-primary" onClick={handleShow}>Add a study</button>
                                }
                                
                            </>
                        )
                    }
                    return(
                        <Study id={study._id} signature={study.signature} institute={study.institute} period={study.period} description={study.description} deleteStudy={deleteStudy} isUserProfile={isUserProfile}/>
                       
                    )
                })
                
            }
            
            
      </div>
      </>
    )
}

export default connect(null, {addStudy, deleteStudy})(StudiesContainer)