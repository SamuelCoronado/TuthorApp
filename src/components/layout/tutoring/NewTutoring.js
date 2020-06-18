import React, {useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {addTutoring} from '../../../actions/profileActions';
//import DatePicker from './DatePicker';

const NewTutoring = ({addTutoring}) => {

  const getHours = (initialHour, finalHour) =>{

    console.log(initialHour, finalHour)
    let hours = [];
    initialHour = parseInt((initialHour.split(':')[0]))
    finalHour = parseInt((finalHour.split(':')[0]))
    
    console.log(initialHour, finalHour);
    

    for(let i = initialHour; i<finalHour; i++){
        const hour = `${i}:00-${i+1}:00`
        hours.push(hour)
        
    }

   return hours
}

    const useStyles = makeStyles((theme) => ({
        container: {
          display: 'flex',
          flexWrap: 'wrap',
        },
        textField: {
          marginLeft: theme.spacing(1),
          marginRight: theme.spacing(1),
          width: 200,
        },
      }));

  const [firstTime, setFirstTime] = useState('07:00');
  const [secondTime, setSecondTime] = useState(firstTime);
  const classes = useStyles();

  const handleSecondTime = (e) => {
    e.preventDefault();
    if(e.target.value < firstTime){
      console.log('Second hour should be greater than the first one')
      return;
    }else{
        setTutoringInfo({...tutoringInfo, to: e.target.value, hours:getHours(tutoringInfo.from, e.target.value)})
        //setTutoringInfo({...tutoringInfo, hours: getHours(tutoringInfo.from, tutoringInfo.to)})
        console.log(tutoringInfo);
      setSecondTime(e.target.value)
    }
  }

  const handleFirstTime = (e) => {
    e.preventDefault();
    if(e.target.value > secondTime){
      console.log('First hour should be smaller than the second one');
      return;
    }else{
      setTutoringInfo({...tutoringInfo, from: e.target.value, hours:getHours(e.target.value, tutoringInfo.to)})
      //setTutoringInfo({...tutoringInfo, hours: getHours(tutoringInfo.from, tutoringInfo.to)})
      console.log(tutoringInfo);
      setFirstTime(e.target.value)
    }
  }

    const [tutoringInfo, setTutoringInfo] = useState({
        signature:'',
        price: '',
        tags: [],
        days:[],
        from: '',
        to: '',
        hours:[],
        description: ''
    });


    const [tag, setTag] = useState('');
    const [tutoringCreated, setTutoringCreated] = useState(false)

    const onChange = (e) => {
        setTutoringInfo({...tutoringInfo, [e.target.name]: (e.target.name === 'days' || e.target.name === 'tags') ? [...tutoringInfo[e.target.name], e.target.value] : e.target.value})
        console.log(tutoringInfo);
    }

    const onClick = (e) => {
        e.preventDefault()
        setTutoringInfo({...tutoringInfo, tags: [...tutoringInfo['tags'], tag] })
        console.log(tutoringInfo);
        
    }

    const onSubmit =(e) => {
        e.preventDefault();
        addTutoring(tutoringInfo);
        setTutoringCreated(true);

    }

    if(tutoringCreated) return <Redirect to="/tutorings" />

    return (
        <>
        <div className="container">
          <h2 className="text-info text-center">
            Add Tutoring <i class="fas fa-plus-circle"></i>
          </h2>
          <hr />
        </div>
        <div className="container">
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="form-row">
              <div className="col">
                <label className="form-check-label" htmlFor="signature">Signature</label>
                <input type="text" className="form-control" name="signature" placeholder="Signature" onChange = {(e) => onChange(e)}/>
              </div>
              <div className="col">
                <label className="form-check-label" htmlFor="signature">Price p/h</label>
                <input type="number" className="form-control" name="price" placeholder="Price per hour" onChange = {(e) => onChange(e)} />
              </div>
            </div>
            <br />
            <div className="form-row">
              <div className="col">
                <p>Days you are available</p>
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" defaultValue="Mon" name="days" id="Mon" onChange = {(e) => onChange(e)} />
                  <label className="form-check-label" htmlFor="Mon">
                    Monday
                  </label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" defaultValue="Tue" name="days" id="Tue" onChange = {(e) => onChange(e)} />
                  <label className="form-check-label" htmlFor="Tue">
                    Tuesday
                  </label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" defaultValue="Wed" name="days" id="Wed" onChange = {(e) => onChange(e)}/>
                  <label className="form-check-label" htmlFor="Wed">
                    Wednesday
                  </label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" defaultValue="Thu" name="days" id="Thu" onChange = {(e) => onChange(e)}/>
                  <label className="form-check-label" htmlFor="Thu">
                    Thursday
                  </label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" defaultValue="Fri" name="days" id="Fri" onChange = {(e) => onChange(e)}/>
                  <label className="form-check-label" htmlFor="Fri">
                    Friday
                  </label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" defaultValue="Sat" name="days" id="Sat" onChange = {(e) => onChange(e)}/>
                  <label className="form-check-label" htmlFor="Sat">
                    Saturday
                  </label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" defaultValue="Sun" name="days" id="Sun" onChange = {(e) => onChange(e)}/>
                  <label className="form-check-label" htmlFor="Sun">
                    Sunday
                  </label>
                </div>
              </div>
              <div className="col">
                <div className="form-group">
                  <label htmlFor="exampleFormControlTextarea1">Description</label>
                  <textarea className="form-control" name="description" id="exampleFormControlTextarea1" rows={3} defaultValue={""} onChange = {(e) => onChange(e)}/>
                </div>
                <div className="form-group">
                  <label className="form-check-label" htmlFor="tags">Tags</label>
                  <input type="text" className="form-control" name="tags" placeholder="Add a tag" onChange={(e) => setTag(e.target.value)} /> <br/>
                  {
                      tutoringInfo.tags.length > 0 ? 
                      <ul>
                         {
                         tutoringInfo.tags.map((tag) => {
                              return(
                                  <li>{tag}</li>
                              )
                          })}
                      </ul>
                      :null
                  }
                  <button className="btn btn-info" value={tag} onClick={(e) => onClick(e)}>Add</button>
                </div>
                <div className={classes.container}  onSubmit={(e) => (console.log)}>
      <TextField
        id="time1"
        label="from"
        type="time"
        onChange={(e) => handleFirstTime(e)}
        value={firstTime}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          step: 3600, // 1 hour
        }}
      />
      <TextField
        id="time2"
        label="to (select this one first)"
        type="time"
        value={secondTime}
        onChange = {(e) => handleSecondTime(e)}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          step: 3600, // 1 hour
        }}
      />
    </div>
              </div>
            </div> 
            <br />
            <button type="submit" className="btn btn-info btn-block">Create tutoring</button>
          </form>
        </div>
      </>
    )
}

export default connect(null, {addTutoring})(NewTutoring)
