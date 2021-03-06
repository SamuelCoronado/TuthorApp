import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router,Route, Redirect, Switch} from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import SearchContainer from './components/layout/SearchContainer';
import AlertComponent from './components/layout/AlertComponent';
import ProfileContainer from './components/layout/profile/ProfileContainer'
import NewTutoring from './components/layout/tutoring/NewTutoring';
import TutoringsContainer from './components/layout/tutoring/TutoringsContainer';
import NewSession from './components/layout/session/NewSession';
import SessionsContainer from './components/layout/session/SessionsContainer';
import RecordContainer from './components/layout/session/RecordContainer';
import {UserContainer} from './components/layout/profile/UserContainer';
import UserTutorings from './components/layout/profile/UserTutorings';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Loading from './components/layout/Loading'
import HowToUse from './components/layout/HowToUse';
import Footer from './components/layout/Footer';
import store from './store';
import {loadUser} from './actions/authActions';
import {connect} from 'react-redux'
import './App.css';

/* if(localStorage.token){
  axios.defaults.headers.commmon['x-auth-token'] = localStorage.token;
}else{
  delete axios.defaults.headers.commmon['x-auth-token']
} */

function App({isAuthenticated}) {

   useEffect(() => {
    store.dispatch(loadUser());
    
  },[]) 
  

  return (
    <Router>
      <Navbar/>
      {
        isAuthenticated === null ? <Loading height={200} width={200} />
        :
        isAuthenticated === true ? <Redirect to="/profile" />
        :
        /* isAuthenticated === true ? null 
        :
        <Redirect to="/login" /> */
        <Redirect to="/login" />
      }
      <AlertComponent/>
      <Switch>
        <Route exact path="/tutoring/:tutoringId/newSession" component={NewSession} />
        <Route exact path="/search" component={SearchContainer} />
        <Route exact path="/newTutoring" component={NewTutoring} />
        <Route exact path="/profile/tutorings" component={TutoringsContainer} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/howToUse" component={HowToUse} />
        <Route exact path="/profile/sessions/active" component={SessionsContainer} />
        <Route exact path="/profile/sessions/record" component={RecordContainer} />
        <Route exact path="/profile" component={ProfileContainer} />
        <Route exact path="/user/:userId/tutorings" component={UserTutorings} />
        <Route exact path="/users/:userId">
          <UserContainer />
        </Route>
      </Switch>
      {/* <Footer /> */}
    </Router>
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.authReducer.isAuthenticated
})

export default connect(mapStateToProps, null)(App)
