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
    const [error, setError] = useState(false)

    const [formData, setFormData] = useState({
        old_password: '',
        new_password: '',
    })

    const handlePasswordChange = (event) => {
        const { name, value } = event.target
        setFormData({
            ...formData,
            [name]: value,
        })
        // setError({ error: false })
    }


    const navigate = useNavigate()

    // useEffect(() => {
    //     // console.log(`Bearer ${auth.accessToken}`)
    //     axios
    //         .get("http://localhost:8000/users/password/change/", {
    //             headers: {
    //                 Authorization: `Bearer ${auth.accessToken}`
    //             },
    //         })
    //         .then((response) => {
    //             console.log(response)
    //             //setUserData
    //         })
    //         .catch((error) => console.error('Error fetching user data:', error))
    // }, [])

    const handleResetPasswd = (event) => {
        event.preventDefault()
        // if (formData.new_password !== formData.new_passwd_confirm) {
        //     setError({ error: true })
        // }
        const data = {
            old_password: formData.old_password,
            new_password: formData.new_password,
            new_passwd_confirm: formData.new_passwd_confirm,
        }
        const config = {
            headers: {
                Authorization: "Bearer " + auth.accessToken
            }
        }
        // Send POST request to Django backend's change passwd API
        axios
            .post('http://localhost:8000/user/users/password/change/', data, config)
            .then((response) => {
                console.log(response.data)
                navigate('/log_in')
            })
            .catch((error) => {
                console.error('Error:', error.message)
            })
    }



    return (
        <Container >
            <h4>Account Setting</h4>
            <Form onSubmit={handleResetPasswd} style={{ marginTop: '40px' }}>
                <Row className="mb-3">
                    <Form.Group as={Col} xs="12" sm="6" md="4">
                        <Form.Label>Old Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter old password"
                            name="old_password"
                            value={formData.old_password}
                            onChange={handlePasswordChange}
                        />
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} xs="12" sm="6" md="4">
                        <Form.Label>New Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter new password"
                            name="new_password"
                            value={formData.new_password}
                            onChange={handlePasswordChange}
                        />
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} xs="12" sm="6" md="4">
                        <Form.Label>Confirm New Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Confirm new password"
                            name="new_password_confirm"
                            value={formData.new_password_confirm}
                            onChange={handlePasswordChange}
                        />
                    </Form.Group>
                </Row>
                {/* {error && (
                    <p style={{ fontSize: '12px', color: 'red', marginTop: '10px' }}>
                        Passwords do not match. Please check and try again.
                    </p>
                )} */}
                <Button variant="primary" type="submit">
                    Save Changes
                </Button>
            </Form >
        </ Container >
    )
};
