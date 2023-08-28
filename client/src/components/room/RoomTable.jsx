import React from 'react'
import { Table, Button } from 'reactstrap'
import { baseURL } from '../../environments';
import { useNavigate } from 'react-router-dom';

function RoomTable(props) {
    // console.log(props.rooms);

    const navigate = useNavigate();

    async function deleteRoom(id) {
        const url = `${baseURL}/room/${id}`

        let requestOption = {
            headers: new Headers({
                "Authorization": props.token,
            }),
            method: 'DELETE'
        }

        try {
            
            let res = await fetch(url, requestOption)
            let data = await res.json()

            if(data) {
                props.fetchRooms();
            }

        } catch (err) {
            console.log(err.message);
        }
    }

  return (
    <>
   <h1>List of Rooms</h1>
   <Table hover striped>
  <thead>
    <tr>
      <th>
        Title
      </th>
      <th>
        Description
      </th>
      <th>
        Edit / Delete
      </th>
    </tr>
  </thead>
  <tbody>
    {
        props.rooms.map(room => {
            return(
                <tr key={room._id}>
                    <th scope='row'>{room.title}</th>
                    <td>{room.description}</td>
                    {/* <td>{room.messages}</td> */}
                    <td>
                        <Button
                        color='warning'
                        onClick={() => navigate(`/room/update/${room._id}`)}
                        >Edit</Button>
                        <Button
                            onClick={() => deleteRoom(room._id)}
                            color='danger'
                        >Delete</Button>

                    </td>
                </tr>
            )
        })
    }
  </tbody>
</Table>
   </>
  )
}

export default RoomTable