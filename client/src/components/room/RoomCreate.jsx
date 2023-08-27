import React, { useRef } from 'react'
import { Button, Form, FormGroup, Input, Label } from 'reactstrap'
import FullButton from '../buttons/FullButton'
import { baseURL } from '../../environments';

function RoomCreate(props) {

    const titleRef = useRef();
    const descriptionRef = useRef();
    // const messagesRef = useRef();


    let description = [null, 'Halloween Lovers', 'Animal Enthusists', 'Sports Fans', 'Movie Goers'];

    const handleSubmit = async (e) => {
        e.preventDefault();
        const title = titleRef.current.value;
        const description = descriptionRef.current.value;
        // const messages = messagesRef.current.value;

        let body = JSON.stringify({
            title, description
        })

        let url = `${baseURL}/room`
        let headers = new Headers();
        headers.append(`Content-Type`, `application/json`);
        headers.append(`Authorization`, props.token);

        const requestOption = {
            headers: headers,
            body: body,
            method: 'POST'
        }

        try {
            const res = await fetch(url, requestOption);
            const data = await res.json();
            props.fetchRooms();
            
        } catch (err) {
            console.log(err.message);
        }
    }

    // Title, Description, Messages?
  return (
    <>
        <h1>Add Room</h1>
        <Form onSubmit={handleSubmit}>
            <FormGroup>
                <Label>Title</Label>
                <Input 
                    name='roomTitle'
                    innerRef={titleRef}
                />
            </FormGroup>
            <FormGroup>
                <Label>Description</Label>
                <Input type='select'
                        innerRef={descriptionRef}
                >
                {description.map((d,i) => <option key={i} value={d}>{d}</option>)}
                </Input>
            </FormGroup>
            {/* <FormGroup>
                <Label>Messages</Label>
                <Input />
            </FormGroup> */}
            <FullButton>
                <Button color='success'>Add Room</Button>
            </FullButton>

        </Form>
    </>
  )
}

export default RoomCreate