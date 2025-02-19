import React, { Component, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import AuthContext from './AuthProvider.component'
import { Link, useNavigate } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';

const Profile = () => {
    const { auth } = useContext(AuthContext);
    const { profile, setProfile } = useState("");

    useEffect(() => {
        // URL
        axios.get(`http://localhost:8000/users/view/`, {
            params: {
                id: auth.username
            },
            headers: {
                Authorization: "Bearer " + auth.accessToken
            }
        })
            .then(response => {
                setProfile(response.data)
            })
            .catch(error => console.error('Error fetching profile data:', error))
    }, [])

    const navigate = useNavigate();

    const navigateTonewProject = () => {
        navigate('/new_project');
    };
    const navigateToshowProject = () => {
        navigate('/show_project');
    };

    return (
        <div>
            <h2>User Profile</h2>
            <p>Phone: {profile ? profile.phone_number : '1-000-000-000'}</p>
            <p>Location: {profile ? profile.location : 'US'}</p>

            <ListGroup>
                <ListGroup.Item action onClick={navigateTonewProject}>
                    New Project
                </ListGroup.Item>
                <ListGroup.Item action onClick={navigateToshowProject}>
                    My Projects
                </ListGroup.Item>
                {/* <ListGroup.Item action onClick={#}>
                    This one is a button
                </ListGroup.Item> */}
            </ListGroup>


        </div >
    );
};

export default Profile;
