import React, {useEffect} from 'react';
import {BrowserRouter as Router,Route, Redirect, Switch} from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import AlertComponent from './components/layout/AlertComponent';
import ProfileContainer from './components/layout/profile/ProfileContainer'
import NewTutoring from './components/layout/tutoring/NewTutoring';
import TutoringsContainer from './components/layout/tutoring/TutoringsContainer';
import Map from './components/layout/Map'
import {UserContainer} from './components/layout/profile/UserContainer';
import Register from './components/auth/Register';
import store from './store';
import {loadUser} from './actions/authActions';
import './App.css';
import axios from 'axios';

/* if(localStorage.token){
  axios.defaults.headers.commmon['x-auth-token'] = localStorage.token;
}else{
  delete axios.defaults.headers.commmon['x-auth-token']
} */

function App() {

   useEffect(() => {
    store.dispatch(loadUser());
  },[]) 

  return (
    <Router>
      <Navbar/>
      <AlertComponent/>
      <Switch>
        <Route exact path="/newTutoring" component={NewTutoring} />
        <Route exact path="/tutorings" component={TutoringsContainer} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/profile" component={ProfileContainer} />
        <Route exact path="/users/:userId">
          <UserContainer />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
