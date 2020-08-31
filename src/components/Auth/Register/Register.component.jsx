import React, { useState } from 'react'
import { Grid, Form, Segment, Icon, Header, Button, Message } from 'semantic-ui-react';
import firebase from '../../../server/firebase'

import './Register.css'

const Register = () => {

  let user = {
    userName: '',
    email: '',
    password: '',
    confirmPassword: ''
  }

  let errors = [];

  let userCollectionRef = firebase.database().ref('users');

  const [userState, setUserState] = useState(user);
  const [errorState, setErrorState] = useState(errors);

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
    } else if (!checkPassword()) {
      return false;
    }
    return true;
  }

  const checkPassword = () => {
    if (userState.password.length < 8) {
      setErrorState((error) => error.concat({ message: "Password length should be at least 8." }));
      return false;
    } else if (userState.password !== userState.confirmPassword) {
      setErrorState((error) => error.concat({ message: "Passwords do not match." }));
      return false;
    }
    return true
  }

  const isFormEmpty = () => {
    return !userState.userName.length ||
      !userState.password.length ||
      !userState.email.length ||
      !userState.confirmPassword.length;
  }

  const onSubmit = (e) => {
    setErrorState(() => []);

    if (checkForm()) {
      firebase.auth()
        .createUserWithEmailAndPassword(userState.email, userState.password)
        .then(createdUser => {
          updateUserDetails(createdUser)
        })
        .catch(serverError => {
          setErrorState((error) => error.concat(serverError));
        })
    }
  }

  const updateUserDetails = (createdUser) => {
    if (createdUser) {
      createdUser.user
        .updateProfile({
          displayName: userState.userName,
          photoURL: `http://gravatar.com/avatar/${createdUser.user.uid}?=identicon`
        })
        .then(() => {
          console.log(createdUser)
        })
        .catch((serverError) => {
          setErrorState((error) => error.concat(serverError));
        })
    }
  }

  const saveUserInDb = (createdUser) => {
    userCollectionRef.child(createdUser.user.uid).set({
      displayName: createdUser.user.displayName,
      photoURL: createdUser.user.photoURL
    })
    .then(() => {
      console.log('user saved in db')
    })
    .catch(serverError => {
      setErrorState((error) => error.concat(serverError));
    })
  }

  const formatErrors = () => {
    return errorState.map((error, index) => <p key={index}>{error.message}</p>)
  }

  return (
    <Grid verticalAlign="middle" textAlign="center" className="grid-form">
      <Grid.Column style={{ maxWidth: '500px' }}>
        <Header icon as="h2">
          <Icon name="slack" />
          Register
        </Header>
        <Form onSubmit={onSubmit}>
          <Segment stacked>
            <Form.Input
              name="userName"
              value={userState.userName}
              icon="user"
              iconPosition="left"
              onChange={handleInput}
              type="text"
              placeholder="User Name"
            />
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
            <Form.Input
              name="confirmPassword"
              value={userState.confirmPassword}
              icon="lock"
              iconPosition="left"
              onChange={handleInput}
              type="password"
              placeholder="Confirm Password"
            />
          </Segment>

          <Button>Submit</Button>
        </Form>

        {errorState.length > 0 && <Message error>
          <h3>Errors</h3>
          {formatErrors()}
        </Message>}
      </Grid.Column>
    </Grid>
  )
}

export default Register
