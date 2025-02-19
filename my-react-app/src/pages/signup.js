import axios from 'axios'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Input, Button } from 'antd';
import AuthContext from '../components/AuthProvider.component'

export default function Login() {
  const navigate = useNavigate()
  const [formRef] = Form.useForm();
  const toEmailVerification = (username) => {
    navigate('/email_verification', { state: { username: username } })
  }

  // Handle form submission
  const handleFormSubmit = (event) => {
    event.preventDefault();
    formRef.validateFields()
      .then(data => {
        toEmailVerification(data.username);
        // Send a POST request to the Django backend's registration API
        axios
          .post('http://localhost:8000/users/register/', data)
          .then((response) => {
            // Handle successful registration, e.g., show success message
            console.log(response.status)
            //收到201， 跳转到提示页面
            toEmailVerification(data.username)
          })
          .catch((error) => {
            // console.log(error.response.status)
            // Handle errors
            if (error.response) {
              console.error('Status Code:', error.response.status)

              console.error('Data:', error.response.data)
              console.error('Response Header:', error.response.headers)
              if (error.response.status === 409) {
              }
            } else {
              console.error('Error:', error.message)
            }

          })
      })
      .catch(err => {
        console.log(123, console.log(err))
      })
  }
  return (
    <div className="auth-inner-small">
      <section>
        <div className="auth-inner-logo">
          COIAI
        </div>
        <h3 style={{ fontWeight: 'bold' }}>Join COIAI</h3>
        <p style={{ color: '#ccc', textAlign: 'center' }}>Join the community of machine learners!</p>
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
            label="Email Address"
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your email email!',
              },
            ]}
          >
            <Input placeholder='Email Address' />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password placeholder='password' />
          </Form.Item>

          <Button onClick={handleFormSubmit} style={{ width: '100%' }} type="primary">
            Next
          </Button>
        </Form>
        <p onClick={() => navigate('/log_in')} className="text-center" style={{ color: '#181818', fontSize: '16px'}}>
          Already have an account？
          <span className='active-font' style={{ paddingTop: 0 }}>
            Log in
          </span>
        </p>
      </section>
    </div>
  )
}