import React, { Component, useState, useContext } from 'react'
import SearchBar from './searchbar.component'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import AuthContext from './AuthProvider.component'
import Dropdown from 'react-bootstrap/Dropdown';

function Navbar() {
  const { auth } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
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
      default:
        break
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light fixed-top">
      <div className="container">
        <Link className="navbar-brand" to={'/'}>
          ColAI
        </Link>

        <button className="navbar-toggler" type="button" onClick={toggleMenu}>
          <span className="navbar-toggler-icon"></span>
        </button>


        {/* {this.props.pathname === "/data" ? <SearchBar /> : null} */}
        <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`} id=" navbarToggler">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
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
              <li class="nav-item dropdown">
                <Dropdown onSelect={handleDropdownSelect}>
                  <Dropdown.Toggle variant="secondary" id="dropdown-basic" bg="white">
                    Profile
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item eventKey="action-1">New Project</Dropdown.Item>
                    <Dropdown.Item eventKey="action-2">My Projects</Dropdown.Item>
                    {/* <Dropdown.Item eventKey="action-3">Setting</Dropdown.Item> */}
                  </Dropdown.Menu>
                </Dropdown>
              </li>
            ) : (
              <>
                < li className="nav-item">
                  <Link className="nav-link" to={'/log-in'}>
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={'/sign-up'}>
                    Sign up
                  </Link>
                </li>
              </>)}
          </ul>
        </div >
      </div >
    </nav >
  )
}

// const NavbarWithLocation = props => {
//   const location = useLocation()
//   return <Navbar {...props} pathname={location.pathname} />
// }

export default Navbar
// WithLocation