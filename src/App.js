import React, {useEffect} from 'react';
import {BrowserRouter as Router,Route, Redirect, Switch} from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import AlertComponent from './components/layout/AlertComponent';
import ProfileContainer from './components/layout/profile/ProfileContainer'
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
        <Route exact path="/register" component={Register} />
        <Route exact path="/profile" component={ProfileContainer} />
      </Switch>
    </Router>
  );
}

export default App;
