import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Register from './components/Auth/Register/Register.component';
import Login from './components/Auth/Login/Login.component'

import 'semantic-ui-css/semantic.min.css'


ReactDOM.render(
  <>
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route exact path="/" component={App} />
      </Switch>
    </Router>
  </>,
  document.getElementById('root')
);

