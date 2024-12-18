import axios from 'axios'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Input, Button } from 'antd';
import { setToken, setUserEmail, setUserRole } from '../utils/'
import AuthContext from '../components/AuthProvider.component'

export default function Login() {
  const { auth, setAuth } = useContext(AuthContext)
  const navigate = useNavigate()
  const [formRef] = Form.useForm();

  // Handle form submission
  const handleFormSubmit = () => {
    // Send POST request to Django backend's login API
    formRef.validateFields()
    .then(data => {
      axios.post('http://localhost:8000/users/login/', data)
        .then((response) => {
          // Actions to perform after successful login, e.g., saving token
          console.log(response.data)
          setToken(response?.data?.access)
          setUserEmail(response?.data?.user_info?.username)
          setUserRole(response?.data?.roles)
          // setAuth(true)
          setAuth({
            success: true
          })
          // setUserStatus(true)
          navigate('/')
        })
        .catch((error) => {
          // Handle errors
          if (error.response) {
            console.error('Status Code:', error.response.status)
            console.error('Data:', error.response.data)
            console.error('Response Header:', error.response.headers)
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
      {auth.success === true ? (
        <section>
          {/* TBD: show profile */}
          <h1>You are logged in !</h1>
        </section>
      ) : (
        <section>
          <div className="auth-inner-logo">
            COIAI
          </div>
          <h3 style={{ fontWeight: 'bold' }}>Log In</h3>
          <p style={{ color: '#ccc', textAlign: 'center' }}>Don't have an account? <span className='active-font' onClick={() => navigate('/sign_up')} >Sign Up</span></p>
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
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Please input your username!',
                },
              ]}
            >
              <Input />
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
              <Input.Password />
            </Form.Item>

              <Button onClick={handleFormSubmit} style={{ width: '100%' }} type="primary">
                Login
              </Button>
          </Form>
          <p onClick={() => navigate('/forget_passwd')} className="active-font text-center">
            Forget your password?
          </p>
        </section>
      )}
    </div>
  )
}