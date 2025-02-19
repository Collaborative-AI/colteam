import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function CreateRoom(props){
    const [FormData, setFormData] = useState({
        room_name: '',
      })
    
      const handleInputChange = (event) => {
        const { name, value } = event.target
        setFormData({
          ...FormData,
          [name]: value,
        })
      }
      const navigate = useNavigate()
    
      const handleCreateRoom = (event) => {
        event.preventDefault()
        const data = {
          room_name: FormData.room_name,
        }
    
        axios.post('http://localhost:8000/chats/create_room/', data)
          .then((response) => {
            console.log(response.data)
            // navigate('/')
          })
          .catch((error) => {
            if (error.response) {
              console.error('Error:', error.message)
            }
          })
      }

    const [show, setShow] = useState(true);
    const handleClose = () => {setShow(false);}

    return (
      <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={show} 
      onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Create New Chat Room</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Room Name</Form.Label>
              <Form.Control
                type="room_name"
                placeholder="what is your room name?"
                autoFocus
                value={FormData.room_name}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Room Memebers</Form.Label>
              {/* TBD: room member options...  */}
              {/* <Form.Control as="textarea" rows={3} /> */}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCreateRoom}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
  );
}

export default CreateRoom