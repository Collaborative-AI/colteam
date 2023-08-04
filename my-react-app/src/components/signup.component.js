import React, { Component } from 'react'
import axios from 'axios';
export default class SignUp extends Component {
  constructor(props){
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
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

  handleFormSubmit = (event) => {
    event.preventDefault();

    // Construct the data object to send to the backend
    const data = {
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      email: this.state.email,
      password: this.state.password,
    };

    // Send a POST request to the Django backend's registration API
    axios
      .post('http://localhost:8000/api/register/', data)
      .then((response) => {
        // Handle successful registration, e.g., show success message
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
  };

  render() {
    return (
      <form onSubmit={this.handleFormSubmit}>
        <h3>Sign Up</h3>
        <div className="mb-3">
          <label>First name</label>
          <input
            type="text"
            className="form-control"
            placeholder="First name"
            name="firstName"
            value={this.state.firstName}
            onChange={this.handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label>Last name</label>
          <input 
            type="text" 
            className="form-control" 
            placeholder="Last name" 
            name="lastName"
            value={this.state.lastName}
            onChange={this.handleInputChange}
          />
        </div>
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
            Sign Up
          </button>
        </div>
        <p className="forgot-password text-right">
          Already registered? <a href="/sign-in">sign in</a>
        </p>
      </form>
    )
  }
}