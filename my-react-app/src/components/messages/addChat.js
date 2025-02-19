import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { getUserEmail } from '../../utils'

function AddChat(props){
    const [formData, setFormData] = useState({
        sender_id: getUserEmail(),
        receiver_id: '',
        content: ''
      })
    
      const handleInputChange = (event) => {
        const { name, value } = event.target
        setFormData({
          ...formData,
          [name]: value,
        })
      }
      const navigate = useNavigate()
    
      const handleAddChat = (event) => {
        event.preventDefault()
        const data = {
          sender: formData.sender_id,
          receiver: formData.receiver_id,
          content: formData.content
        }
    
        axios.post('http://localhost:8000/chats/create_flychat/', data)
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

    const [chatshow, setChatShow] = useState(true);
    const handleClose = () => {setChatShow(false);}

    return (
      <Modal 
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={chatshow} 
      onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add New Chat</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Receiver</Form.Label>
              <Form.Control
                type="receiver_id"
                placeholder="who do you want to chat?"
                autoFocus
                value={FormData.receiver_id}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Message</Form.Label>
              <Form.Control as="textarea" rows={3} 
              type="content"
              placeholder="your messages..."
              autoFocus
              value={FormData.content}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddChat}>
            Send
          </Button>
        </Modal.Footer>
      </Modal>
  );
}

export default AddChat