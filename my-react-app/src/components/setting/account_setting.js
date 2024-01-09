import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../AuthProvider.component'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

export default function AccountSetting () {
    const { auth } = useContext(AuthContext)

    const [formData, setFormData] = useState({
        old_password: '',
        new_password: '',
        new_password_confirm: '',
    })

    const handlePasswordChange = (event) => {
        const { name, value } = event.target
        setFormData({
            ...formData,
            [name]: value,
        })
    }


    const navigate = useNavigate()

    const handleResetPasswd = (event) => {
        event.preventDefault()
        if(!formData.old_password || !formData.new_password || !formData.new_password_confirm){
            alert("Please make sure you filled all passwords.")
        }
        else if(formData.new_password !== formData.new_password_confirm){
            alert("Passwords do not match. Please check and try again.")
        }
        const data = {
            old_password: formData.old_password,
            new_password: formData.new_password,
        }
        const config = {
            headers: {
                Authorization: "Bearer " + auth.accessToken
            }
        }
        // Send POST request to Django backend's change passwd API
        axios
            .post('http://localhost:8000/users/password/change/', data, config)
            .then((response) => {
                console.log(response.data)
                navigate('/log_in')
            })
            .catch((error) => {
                console.error('Error:', error.message)
            })
    }



    return (
        <div>
            <h3>Account Setting</h3>
            <div style={{ width: '65%', margin: 'auto' }}>
                <Form onSubmit={handleResetPasswd} style={{ marginTop: '40px' }}>
                    <Row className="mb-3">
                        <Form.Group>
                            <Form.Label style={{ fontSize: '26px' }}>Old Password</Form.Label>
                            <Form.Control
                                style={{ fontSize: '24px' }}
                                type="password"
                                placeholder="Enter old password"
                                name="old_password"
                                value={formData.old_password}
                                onChange={handlePasswordChange}
                            />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group>
                            <Form.Label style={{ fontSize: '26px' }}>New Password</Form.Label>
                            <Form.Control
                                style={{ fontSize: '24px' }}
                                type="password"
                                placeholder="Enter new password"
                                name="new_password"
                                value={formData.new_password}
                                onChange={handlePasswordChange}
                            />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group>
                            <Form.Label style={{ fontSize: '26px' }}>Confirm New Password</Form.Label>
                            <Form.Control
                                style={{ fontSize: '24px' }}
                                type="password"
                                placeholder="Confirm new password"
                                name="new_password_confirm"
                                value={formData.new_password_confirm}
                                onChange={handlePasswordChange}
                            />
                        </Form.Group>
                    </Row>
                    <Row style={{ marginTop: '45px', marginBottom: '45px', display: 'flex', justifyContent: 'center'}}>
                        <Button variant="primary" type="submit" style={{ fontSize: '26px', width: '500px'}}>
                            Save Changes
                        </Button>
                    </Row>
                    
                </Form >
            </div>
        </div >
    )
};
