import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router, Switch, Route, withRouter } from "react-router-dom";
import Register from './components/Auth/Register/Register.component';
import Login from './components/Auth/Login/Login.component';
import firebase from './server/firebase'

import 'semantic-ui-css/semantic.min.css'

const Index = (props) => {

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        props.history.push("/");
      } else {
        props.history.push('/login')
      }
    })
  }, []);

  return (
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route exact path="/" component={App} />
      </Switch>
  )
}

const IndexWithRouter = withRouter(Index);

ReactDOM.render(
  <>
    <Router>
      <IndexWithRouter />
    </Router>
  </>,
  document.getElementById('root')
);

