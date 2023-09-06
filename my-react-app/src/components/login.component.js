import axios from 'axios';
import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from './AuthProvider.component';


export default function Login() {
  const { setAuth } = useContext(AuthContext);
  const { success, setSuccess } = false;
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // Update component state when input values change
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
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
    axios.post('http://localhost:8000/user/login/', data)
      .then((response) => {
        // Actions to perform after successful login, e.g., saving token
        console.log(response.data);
        navigate('/');
        const accessToken = response?.data?.accessToken;
        const roles = response?.data?.roles;
        setAuth({ ...formData, roles, accessToken, success: true });
        setSuccess(true);
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
    <>
      {success ? (
        <section>
          {/* TBD: show profile */}
          <h1>You are loggin in !</h1>
        </section>
      ) : (
        <section>
          <form onSubmit={handleFormSubmit}>
            <h3>Sign In</h3>
            <div className="mb-3">
              <label>Email address</label>
              <input
                type='email'
                className='form-control'
                placeholder='Enter email'
                name='email'
                value={formData.email}
                onChange={handleInputChange}
              />
            </div > <div className='mb-3'>
              <label>Password
              </label>
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
              <Link to='/forget_passwd'>forget password?
              </Link>
            </p>
          </form>
        </section>
      )}
    </>

  );
};