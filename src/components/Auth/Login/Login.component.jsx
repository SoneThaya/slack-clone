import React, { useState } from 'react'
import { Grid, Form, Segment, Icon, Header, Button, Message } from 'semantic-ui-react';
import firebase from '../../../server/firebase'
import { Link } from 'react-router-dom';

const Login = () => {

  let user = {
    email: '',
    password: '',
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
