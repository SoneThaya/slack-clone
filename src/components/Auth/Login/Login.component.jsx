import React, { useState } from 'react'
import { Grid, Form, Segment, Icon, Header, Button, Message } from 'semantic-ui-react';
import firebase from '../../../server/firebase'
import { Link } from 'react-router-dom';

import '../Auth.css'

const Login = () => {

  let user = {
    email: '',
    password: '',
  }

  let errors = [];

  const [userState, setUserState] = useState(user);
  const [errorState, setErrorState] = useState(errors);
  const [isLoading, setIsLoading] = useState(false);

  const handleInput = (e) => {
    let target = e.target;

    setUserState((currentState) => {
      let currentUser = { ...currentState };
      currentUser[target.name] = target.value;
      return currentUser;
    })
  }

  const checkForm = () => {
    if (isFormEmpty()) {
      setErrorState((error) => error.concat({ message: "Please fill in all fields." }));
      return false;
    } 
    return true;
  }

  const isFormEmpty = () => {
    return !userState.password.length ||
      !userState.email.length;
  }

  const formatErrors = () => {
    return errorState.map((error, index) => <p key={index}>{error.message}</p>)
  }

  const onSubmit = (e) => {
    setErrorState(() => []);
    if (checkForm()) {
      setIsLoading(true);
      firebase.auth()
        .signInWithEmailAndPassword(userState.email, userState.password)
        .then(user => {
          setIsLoading(false);
          console.log(user)
        })
        .catch(serverError => {
          setIsLoading(false);
          setErrorState((error) => error.concat(serverError));
        })
    }
  }


  return (
    <Grid verticalAlign="middle" textAlign="center" className="grid-form">
      <Grid.Column style={{ maxWidth: '500px' }}>
        <Header icon as="h2">
          <Icon name="slack" />
          Login
        </Header>
        <Form onSubmit={onSubmit}>
          <Segment stacked>
          
            <Form.Input
              name="email"
              value={userState.email}
              icon="mail"
              iconPosition="left"
              onChange={handleInput}
              type="email"
              placeholder="User Email"
            />
            <Form.Input
              name="password"
              value={userState.password}
              icon="lock"
              iconPosition="left"
              onChange={handleInput}
              type="password"
              placeholder="User Password"
            />
            
          </Segment>

          <Button disabled={isLoading} loading={isLoading}>Login</Button>
        </Form>

        {errorState.length > 0 && <Message error>
          <h3>Errors</h3>
          {formatErrors()}
        </Message>}

        <Message>
          Not a user? <Link to="/register">Register here</Link>
        </Message>

      </Grid.Column>
    </Grid>
  )
}

export default Login
