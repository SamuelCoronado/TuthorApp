import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import DatePicker from 'react-datepicker'
import Map from '../Map';
import Loading from '../Loading';
import {getTutoringInfo, setSessionsToFalse, setSessions, addSession, createTutoringSession} from '../../../actions/sessionActions';
import Hour from './Hour';
import SelectedHour from './SelectedHour'
import "react-datepicker/dist/react-datepicker.css";

const NewSession = ({user, location, getTutoringInfo, tutoring, disabledDates, setSessionsToFalse, setSessions, sessions, selectedSessions, amountToPay, createTutoringSession}) => {

    const {tutoringId} = useParams();

    /* const [newSessionData, setNewSessionData] = useState({
        tutoring: tutoring == null? null: tutoring._id,
        student: null,
        
    }) */

    const [startDate, setStartDate] = useState(new Date());

    const [show, setShow] = useState(false);

    const onClick = (e) => {
        e.preventDefault();
        setShow(true)
    }

    useEffect(() => {
        const getTutoringData = async() => {
            try {
                getTutoringInfo(tutoringId);
            } catch (err) {
                console.log(err);
                
            }
        }
        getTutoringData();
        
    }, [])

    if(tutoring == null) return <Loading height={'200px'} width={'200px'} />

        const {
            tags,
            hours,
            days,
            signature,
            price,
            from,
            to,
            description
        } = tutoring

        
        const {name, _id} = tutoring.tutor

         const getFinishedSchedule = (tutoringHours, sessions) => {
            console.log(sessions);
            const sessionsHours = []

            if(sessions.length === 0){
                setSessions([...tutoringHours])
                return;
            }

            if(sessions.length === tutoringHours.length){
                setSessions([...sessions]);
                return;
            }
            
            tutoringHours.forEach((tutoringHour) => {  
                let item = tutoringHour; 
                 sessions.forEach((session) => {  
                    if(session.hours.includes(tutoringHour)){ 
                      item = {...session}
                      item.hours = tutoringHour
                    }  
                }) 
               sessionsHours.push(item)
            })
            setSessions([...sessionsHours])   
        }
    
        const getSessions = async(tutorId, date) => {
            
            setSessionsToFalse();
            const res = await axios.get('https://tuthor-app.herokuapp.com/api/tutorings/'+tutoringId+'/sessions',{params:{tutor: tutorId, date:date.toDateString()}});
            getFinishedSchedule(hours,res.data)
        }

        const confirmSession = async(e) => {
            e.preventDefault();
            
            
            await createTutoringSession({
                tutoringId: tutoring._id,
                studentId: user.user._id,
                studentName: user.user.name,
                profileImage: user.user.profileImage,
                sessionName: signature,
                tutorName: name,
                description: description,
                tags: tags,
                tutorId: _id, 
                amountToPay,
                location,
                selectedHoursArray: selectedSessions.map((session) => session.hours),
                date: startDate.toDateString()
            });
            await getSessions(_id,startDate)

        }

        return (
            <>
                <Modal show={show} size="lg"  animation={true} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                <Modal.Title>Add new study</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                        <Map/>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="primary" onClick={() => setShow(false)}>
                    Save location
                </Button>
                </Modal.Footer>
            </Modal>
                <div className="container">
                <h2 className="text-info">
                    Agend {signature} session
                </h2>
                <hr />
                </div>
                <div className="container">
                <div className="row">
                    <div className="col">
                        <h4>Session with {name}</h4>
                    </div>
                    <div className="col">
                    <h4>
                        Price per hour: {price}
                    </h4>
                    </div>
                </div>
                </div>
                <div className="container p-3">
                <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                    <label htmlFor="location">Location (i.e. Calle Revolucion #123, Guanajuato)</label>
                    <input type="text" className="form-control" value={location} id="location" placeholder="Location" readOnly/> 
                    <div className="mt-3">
                        or <button onClick={(e) => onClick(e)} className="btn btn-primary">Select</button>
                    </div> 
                    </div>
                    <br/>
                    <p>Select the day you'd like to take the sessions</p>
                    <DatePicker
                        dateFormat="yyyy/MM/dd"
                        selected={startDate}
                        onChange={date =>setStartDate(date)}
                        onSelect={(date) => getSessions(_id, date)}
                        excludeDates={disabledDates}
    
                    />
                    <br/><br/>
                    {/* <div className="form-group">
                    <label htmlFor="date">Date</label>
                    <input type="date" value={date} className="form-control" id="date" placeholder="Date" onChange={(e) => setDate(e.target.value)} /><br/> <button className="btn btn-primary" onClick={() => getSessions(_id, date)}>Search</button>
                    </div> */}
                </div>  
                </div>
                <div className="container">
                    {
                        sessions == null ?
                        null
                        :sessions === false ?
                        <Loading height={'200px'} width={'200px'} />
                        :
                        sessions.map((session) => {
                            return(
                                Object.keys(session).includes('location')?
                                <Hour hour={session.hours} location={session.location} available={false} />
                                :
                                <Hour hour={session} available={true}  sessions={sessions}  />
                            )
                        })
    
                    }
                </div>
                <div className="container">
                    <hr />
                    {
                    selectedSessions.length > 0 ?
                     selectedSessions.map((session, index) => { 

                        if(index === selectedSessions.length-1){
                            return(
                                <>
                                    <SelectedHour location={session.location} hours={session.hours} />
                                    <h3 className="text-right">to pay: ${amountToPay} </h3>
                                    <button className="btn btn-primary btn-lg text-center" onClick={(e) => confirmSession(e)}>Confirm</button>
                                </>
                            )
                        }
                         return(
                            <SelectedHour location={session.location} hours={session.hours} />
                        )
                     })
                     :
                     <h3 className="text-center">No selected sessions</h3>
                    }

                </div>
            </div>
          </>
        )
    }  

const mapStateToProps = (state) => ({
    location: state.newSessionReducer.location,
    tutoring: state.newSessionReducer.tutoring,
    disabledDates: state.newSessionReducer.disabledDates,
    sessions: state.newSessionReducer.sessions,
    selectedSessions: state.newSessionReducer.selectedSessions,
    amountToPay: state.newSessionReducer.amountToPay,
    user: state.authReducer.user
})

export default connect(mapStateToProps, {getTutoringInfo,setSessionsToFalse,setSessions, addSession, createTutoringSession})(NewSession)
