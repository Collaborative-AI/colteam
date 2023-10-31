import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthContext from './AuthProvider.component'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import profile_image from '../images/colteam_logo.png'

function NavbarIns() {
  const { auth } = useContext(AuthContext);

  const navigate = useNavigate();
  const handleDropdownSelect = (eventKey) => {
    switch (eventKey) {
      case 'action-1':
        navigate('/new_project')
        break
      case 'action-2':
        navigate('/show_project')
        break
      case 'action-3':
        navigate('/profile_setting')
        break
      case 'action-4':
        navigate('/log_out')
        break
      default:
        break
    }
  };

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
              <NavDropdown title="Profile" id="navbarScrollingDropdown" onSelect={handleDropdownSelect}>
                <NavDropdown.Item eventKey="action-1">New Project</NavDropdown.Item>
                <NavDropdown.Item eventKey="action-2">My Project</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item eventKey="action-3">setting</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item eventKey="action-4">log out</NavDropdown.Item>
              </NavDropdown>
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
