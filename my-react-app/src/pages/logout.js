import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { getToken } from '../utils'


export default function LogOut () {
    const navigate = useNavigate()

    const handleLogOut = (event) => {
        event.preventDefault()
        const config = {
            headers: {
                Authorization: "Bearer " + getToken,
            }
        }

        axios
            .post('http://localhost:8000/users/logout/', null, config)
            .then((response) => {
                console.log(response.data)
                localStorage.clear()
                navigate('/')
            })
            .catch((error) => {
                console.error('Error:', error.message)
            })
    }

    const handleCancelLogOut = (event) => {
        navigate('/')
    }

    return (
        <div className="auth-inner-small">
            <section>
                <h3>Are you sure to log out? </h3>
                <div className="d-flex justify-content-center">
                    <button type="submit" className="btn btn-primary mx-5" onClick={handleLogOut}>
                        Yes
                    </button>
                    <button type="submit" className="btn btn-primary mx-5" onClick={handleCancelLogOut}>
                        No
                    </button>
                </div>
            </section>
        </div>
    )
}