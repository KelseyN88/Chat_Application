import React from 'react'
import RoomCreate from './RoomCreate'
import { Col, Container, Row } from 'reactstrap'

function RoomIndex(props) {
  return (
    <>  
        <Container>
            <Row>
                <Col md='4'>
                    <RoomCreate token={props.token}/>
                </Col>
                <Col md='8'>
                    [TABLE TO GO HERE]
                </Col>
            </Row>
        </Container>
    </>
  )
}

export default RoomIndex