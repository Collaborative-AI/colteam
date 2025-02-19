import React, { Component, useContext } from 'react'
import AuthContext from './AuthProvider.component'
import { Link, useNavigate } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';

const Profile = () => {
    const { auth } = useContext(AuthContext);
    // const { roles, success } = auth;
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
