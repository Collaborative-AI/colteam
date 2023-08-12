import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login(){
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // Update component state when input values change
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...FormData,
      [name]: value,
    });
  };

  const navigate = useNavigate();

  // Handle form submission
  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Build data object to be sent to the backend
    const data = {
      email: formData.email,
      password: formData.password,
    };

    // Send POST request to Django backend's login API
    axios
      .post('http://localhost:8000/user/login/', data)
      .then((response) => {
        // Actions to perform after successful login, e.g., saving token
        console.log(response.data);
        navigate('/logged-in');
      })
      .catch((error) => {
        // Handle errors
        if (error.response) {
          console.error('Status Code:', error.response.status);
          console.error('Data:', error.response.data);
          console.error('Response Header:', error.response.headers);
        } else {
          console.error('Error:', error.message);
        }
      });
    }

  return (
    <form onSubmit={handleFormSubmit}>
      <h3>Sign In</h3>
      <div className="mb-3">
        <label>Email address</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
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
          Submit
        </button>
      </div>
      <p className="forgot-password text-right">
        <a href="#">Forgot password?</a>
        {/* to do: add forgot password handle */}
      </p>
    </form>
  );
};