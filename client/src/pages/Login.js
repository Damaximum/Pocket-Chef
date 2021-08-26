import React from 'react'
import {
    Button,
    Checkbox,
    Form,
    Segment,
    Divider,
    Grid,
} from 'semantic-ui-react';

function Login(){
    return(
    <div>
    <Segment tertiary placeholder style={{maxWidth: 1500}}>
        <Grid columns={2} relaxed='very' padded stackable>
            <Grid.Column>
                <Form>
                <h1>Login</h1>
                <Form.Input
                    icon='user'
                    iconPosition='left'
                    label='Username'
                    placeholder='Username'
                />
                <Form.Input
                    icon='lock'
                    iconPosition='left'
                    label='Password'
                    type='password'
                />
                <Button content='Login' primary />
                </Form>
                <Divider horizontal></Divider>
            </Grid.Column>

            <Grid.Column verticalAlign='middle'>
            <Grid.Column>
                <Form>
                <h1>Sign Up</h1>
                <Form.Input
                    icon='user'
                    iconPosition='left'
                    label='Username'
                    placeholder='Username'
                />
                <Form.Input
                    icon='lock'
                    iconPosition='left'
                    label='Password'
                    type='password'
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