// Note* this RoomIndex is where Create and Table will filter through
import React, { useEffect, useState } from 'react'
import RoomCreate from './RoomCreate'
import { Col, Container, Row } from 'reactstrap'
import RoomTable from './RoomTable'
import { baseURL } from '../../environments'

function RoomIndex(props) {

    const [ rooms, setRooms ] = useState([]);

    const fetchRooms = async () => {
        const url = `${baseURL}/room`

        const requestOption = {
            method: 'GET',
            headers: new Headers({
                "Authorization": props.token
            })
        }

        try {
            
            const res = await fetch(url, requestOption);
            const data = await res.json();

            setRooms(data.getAllRooms)

        } catch (err) {
            console.log(err.message);
        }
    }


    useEffect(() => {
        if(props.token) {
            fetchRooms()
        }
    }, [props.token])

  return (
    <>  
        <Container>
            <Row>
            <Col md='4'>
                    <RoomTable
                    token={props.token}
                    fetchRooms={fetchRooms}
                    rooms={rooms}
                    />
                </Col>
                <Col md='8'>
                    <RoomCreate
                    token={props.token}
                    fetchRooms={fetchRooms}
                    />
                </Col>
            </Row>
        </Container>
    </>
  )
}

export default RoomIndex