import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Col, Container, Form, FormGroup, Input, Label, Row } from 'reactstrap'
import FullButton from '../buttons/FullButton';
import { baseURL } from '../../environments';



function RoomEdit(props) {

    const { id } = useParams();

    const url = `${baseURL}/room/${id}`;

    const [title, setTitle] = useState('')
    const [ description, setDescription ] = useState('')

    const navigate = useNavigate();

    let roomDescription = [null, 'Halloween Lovers', 'Animal Enthusists', 'Sports Fans', 'Movie Goers'];

    const fetchRoom = async () => {
        
        try {
            const res = await fetch(url, {
                method: 'GET',
                headers: new Headers({
                    "Authorization": props.token
                })
            });

            const data = await res.json();
            const { title, description } = data.getRoom;

            setTitle(title)
            setDescription(description)

        } catch (err) {
            console.log(err.message);
        }
    }

    useEffect(() => {
        if(props.token) {
            fetchRoom();
        }
    }, [props.token])

    async function handleSubmit(e) {
        e.preventDefault();

        let body = JSON.stringify({
            title: title,
            description: description
        })

        const requestOption = {
            headers: new Headers({
                'Authorization': props.token,
                "Content-Type": 'application/json'
            }),
            body: body,
            method: "PATCH"
        }
        try {
            
            const res = await fetch(url, requestOption);
            const data = await res.json();
            alert(data.message)

        } catch (err) {
            console.log(err.message);
        }
    }

  return (

    <>
    <h1
        style={{textAlign: 'center', textDecoration: 'underline'}}
    >Edit Room</h1>
    <Container>
        <Row>
            <Col md='4'>
                <p>
                    <b>{title}</b>
                    <br />
                    {title} is all about {description}
                </p>
                <FullButton>
                    <Button
                    color='info'
                    outline
                        onClick={() => navigate('/room/')}
                    >Back to Table</Button>
                </FullButton>
            </Col>
            <Col md='8'>
                <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label>Title</Label>
                    <Input 
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Description</Label>
                    <Input
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        >
                            {roomDescription.map((d,i) => {
                                return(
                                    <option key={i} value={d}>{d}</option>
                                )
                            })}
                        </Input>
                </FormGroup>
                <FullButton>
                    <Button color='success'>Update</Button>
                </FullButton>
                </Form>
            </Col>
        </Row>
    </Container>
    </>
  )
}

export default RoomEdit