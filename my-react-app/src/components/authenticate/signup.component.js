import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function SignUp() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    alreadyHasUser: false,
  })

  // Update component state when input values change
  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const navigate = useNavigate()

  const toEmailVerification = () => {
    navigate('/email_verification', { state: { username: formData.email } })
  }

  // Handle form submission
  const handleFormSubmit = (event) => {
    event.preventDefault()
    // Construct the data object to send to the backend
    const data = {
      username: formData.email,
      password: formData.password,
    }

    // Send a POST request to the Django backend's registration API
    axios
      .post('http://localhost:8000/users/register/', data)
      .then((response) => {
        // Handle successful registration, e.g., show success message
        console.log(response.status)
        //收到201， 跳转到提示页面
        // navigate('/email_verification')
        toEmailVerification()
      })
      .catch((error) => {
        console.log(error.response.status)
        // Handle errors
        if (error.response) {
          console.error('Status Code:', error.response.status)

          console.error('Data:', error.response.data)
          console.error('Response Header:', error.response.headers)
          if (error.response.status === 409) {
            setFormData({
              ...formData,
              alreadyHasUser: true,
            })
          }
        } else {
          console.error('Error:', error.message)
        }

      })
  }


  return (
    <form onSubmit={handleFormSubmit}>
      <h3>Sign Up</h3>
      <div className="mb-3">
        <label>Email Address</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
        {formData.alreadyHasUser && <label>User is already in System!</label>}
      </div>
      <div className="mb-3">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
        />
      </div>

      <div className="d-grid">
        <button type="submit" className="btn btn-primary">
          Sign Up
        </button>
      </div>

      <p className="forgot-password text-right">
        <Link to='/log_in'>alreay registered?
        </Link>
      </p>
    </form >
  )
}
