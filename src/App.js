import React, {useEffect} from 'react';
import {BrowserRouter as Router,Route, Redirect, Switch} from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import SearchContainer from './components/layout/SearchContainer';
import AlertComponent from './components/layout/AlertComponent';
import ProfileContainer from './components/layout/profile/ProfileContainer'
import NewTutoring from './components/layout/tutoring/NewTutoring';
import TutoringsContainer from './components/layout/tutoring/TutoringsContainer';
import NewSession from './components/layout/session/NewSession';
import SessionsContainer from './components/layout/session/SessionsContainer';
import {UserContainer} from './components/layout/profile/UserContainer';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
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
      <AlertComponent/>
      <Switch>
        <Route exact path="/tutoring/:tutoringId/newSession" component={NewSession} />
        <Route exact path="/search" component={SearchContainer} />
        <Route exact path="/newTutoring" component={NewTutoring} />
        <Route exact path="/profile/tutorings" component={TutoringsContainer} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/profile/sessions" component={SessionsContainer} />
        <Route exact path="/profile" component={ProfileContainer} />
        <Route exact path="/users/:userId">
          <UserContainer />
        </Route>
      </Switch>
      {
        isAuthenticated? null
        :
        <Redirect to="/login" />
      }
    </Router>
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.authReducer.isAuthenticated
})

export default connect(mapStateToProps, null)(App)
