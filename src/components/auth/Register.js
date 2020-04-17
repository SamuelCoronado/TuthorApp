import React, {useState} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux'
import {setAlert} from '../../actions/alertActions';
import {register} from '../../actions/authActions';
import axios from 'axios';


const Register = ({setAlert, register, isAuthenticated}) => {

  

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: '',
        city: '',
        state: '',
        birthdate: ''

    });

    const [emailError, setEmailError] = useState(null);

    const getEmails = async() => {
        const res = await axios.get('http://localhost:3000/api/users/emails');
        return res.data
    }

    const {
        name,
        email,
        password,
        password2,
        city,
        state,
        birthdate
    } = formData

    const onChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
        console.log(e.target.value);   
    }

    const onSubmit = (e) => {
        e.preventDefault()
        if(formData.password !== formData.password2){
            setAlert('error', 'Passwords do not match')
            //console.log('Passwords do not match');
            return;
        }else{
          
          register({
            name,
            email,
            password,
            city,
            state,
            birthdate
          })
        }     
    }

    const handleDateOfBirth = (e) => {
        const inputDate = new Date(e.target.value).getFullYear();
        console.log(inputDate);
        if(inputDate > 1980){ 
            if(((new Date(Date.now()).getUTCFullYear()) - inputDate) < 5){
                setAlert('warning','Age should be greater than 5')
                setFormData({...formData, birthdate: ''})
                return;
                 
            }
            setFormData({...formData, birthdate: e.target.value}) 
        }
        setFormData({...formData, birthdate: e.target.value})    
    }

    const handleEmail = (e) => {
        //Persist the event so it does not take the call, but instead keeps the input of the user
        e.persist();
        setFormData({...formData, email: e.target.value})
        //Email error set to null so it won't show anything
        setEmailError(null)
        const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(e.target.value.match(mailFormat)){
            //Get the emails already taken from the database
            getEmails().then((mails) => {
                if(mails.includes(e.target.value)){
                    setEmailError('is-invalid');
                }else{
                    setEmailError('is-valid')
                }
            })
        }  
    }

    if(isAuthenticated) return <Redirect to="/profile" />

    return (
        <>    
        <div className="container my-5">
          <h2 className="text-info">
            Register
          </h2>
          <hr />
        </div>
        <div className="container">
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" className="form-control" value={name} onChange={(e) => onChange(e)} name="name" placeholder="Name" />
            </div>
            
            <div className="form-group">
              <label htmlFor="name">Email</label>
              <input type="email" className={`form-control ${emailError}`}  value={email} onChange={(e) => handleEmail(e)} name="email" placeholder="Email" />
              {
                emailError === null?
                <div className="valid-feedback">
                Looks good!
                </div>
                :
                emailError === 'is-valid'?
                <div className="valid-feedback">
                Looks good!
                </div>
                :
                <div className='invalid-feedback'>
                Email already exists
                </div>
            }
            </div>            
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="password">Password</label>
                <input type="password" className="form-control" value={password} onChange={(e) => onChange(e)} name="password" placeholder="Password" />
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="password2">Confirm password</label>
                <input type="password" className="form-control" value={password2} onChange={(e) => onChange(e)} name="password2" placeholder="Confirm password" />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="city">City</label>
                <input type="text" className="form-control" value={city} onChange={(e) => onChange(e)} name="city" />
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="state">State</label>
                <select name="state" onChange={(e) => onChange(e)} value={state} className="form-control">
                  <option defaultValue>Choose...</option>
                  <option>Guanajuato</option>
                  <option>Jalisco</option>
                  <option>Aguascalientes</option>
                  <option>Queretaro</option>
                  <option>Nuevo Leon</option>
                </select>
              </div>   
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="birthdate">Birthdate</label>
                <input type="date" className="form-control" value={birthdate} onChange={(e) => handleDateOfBirth(e)} name="birthdate" />
              </div>
            </div>
            <button type="submit" className="btn btn-primary">Sign in</button>
          </form>
        </div>
      </>
    )
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.authReducer.isAuthenticated
})

export default connect(mapStateToProps, {setAlert, register})(Register) 
 