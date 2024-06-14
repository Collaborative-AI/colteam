import React, { useState, useContext } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import { Form, Input, Button, message } from 'antd';
import { setUserStatus } from '../../utils/userInfo'
export default function ResetPasswd() {
    const { user_id } = useParams()
    const [formRef] = Form.useForm();
    const navigate = useNavigate()
    // Handle form submission
    const handleFormSubmit = (event) => {
        event.preventDefault()
        formRef.validateFields()
            .then(data => {

                if (formRef.getFieldsValue().new_password !== formRef.getFieldsValue().new_password_verify) {
                    message.error('Passwords do not match. Please check and try again.')
                    return
                }
                axios
                    .post('http://localhost:8000/users/resetPassword/', { ...data, userid: user_id })
                    .then((response) => {
                        console.log(response.data)
                        navigate('/log_in')
                    })
                    .catch((error) => {
                        // TBD: Don't show error reason for safety
                        console.error('Error:', error.message)
                    })
            })
            .catch(err => console.log(err))

        // // Send POST request to Django backend's reset passwd API

    }

    return (
        <div className="auth-inner-small">
            <div className="auth-inner-logo">
                COIAI
            </div>
            <h3 style={{ fontWeight: 'bold' }}>Reset Password</h3>
            <Form
                form={formRef}
                name="basic"
                colon="false"
                labelCol={{
                    span: 24,
                }}
                wrapperCol={{
                    span: 24,
                }}
                style={{
                    maxWidth: 600,
                }}
                initialValues={{
                    username: '',
                    password: ''
                }}
            >
                <Form.Item
                    label="New Password"
                    name="new_password"
                    rules={[
                        {
                            required: true,
                            message: 'Enter new password',
                        },
                    ]}
                >
                    <Input placeholder='Email Address' />
                </Form.Item>
                <Form.Item
                    label="Verify New Password"
                    name="new_password_verify"
                    rules={[
                        {
                            required: true,
                            message: 'Enter new password again',
                        },
                    ]}
                >
                    <Input placeholder='Enter new password again' />
                </Form.Item>

                <Button onClick={handleFormSubmit} style={{ width: '100%' }} type="primary">
                    Next
                </Button>
            </Form>
        </div>

    )
};
