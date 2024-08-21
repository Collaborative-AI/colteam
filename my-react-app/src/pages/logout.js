import axios from 'axios'
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { getToken } from '../utils'
import AuthContext from '../components/AuthProvider.component'


export default function LogOut () {
    const { auth, setAuth } = useContext(AuthContext)

    const navigate = useNavigate()

    const handleLogOut = (event) => {
        event.preventDefault()
        const config = {
            headers: {
                Authorization: "Bearer " + getToken(),
            }
        }
        console.log(33);
        axios
            .post('http://localhost:8000/users/logout/', null, config)
            .then((response) => {
                console.log(response.data)
                console.log(44);
            })
            .catch((error) => {
                console.error('Error:', error.message)
                console.log(66);
            })
            .finally(() => {
                localStorage.clear()
                setAuth(false)
                console.log(55);
                navigate('/log_in')
            })
    }

    const handleCancelLogOut = (event) => {
        // navigate('/log_in')
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