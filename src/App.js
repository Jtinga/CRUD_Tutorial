import react, {useState} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import Person from './pages/person';
import Login from './pages/login';
import Register from './pages/register';

import './App.css';

function App() {

  return (
    <Router>
      <Switch>
        <Route path='/person' exact><Person /></Route>
        <Route path='/login' exact><Login /></Route>
        <Route path='/register' exact><Register /></Route>
        <Redirect to='/login' />
      </Switch>
    </Router>
  )
}

export default App;