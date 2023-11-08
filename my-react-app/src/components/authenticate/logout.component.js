import axios from 'axios'
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../AuthProvider.component'


export default function LogOut() {
    const { auth, setAuth } = useContext(AuthContext)
    const navigate = useNavigate()

    const handleLogOut = (event) => {
        event.preventDefault()
        const config = {
            headers: {
                Authorization: "Bearer " + auth.accessToken,
                "X-CSRFToken": getCookie("csrftoken")
            }
        }

        axios
            .post('http://localhost:8000/users/logout/', config)
            .then((response) => {
                console.log(response.data)
                setAuth({ email: '', roles: '', accessToken: '', success: false })
                navigate('/')
            })
            .catch((error) => {
                console.error('Error:', error.message);
            })
    }

    return (
        <section>
            <h3>Are you sure to log out? </h3>
            <div className="d-flex justify-content-center">
                <button type="submit" className="btn btn-primary mx-5" onClick={handleLogOut}>
                    Yes
                </button>
                <button type="submit" className="btn btn-primary mx-5" >
                    No
                </button>
            </div>
        </section>
    )
}
// Function to get the CSRF token from cookies
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}