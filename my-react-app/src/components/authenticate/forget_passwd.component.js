import React, { useState, useContext } from 'react'
// import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../AuthProvider.component'

export default function ForgetPasswd() {
    const [formData, setFormData] = useState({
        email: '',
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...FormData,
            [name]: value,
        });
    };
    const { auth } = useContext(AuthContext)

    // Handle form submission
    const handleFormSubmit = (event) => {
        event.preventDefault();
        // Build data object to be sent to the backend
        const data = {
            email: formData.email,
        };
        const config = {
            headers: {
                accessToken: auth.accessToken
            }
        }
        // Send POST request to Django backend's forget passwd API
        axios
            .post('http://localhost:8000/user/forget_passwd/', data, config)
            .then((response) => {
                // Handle successful email check, then reset passwd
                console.log(response.data);
                // navigate('/reset_passwd');
            })
            .catch((error) => {
                // TBD: Don't show error reason for safety
                console.error('Error:', error.message);
            });
    }

    return (
        <form onSubmit={handleFormSubmit}>
            <h3>Forget Password? </h3>
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
            </div>
            <div className="d-grid">
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </div>
        </form>
    );
};
