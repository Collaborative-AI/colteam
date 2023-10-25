import axios from 'axios'
import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthContext from '../AuthProvider.component'


export default function LogOut() {
    const { auth, setAuth } = useContext(AuthContext)
    const navigate = useNavigate()

    const handleLogOut = (event) => {
        const config = {
            headers: {
                Authorization: "Bearer " + auth.accessToken
            }
        }

        axios
            .post('http://localhost:8000/users/logout', config)
            .then((response) => {
                console.log(response.data)
                setAuth({ email: '', roles: '', accessToken: '', success: false })
                navigate('/')
            })
            .catch((error) => {
                console.error('Error:', error.message);
            });

        return (
            <p>You are now successfully log out! </p>
        )
    }
}
