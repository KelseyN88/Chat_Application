import React, { useState } from 'react';
import Login from './login/Login';
import Signup from './signup/Signup';
import { Button, Col, Row } from 'reactstrap';

function Auth() {

    // ADD SWAPFORM HERE

  return (
    <>
   <Row>
    <Col>
    <Signup />
    </Col>
   </Row>
   <Row>
    <Col>
    <Login />
    </Col>
   </Row>
    
    </>
  )
}

export default Auth