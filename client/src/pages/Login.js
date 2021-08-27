import React, { useState } from 'react';
import Auth from '../utils/auth';
import { useMutation } from "@apollo/client";
import { LOGIN_USER, ADD_USER } from "../utils/mutations";

import {
    Button,
    Checkbox,
    Form,
    Segment,
    Divider,
    Grid,
} from 'semantic-ui-react';

function Login(){
  const [loginUser, { error }] = useMutation(LOGIN_USER);
  const [addUser, { addUserError }] = useMutation(ADD_USER);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const [userFormData, setUserFormData] = useState({ email: '', password: '' });

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log( 'handleLoginSubmit(Login)' );
      console.log( userFormData );
      if (userFormData.email.length && userFormData.password.length)
      {
        const { token, data } = await loginUser({
          variables: { ...userFormData}
        });
        // console.log( `TOKEN:` );
        // console.log( data.login.token );
        // console.log( `DATA:` );
        // console.log( data.login.user );
        Auth.login(data.login.token);
      }
    } catch (e) {
      console.error(e);
    }
    setUserFormData({
      username: '',
      email: '',
      password: '',
    });
  };

  const handleSignupSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log( 'handleSignupSubmit(Login)' );
      console.log( userFormData );
      if (userFormData.username.length && userFormData.email.length && userFormData.password.length)
      {
        const { data } = await addUser({
          variables: { ...userFormData}
        });
        // console.log( `TOKEN:` );
        // console.log( data.addUser.token );
        // console.log( `DATA:` );
        // console.log( data.addUser.user );
        Auth.login(data.addUser.token);
      }
    } catch (e) {
      console.error(e);
    }
    setUserFormData({
      username: '',
      email: '',
      password: '',
    });
  };
    return(
    <div>
    <Segment tertiary placeholder style={{alignItems: "center"}}>
        <Grid columns={2} relaxed='very' padded stackable>
            <Grid.Column>
                <Form onSubmit={handleLoginSubmit}>
                <h1>Login</h1>
                <Form.Input
                    name='email'
                    icon='user'
                    iconPosition='left'
                    label='eMail-Address'
                    placeholder='email'
                    onChange={handleInputChange}
                />
                <Form.Input
                    name='password'
                    icon='lock'
                    iconPosition='left'
                    label='Password'
                    type='password'
                    onChange={handleInputChange}
                />
                <Button content='Login' icon='right arrow' labelPosition='right' primary />
                </Form>
                <Divider horizontal></Divider>
            </Grid.Column>

            <Grid.Column verticalAlign='middle'>
            <Grid.Column>
                <Form onSubmit={handleSignupSubmit}>
                <h1>Sign Up</h1>
                <Form.Input
                    name='username'
                    icon='user'
                    iconPosition='left'
                    label='Username'
                    placeholder='Username'
                    onChange={handleInputChange}
                />
                <Form.Input
                    name='email'
                    icon='user'
                    iconPosition='left'
                    label='eMail-Address'
                    placeholder='email'
                    onChange={handleInputChange}
                />
                <Form.Input
                    name='password'
                    icon='lock'
                    iconPosition='left'
                    label='Password'
                    type='password'
                    onChange={handleInputChange}
                />
                <Checkbox style={{marginBottom:10}}
                          label='I agree to make delicious food' />
                <Button content='Create Account' positive />
                </Form>
            </Grid.Column>
        </Grid.Column>
        </Grid>
    </Segment>
    </div>
    )
}

export default Login;