import React from 'react'
import FullButton from '../../buttons/FullButton'
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';



function Signup(props) {
  return (
    <>
    <h2>Signup</h2>
    <Form>
        <FormGroup>
            <Label>Username</Label>
            <Input
            // innerRef={usernameRef}
            placeholder='Enter Username'
            />
        </FormGroup>
        <FormGroup>
            <Label>Email</Label>
            <Input
            // innerRef={emailRef}
            placeholder='Enter Password'
            type='email'
            />
        </FormGroup>
        <FormGroup>
            <Label>Password</Label>
            <Input
            // innerRef={passwordRef}
            placeholder='Enter Username'
            type='password'
            />
        </FormGroup>
        <FullButton>
            <Button type='submit'>Signup</Button>
        </FullButton>
    </Form>
    </>
  )
}

export default Signup