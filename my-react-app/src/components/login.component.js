import React, { Component } from 'react'
import axios from 'axios';
export default class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  // Update component state when input values change
  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  // Handle form submission
  handleFormSubmit = (event) => {
    event.preventDefault();
    // Build data object to be sent to the backend
    const data = {
      email: this.state.email,
      password: this.state.password,
    };

    // Send POST request to Django backend's login API
    axios
      .post('http://localhost:8000/api/login/', data)
      .then((response) => {
        // Actions to perform after successful login, e.g., saving token
        console.log(response.data);
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

    render() {
      return (
        <form onSubmit={this.handleFormSubmit}>
          <h3>Sign In</h3>
          <div className="mb-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              name="email"
              value={this.state.email}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              name="password"
              value={this.state.password}
              onChange={this.handleInputChange}
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
      )
    }
};