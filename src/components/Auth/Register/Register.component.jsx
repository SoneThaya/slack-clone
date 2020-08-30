import React from 'react'
import { Grid, Form, Segment } from 'semantic-ui-react';

const Register = () => {

  const handleInput = (e) => {

  }

  return (
    <Grid verticalAlign="middle" textAlign="center">
      <Grid.Column>
        <Form>
          <Segment stacked>
            <Form.Input
              name="userName"
              value=""
              icon="user"
              iconPosition="left"
              onChange={handleInput}
              type="text"
              placeholder="User Name"
            />
            <Form.Input
              name="email"
              value=""
              icon="mail"
              iconPosition="left"
              onChange={handleInput}
              type="email"
              placeholder="User Email"
            />
            <Form.Input
              name="password"
              value=""
              icon="lock"
              iconPosition="left"
              onChange={handleInput}
              type="password"
              placeholder="User Password"
            />
            <Form.Input
              name="confirmPassword"
              value=""
              icon="user"
              iconPosition="left"
              onChange={handleInput}
              type="password"
              placeholder="Confirm Password"
            />
          </Segment>
        </Form>
      </Grid.Column>
    </Grid>
  )
}

export default Register
