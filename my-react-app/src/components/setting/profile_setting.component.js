// import React, { Component, useContext, useEffect, useState } from 'react'
// import axios from 'axios'
// import AuthContext from './AuthProvider.component'
// import { Link, useNavigate } from 'react-router-dom';
// import ListGroup from 'react-bootstrap/ListGroup';

// const ProfileSetting = () => {
//     const { auth } = useContext(AuthContext);
//     const { profile, setProfile } = useState("");

//     useEffect(() => {
//         // URL
//         axios.get(`http://localhost:8000/users/view/`, {
//             params: {
//                 id: auth.email
//             },
//             headers: {
//                 Authorization: "Bearer " + auth.accessToken
//             }
//         })
//             .then(response => {
//                 setProfile(response.data)
//             })
//             .catch(error => console.error('Error fetching profile data:', error))
//     }, [])

//     const navigate = useNavigate();

//     const navigateToAccountSetting = () => {
//         navigate('/account');
//     };
//     const navigateToshowProject = () => {
//         navigate('/show_project');
//     };

//     return (
//         <div>
//             <h2>User Profile</h2>
//             <p>Phone: {profile ? profile.phone_number : '1-000-000-000'}</p>
//             <p>Location: {profile ? profile.location : 'US'}</p>

//             <ListGroup>
//                 <ListGroup.Item action onClick={navigateToAccountSetting}>
//                     account
//                 </ListGroup.Item>
//                 <ListGroup.Item action onClick={navigateToshowProject}>
//                     My Projects
//                 </ListGroup.Item>
//                 {/* <ListGroup.Item action onClick={#}>
//                     This one is a button
//                 </ListGroup.Item> */}
//             </ListGroup>


//         </div >
//     );
// };

// export default ProfileSetting;


import React, { useState, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Navbar from '../../components/navbar.component'
import Nav from 'react-bootstrap/Nav'
import AuthContext from '../AuthProvider.component'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { Container } from "react-bootstrap"
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

// 用户基本信息
const UserInfo = () => (
    <div>
        <h2>Basic Information</h2>
        <p>Username: YourUsername</p>
        <p>Primary Email: youremail@example.com</p>
    </div>
)

// 用户帐户设置
const AccountSettings = () => (
    <div>
        <h2>Account Settings</h2>
        <label>Old Password: <input type="password" /></label><br />
        <label>New Password: <input type="password" /></label><br />
        <label>Confirm New Password: <input type="password" /></label><br />
        <button>Change Password</button>
    </div>
)

// 用户通知设置
const NotificationSettings = () => (
    <div>
        <h2>Notification Settings</h2>
        <p>Notification preferences go here.</p>
    </div>
)

// 用户账单信息
const BillingSettings = () => (
    <div>
        <h2>Billing Settings</h2>
        <p>Billing details and options go here.</p>
    </div>
)

function ProfileSetting () {
    const [selectedTab, setSelectedTab] = useState('profile')
    const { auth, setAuth } = useContext(AuthContext)

    const navigate = useNavigate()
    const handleDropdownSelect = (eventKey) => {
        switch (eventKey) {
            case 'profile':
                navigate('/profile')
                break
            case 'account':
                navigate('/account')
                break
            case 'notifications':
                navigate('/notifications')
                break
            default:
                break
        }
    }

    // return (
    //     <div className="user-settings-container">
    //         <div className="user-settings-sidebar">
    //             <ul>
    //                 <li onClick={() => setSelectedTab('profile')}>Profile</li>
    //                 <li onClick={() => setSelectedTab('account')}>Account</li>
    //                 <li onClick={() => setSelectedTab('notifications')}>Notifications</li>
    //                 <li onClick={() => setSelectedTab('billing')}>Billing</li>
    //             </ul>
    //         </div>
    //         <div className="user-settings-content">
    //             {handleDropdownSelect()}
    //         </div>
    //     </div>
    // );
    return (
        <div className="d-flex flex-row"> {/* 使用 Flexbox 容器 */}
            <div className="navbar bg-body-tertiary"> {/* 左侧导航栏 */}
                <Navbar.Brand>ColAI</Navbar.Brand>
                <Nav className="flex-column"> {/* 左侧导航栏内容 */}
                    <Link className="nav-link" to={'/data'}>
                        Data
                    </Link>
                    <Link className="nav-link" to={'/team'}>
                        Team
                    </Link>
                    <Link className="nav-link" to={'/project'}>
                        Project
                    </Link>
                    {auth.success ? (
                        <NavDropdown title="Profile" id="navbarScrollingDropdown" onSelect={handleDropdownSelect}>
                            <NavDropdown.Item eventKey="action-1">New Project</NavDropdown.Item>
                            <NavDropdown.Item eventKey="action-2">My Project</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item eventKey="action-3">Setting</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item eventKey="action-4">Log out</NavDropdown.Item>
                        </NavDropdown>
                    ) : (
                        <>
                            <Link className="nav-link" to={'/log_in'}>
                                Login
                            </Link>
                            <Link className="nav-link" to={'/sign_up'}>
                                Sign up
                            </Link>
                        </>)}
                </Nav>
            </div>
            <Navbar expand="lg" className="bg-body-tertiary ml-auto"> {/* 右侧内容 */}
                <Container fluid>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100%' }} navbarScroll>
                            {/* 右侧内容的导航项 */}
                        </Nav>
                        <Nav class="ml-auto">
                            <Form className="d-flex">
                                <Form.Control type="search" placeholder="Search" className="me-2" aria-label="Search" />
                                <Button variant="outline-success">Search</Button>
                            </Form>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )

}

export default ProfileSetting
