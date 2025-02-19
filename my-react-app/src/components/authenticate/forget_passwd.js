import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input } from 'antd';

export default function ForgetPasswd() {

    const [formRef] = Form.useForm();
    const navigate = useNavigate();
    // Handle form submission
    const handleFormSubmit = (event) => {
        event.preventDefault()
        // Build data object to be sent to the backend
        formRef.validateFields()
            .then(data => {
                const toEmailVerification = () => {
                    navigate('/email_verification', { state: { username: data.username } })
                }
                axios
                    .post('http://localhost:8000/users/sendResetPasswordEmail/', data)
                    .then((response) => {
                        // Handle successful email check, then reset passwd
                        console.log(response.data)
                        toEmailVerification()
                    })
                    .catch((error) => {
                        // TBD: Don't show error reason for safety
                        console.error('Error:', error.message)
                    })
            })
            .catch(err => console.log(err))

    }

    return (
        <div className="auth-inner-small">
            <div className="auth-inner-logo">
                COIAI
            </div>
            <h3 style={{ fontWeight: 'bold' }}>Forget Password? </h3>
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
                    username: ''
                }}
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                >
                    <Input placeholder='Please input your email!' />
                </Form.Item>
                <Button onClick={handleFormSubmit} style={{ width: '100%' }} type="primary">
                    Submit
                </Button>
            </Form>
        </div>
    )
};
