import React, { useRef, useState } from 'react'
import FullButton from '../../buttons/FullButton'
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import { useNavigate } from 'react-router-dom';



function Signup(props) {

    const usernameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault()

        const username = usernameRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        
        

        let bodyObj = JSON.stringify({
            username: username,
            email: email,
            password: password
        })
        

        const url = `http://localhost:4008/user/signup`;
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');

        const requestOptions = {
            headers,
            body: bodyObj,
            method: 'POST'
        }
        try {
            const response = await fetch(url, requestOptions)
            const data = await response.json();
            console.log(data);

            props.updateToken(data.token)

            if(data.message === "Success!") {
                props.updateToken(data.token)
                navigate('/room/')
            } else {
                alert(data.message)
            }

        } catch (err) {
            console.log(err.message);
        }

    }


  return (
    <>
    <h2>Signup</h2>
    <Form onSubmit={handleSubmit}>
        <FormGroup>
            <Label>Username</Label>
            <Input
            innerRef={usernameRef}
            placeholder='Enter Username'
            />
        </FormGroup>
        <FormGroup>
            <Label>Email</Label>
            <Input
            innerRef={emailRef}
            placeholder='example@email.com'
            type='email'
            />
        </FormGroup>
        <FormGroup>
            <Label>Password</Label>
            <Input
            innerRef={passwordRef}
            placeholder='Enter Password'
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