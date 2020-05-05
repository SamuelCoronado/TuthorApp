import React, { useState } from "react";
import {Redirect} from 'react-router-dom';
import {login} from '../../actions/authActions';
import {connect} from 'react-redux'

const Login = ({login, isAuthenticated}) => {

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const onChange = (e) => {
        setFormData({...formData, [e.target.id]: e.target.value});
        console.log(formData);
    }

    const {email, password} = formData;

    const onSubmit = (e) => {
        e.preventDefault();
        login(email, password)
    }

    if(isAuthenticated) return <Redirect to="/profile" />

  return (
    <>
      <div className="container p-3 my-3">
        <h1 className="text-info">Sign In</h1>
      </div>
      <div className="container">
        <hr style={{ borderWidth: "1.5px" }} />
      </div>
      <div className="container my-5">
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
              placeholder="Enter your email"
              onChange = {(e) => onChange(e)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="password"
              onChange = {(e) => onChange(e)}
            />
          </div>
          <button type="submit" className="btn btn-info my-3">
            Login
          </button>
        </form>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.authReducer.isAuthenticated
})

export default connect(mapStateToProps, {login})(Login)
