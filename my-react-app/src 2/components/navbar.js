import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthContext from './AuthProvider.component'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import profile_image from '../assets/images/colteam_logo.png'
// import { getUserStatus } from '../utils'


function NavbarIns() {
  const { auth } = useContext(AuthContext)

  const navigate = useNavigate()
  const handleDropdownSelect = (eventKey) => {
    switch (eventKey) {
      case 'action-1':
        navigate('/new_project')
        break
      case 'action-2':
        navigate('/show_project')
        break
      case 'action-3':
        navigate('/settings/ProfileSetting')
        break
      case 'action-4':
        navigate('/log_out')
        break
      case 'action-5':
        navigate('/messages')
        break
      case 'action-6':
        navigate('/messages/createRoom')
        break
      case 'action-7':
        navigate('/messages/joinRoom')
        break
      case 'action-8':
        navigate('/messages/addChat')
        break
      case 'action-9':
        navigate('/apiKeys')
        break
      default:
        break
    }
  }

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand>ColAI</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100%' }}
            navbarScroll
          >
            <li>
              <Link className="nav-link" to={'/data'}>
                Data
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={'/team'}>
                Team
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={'/project'}>
                Project
              </Link>
            </li>
            {auth.success ? (
              <>
                {/* <li className="nav-item">
                  <Link className="nav-link" to={'/messages'}>
                    Messages
                  </Link>
                </li> */}
                <NavDropdown title="Messages" id="navbarScrollingDropdown" onSelect={handleDropdownSelect}>
                  <NavDropdown.Item eventKey="action-5">My messages</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item eventKey="action-6">Create Room</NavDropdown.Item>
                  <NavDropdown.Item eventKey="action-7">Join Room</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item eventKey="action-8">Create Chat</NavDropdown.Item>
                </NavDropdown>

                <NavDropdown title="Profile" id="navbarScrollingDropdown" onSelect={handleDropdownSelect}>
                  <NavDropdown.Item eventKey="action-1">New Project</NavDropdown.Item>
                  <NavDropdown.Item eventKey="action-2">My Project</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item eventKey="action-9">My API Keys</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item eventKey="action-3">My Profile</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item eventKey="action-4">log out</NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <>
                < li className="nav-item">
                  <Link className="nav-link" to={'/log_in'}>
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={'/sign_up'}>
                    Sign up
                  </Link>
                </li>
              </>)}
          </Nav>
          <Nav class="ml-auto">
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar >
  )
}



export default NavbarIns
