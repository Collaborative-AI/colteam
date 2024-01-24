import React, { useState, useContext } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'

import { setUserStatus } from '../../utils/userInfo'
export default function ResetPasswd() {
    const { user_id } = useParams()

    const [formData, setFormData] = useState({
        new_password: '',
        new_password_verify: '',
    })

    const handleInputChange = (event) => {
        const { name, value } = event.target
        setFormData({
            ...formData,
            [name]: value,
        })
        setError({ error: false })
    }

    const navigate = useNavigate()

    const [error, setError] = useState('')
    // Handle form submission
    const handleFormSubmit = (event) => {
        event.preventDefault()
        if (formData.new_password !== formData.new_password_verify) {
            setError({ error: true })
        }
        // Build data object to be sent to the backend
        const data = {
            new_password: formData.new_password,
            new_password_verify: formData.new_password_verify,
            userid: user_id
        }

        // Send POST request to Django backend's reset passwd API
        axios
            .post('http://localhost:8000/users/resetPassword/', data)
            .then((response) => {
                console.log(response.data)
                navigate('/log_in')
            })
            .catch((error) => {
                // TBD: Don't show error reason for safety
                console.error('Error:', error.message)
            })
    }

    return (
        <div className="auth-inner-small">
            <form onSubmit={handleFormSubmit}>
                <h3>Reset Password</h3>
                <div className="mb-3">
                    <label>New Password</label>
                    <input
                        type="new_password"
                        className="form-control"
                        placeholder="Enter new password"
                        name="new_password"
                        value={formData.new_password}
                        onChange={handleInputChange}
                    />
                    <label>Verify New Password</label>
                    <input
                        type="new_password_verify"
                        className="form-control"
                        placeholder="Enter new password again"
                        name="new_password_verify"
                        value={formData.new_password_verify}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="d-grid">
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </div>
                {error && (
                    <p style={{ fontSize: '12px', color: 'red', marginTop: '10px' }}>
                        Passwords do not match. Please check and try again.
                    </p>
                )}
            </form>
        </div>

    )
};
