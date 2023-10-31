import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function ResetPasswd() {
    const [formData, setFormData] = useState({
        new_password: '',
        new_password_verify: '',
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...FormData,
            [name]: value,
        })
    }

    const navigate = useNavigate()

    // Handle form submission
    const handleFormSubmit = (event) => {
        event.preventDefault()
        // Build data object to be sent to the backend
        const data = {
            new_password: formData.new_password,
            new_password_verify: formData.new_password_verify,
        };

        // Send POST request to Django backend's reset passwd API
        axios
            .post('http://localhost:8000/user/reset_passwd/', data)
            .then((response) => {
                console.log(response.data);
                navigate('/log_in')
            })
            .catch((error) => {
                // TBD: Don't show error reason for safety
                console.error('Error:', error.message)
            })
    }

    return (
        <form onSubmit={handleFormSubmit}>
            <h3>Reset Password</h3>
            <div className="mb-3">
                <label>New Password</label>
                <input
                    type="passwd"
                    className="form-control"
                    placeholder="Enter new password"
                    name="passwd"
                    value={formData.new_password}
                    onChange={handleInputChange}
                />
                <label>Verify New Password</label>
                <input
                    type="passwd"
                    className="form-control"
                    placeholder="Enter new password again"
                    name="passwd"
                    value={formData.new_password_verify}
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
